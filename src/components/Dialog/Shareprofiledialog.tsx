import { useEffect, useMemo, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, Link2, Loader2, Share2 } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useSnackPresistStore } from '@/lib'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  username?: string
  avatarUrl?: string
  bio?: string
  followers?: number
  followings?: number
  products?: number
}

/* ---------------- 卡片尺寸与主题 ---------------- */
const W = 1080
const H = 1400
const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Noto Sans CJK SC", "Helvetica Neue", Arial, sans-serif'

const THEMES = [
  { id: 'sky', name: 'Sky', from: '#0ea5e9', to: '#6366f1', accent: '#0284c7' },
  { id: 'emerald', name: 'Emerald', from: '#10b981', to: '#0f766e', accent: '#059669' },
  { id: 'sunset', name: 'Sunset', from: '#f97316', to: '#ec4899', accent: '#ea580c' },
  { id: 'night', name: 'Night', from: '#0f172a', to: '#334155', accent: '#0ea5e9' },
] as const
type Theme = (typeof THEMES)[number]

/* ---------------- 绘图工具 ---------------- */
const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    // 必须带 crossOrigin，否则画布被"污染"，之后无法导出 PNG
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image load failed'))
    img.src = src
  })

// 把 QRCodeSVG 渲染出的 <svg> 转成图片，供 canvas 绘制
const svgToImage = (svg: SVGSVGElement) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const xml = new XMLSerializer().serializeToString(svg)
    const objectUrl = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }))
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('QR render failed'))
    }
    img.src = objectUrl
  })

const roundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

const circlePath = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.closePath()
}

// 自动换行：英文优先在空格处断行，中文等无空格文本逐字断行；超出行数用 … 截断
const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] => {
  const chars = Array.from(text.replace(/\s+/g, ' ').trim())
  const lines: string[] = []
  let line = ''

  for (let i = 0; i < chars.length; i++) {
    const next = line + chars[i]
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next
      continue
    }
    const sp = line.lastIndexOf(' ')
    if (sp > 0 && chars[i] !== ' ') {
      lines.push(line.slice(0, sp))
      line = line.slice(sp + 1) + chars[i]
    } else {
      lines.push(line.trimEnd())
      line = chars[i] === ' ' ? '' : chars[i]
    }
  }
  if (line) lines.push(line)

  if (lines.length > maxLines) {
    const cut = lines.slice(0, maxLines)
    let last = cut[maxLines - 1]
    while (last && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1)
    cut[maxLines - 1] = last.trimEnd() + '…'
    return cut
  }
  return lines
}

const formatCount = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}

interface PaintOptions {
  theme: Theme
  username: string
  bio: string
  avatar: HTMLImageElement | null
  qr: HTMLImageElement | null
  stats: { label: string; value: number }[]
  host: string
}

// 同步绘制：所有异步资源（头像、二维码）都在之前加载好，避免多次绘制交错
const paintCard = (canvas: HTMLCanvasElement, o: PaintOptions) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  // 背景渐变 + 装饰圆
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, o.theme.from)
  bg.addColorStop(1, o.theme.to)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = '#ffffff'
  ctx.globalAlpha = 0.12
  circlePath(ctx, 930, 90, 300)
  ctx.fill()
  circlePath(ctx, 90, 1290, 260)
  ctx.fill()
  ctx.globalAlpha = 1

  // 白色卡片
  ctx.save()
  ctx.shadowColor = 'rgba(15, 23, 42, 0.28)'
  ctx.shadowBlur = 60
  ctx.shadowOffsetY = 24
  ctx.fillStyle = '#ffffff'
  roundRectPath(ctx, 72, 100, 936, 1130, 56)
  ctx.fill()
  ctx.restore()

  // 头像
  const cx = W / 2
  const cy = 260
  const r = 110
  if (o.avatar) {
    ctx.save()
    circlePath(ctx, cx, cy, r)
    ctx.clip()
    const scale = Math.max((r * 2) / o.avatar.width, (r * 2) / o.avatar.height)
    const dw = o.avatar.width * scale
    const dh = o.avatar.height * scale
    ctx.drawImage(o.avatar, cx - dw / 2, cy - dh / 2, dw, dh)
    ctx.restore()
  } else {
    // 头像加载失败 / 没有头像：用首字母占位
    ctx.fillStyle = o.theme.accent
    circlePath(ctx, cx, cy, r)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = `700 110px ${FONT}`
    ctx.textBaseline = 'middle'
    ctx.fillText((o.username[0] || '?').toUpperCase(), cx, cy + 6)
    ctx.textBaseline = 'alphabetic'
  }
  ctx.strokeStyle = o.theme.accent
  ctx.lineWidth = 8
  circlePath(ctx, cx, cy, r + 10)
  ctx.stroke()

  // 用户名（过长时自动缩小字号）
  let size = 64
  ctx.fillStyle = '#0f172a'
  ctx.font = `700 ${size}px ${FONT}`
  while (ctx.measureText(o.username).width > 820 && size > 34) {
    size -= 2
    ctx.font = `700 ${size}px ${FONT}`
  }
  ctx.fillText(o.username, cx, 440)

  // 简介（最多 3 行）
  if (o.bio.trim()) {
    ctx.fillStyle = '#64748b'
    ctx.font = `400 34px ${FONT}`
    const lines = wrapText(ctx, o.bio, 780, 3)
    lines.forEach((ln, i) => ctx.fillText(ln, cx, 505 + i * 48))
  }

  // 数据区
  ctx.strokeStyle = '#e2e8f0'
  ctx.lineWidth = 2
  ;[700, 870].forEach((y) => {
    ctx.beginPath()
    ctx.moveTo(140, y)
    ctx.lineTo(W - 140, y)
    ctx.stroke()
  })
  const centers = [273, 540, 807]
  o.stats.forEach((s, i) => {
    ctx.fillStyle = o.theme.accent
    ctx.font = `700 60px ${FONT}`
    ctx.fillText(formatCount(s.value), centers[i], 782)
    ctx.fillStyle = '#94a3b8'
    ctx.font = `500 28px ${FONT}`
    ctx.fillText(s.label, centers[i], 828)
  })

  // 二维码
  // QRCodeSVG 自带没有留白，这里缩小一点，给二维码留出安静区，保证扫码成功率
  const qrSize = 230
  if (o.qr) ctx.drawImage(o.qr, (W - qrSize) / 2, 915, qrSize, qrSize)
  ctx.fillStyle = '#94a3b8'
  ctx.font = `500 28px ${FONT}`
  ctx.fillText('Scan to visit profile', cx, 1200)

  // 品牌
  ctx.fillStyle = '#ffffff'
  ctx.font = `700 44px ${FONT}`
  ctx.fillText('DeShop', cx, 1308)
  ctx.globalAlpha = 0.8
  ctx.font = `400 26px ${FONT}`
  ctx.fillText(o.host, cx, 1350)
  ctx.globalAlpha = 1
}

/* ---------------- 组件 ---------------- */
const ShareProfileDialog = ({
  open,
  onOpenChange,
  username = '',
  avatarUrl,
  bio = '',
  followers = 0,
  followings = 0,
  products = 0,
}: Props) => {
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null)
  const [themeId, setThemeId] = useState<Theme['id']>('sky')
  const [rendering, setRendering] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const qrWrapRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<Blob | null>(null)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )
  const toast = (severity: 'error' | 'success', msg: string) => {
    setSnackSeverity(severity)
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  // 放在 effect 里判断，避免 SSR 与客户端渲染不一致
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  const url = useMemo(
    () => (typeof window !== 'undefined' ? `${window.location.origin}/profile/${username}` : ''),
    [username]
  )
  const avatarSrc = avatarUrl ? GetAbosolutePathByRelative(avatarUrl, 'avatar') : ''
  const fileName = `${username.replace(/[^\w.-]+/g, '_') || 'profile'}-card.png`

  // 加载资源 → 一次性同步绘制
  useEffect(() => {
    if (!open || !canvasEl || !username || !url) return
    let cancelled = false
    setRendering(true)
    blobRef.current = null // 重绘期间清掉旧图，避免分享到上一张名片

    const run = async () => {
      const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

      const [avatar, qr] = await Promise.all([
        avatarSrc ? loadImage(avatarSrc).catch(() => null) : Promise.resolve(null),
        (async () => {
          try {
            const svg = qrWrapRef.current?.querySelector('svg')
            return svg ? await svgToImage(svg) : null
          } catch {
            return null
          }
        })(),
      ])
      if (cancelled) return

      paintCard(canvasEl, {
        theme,
        username,
        bio,
        avatar,
        qr,
        stats: [
          { label: 'Followers', value: followers },
          { label: 'Following', value: followings },
          { label: 'Products', value: products },
        ],
        host: window.location.host,
      })

      // 预先缓存 PNG：点击分享时不必再异步等待，避免丢失浏览器要求的"用户手势"（iOS Safari 尤其严格）
      blobRef.current = await new Promise<Blob | null>((resolve) => {
        try {
          canvasEl.toBlob(resolve, 'image/png')
        } catch {
          resolve(null)
        }
      })
    }

    run()
      .catch((e) => console.error(e))
      .finally(() => {
        if (!cancelled) setRendering(false)
      })

    return () => {
      cancelled = true
    }
  }, [open, canvasEl, themeId, username, avatarSrc, bio, followers, followings, products, url])

  const getBlob = () =>
    new Promise<Blob>((resolve, reject) => {
      if (blobRef.current) return resolve(blobRef.current)
      if (!canvasEl) return reject(new Error('no canvas'))
      try {
        canvasEl.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
      } catch (e) {
        reject(e) // 画布被污染时会抛 SecurityError
      }
    })

  const onDownload = async () => {
    try {
      const blob = await getBlob()
      const href = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = href
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(href), 1000)
    } catch {
      toast('error', 'Could not export the card. Please try again.')
    }
  }

  const onNativeShare = async () => {
    const data: ShareData = {
      title: `${username} on DeShop`,
      text: `Check out ${username} on DeShop`,
      url,
    }
    try {
      const blob = await getBlob()
      const file = new File([blob], fileName, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ ...data, files: [file] })
      } else {
        await navigator.share(data)
      }
    } catch (e) {
      if ((e as any)?.name === 'AbortError') return // 用户主动取消
      toast('error', 'Sharing failed. Try downloading the card instead.')
    }
  }

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast('success', 'Profile link copied')
    } catch {
      toast('error', 'Copy failed. Please copy the link from the address bar.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md max-h-[92vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Share profile</DialogTitle>
          <DialogDescription>
            Download a card to post anywhere, or share the profile link.
          </DialogDescription>
        </DialogHeader>

        {/* 预览 */}
        <div className="relative mx-auto w-full max-w-[300px]">
          <canvas
            ref={setCanvasEl}
            width={W}
            height={H}
            role="img"
            aria-label={`Profile card for ${username}`}
            className="w-full h-auto rounded-2xl shadow-lg ring-1 ring-black/5 bg-gray-100"
          />
          {rendering && (
            <div className="absolute inset-0 grid place-items-center rounded-2xl bg-white/60">
              <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
            </div>
          )}

          {/* 隐藏的二维码：只用来取 SVG 绘制到名片上 */}
          {url && (
            <div
              ref={qrWrapRef}
              aria-hidden
              className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
            >
              <QRCodeSVG value={url} size={512} level="M" bgColor="#ffffff" fgColor="#0f172a" />
            </div>
          )}
        </div>

        {/* 主题 */}
        <div
          role="radiogroup"
          aria-label="Card theme"
          className="flex items-center justify-center gap-3"
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={themeId === t.id}
              aria-label={t.name}
              title={t.name}
              onClick={() => setThemeId(t.id)}
              className={cn(
                'h-8 w-8 rounded-full ring-offset-2 transition-all',
                themeId === t.id ? 'ring-2 ring-sky-500 scale-110' : 'hover:scale-105'
              )}
              style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
            />
          ))}
        </div>

        {/* 操作 */}
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            className="h-11 gap-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white"
            onClick={onDownload}
            disabled={rendering}
          >
            <Download className="h-4 w-4" /> Download card
          </Button>
          <div className={cn('grid gap-2', canNativeShare ? 'grid-cols-2' : 'grid-cols-1')}>
            {canNativeShare && (
              <Button
                type="button"
                variant="outline"
                className="h-11 gap-2 rounded-xl"
                onClick={onNativeShare}
                disabled={rendering}
              >
                <Share2 className="h-4 w-4" /> Share
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              className="h-11 gap-2 rounded-xl"
              onClick={onCopyLink}
            >
              <Link2 className="h-4 w-4" /> Copy link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareProfileDialog

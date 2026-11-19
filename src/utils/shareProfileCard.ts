import { formatCount } from '@/utils/formatCount'

export const SHARE_CARD_W = 1080
export const SHARE_CARD_H = 1400
export const SHARE_CARD_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Noto Sans CJK SC", "Helvetica Neue", Arial, sans-serif'

export const SHARE_CARD_THEMES = [
  { id: 'sky', name: 'Sky', from: '#0ea5e9', to: '#6366f1', accent: '#0284c7' },
  { id: 'emerald', name: 'Emerald', from: '#10b981', to: '#0f766e', accent: '#059669' },
  { id: 'sunset', name: 'Sunset', from: '#f97316', to: '#ec4899', accent: '#ea580c' },
  { id: 'night', name: 'Night', from: '#0f172a', to: '#334155', accent: '#0ea5e9' },
] as const

export type ShareCardTheme = (typeof SHARE_CARD_THEMES)[number]

export const loadShareCardImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image load failed'))
    img.src = src
  })

export const svgToShareCardImage = (svg: SVGSVGElement) =>
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

export type PaintShareCardOptions = {
  theme: ShareCardTheme
  username: string
  bio: string
  avatar: HTMLImageElement | null
  qr: HTMLImageElement | null
  stats: { label: string; value: number }[]
  host: string
}

export const paintShareCard = (canvas: HTMLCanvasElement, o: PaintShareCardOptions) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const W = SHARE_CARD_W
  const H = SHARE_CARD_H
  const FONT = SHARE_CARD_FONT

  ctx.clearRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

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

  ctx.save()
  ctx.shadowColor = 'rgba(15, 23, 42, 0.28)'
  ctx.shadowBlur = 60
  ctx.shadowOffsetY = 24
  ctx.fillStyle = '#ffffff'
  roundRectPath(ctx, 72, 100, 936, 1130, 56)
  ctx.fill()
  ctx.restore()

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

  let size = 64
  ctx.fillStyle = '#0f172a'
  ctx.font = `700 ${size}px ${FONT}`
  while (ctx.measureText(o.username).width > 820 && size > 34) {
    size -= 2
    ctx.font = `700 ${size}px ${FONT}`
  }
  ctx.fillText(o.username, cx, 440)

  if (o.bio.trim()) {
    ctx.fillStyle = '#64748b'
    ctx.font = `400 34px ${FONT}`
    const lines = wrapText(ctx, o.bio, 780, 3)
    lines.forEach((ln, i) => ctx.fillText(ln, cx, 505 + i * 48))
  }

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

  const qrSize = 230
  if (o.qr) ctx.drawImage(o.qr, (W - qrSize) / 2, 915, qrSize, qrSize)
  ctx.fillStyle = '#94a3b8'
  ctx.font = `500 28px ${FONT}`
  ctx.fillText('Scan to visit profile', cx, 1200)

  ctx.fillStyle = '#ffffff'
  ctx.font = `700 44px ${FONT}`
  ctx.fillText('DeShop', cx, 1308)
  ctx.globalAlpha = 0.8
  ctx.font = `400 26px ${FONT}`
  ctx.fillText(o.host, cx, 1350)
  ctx.globalAlpha = 1
}

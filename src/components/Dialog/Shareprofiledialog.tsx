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
import {
  SHARE_CARD_H,
  SHARE_CARD_THEMES,
  SHARE_CARD_W,
  loadShareCardImage,
  paintShareCard,
  svgToShareCardImage,
  type ShareCardTheme,
} from '@/utils/shareProfileCard'
import { getSiteOrigin } from '@/utils/seo'

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
  const [themeId, setThemeId] = useState<ShareCardTheme['id']>('sky')
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

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  const url = useMemo(
    () => (username ? `${getSiteOrigin()}/profile/${username}` : ''),
    [username]
  )
  const avatarSrc = avatarUrl ? GetAbosolutePathByRelative(avatarUrl, 'avatar') : ''
  const fileName = `${username.replace(/[^\w.-]+/g, '_') || 'profile'}-card.png`

  useEffect(() => {
    if (!open || !canvasEl || !username || !url) return
    let cancelled = false
    setRendering(true)
    blobRef.current = null

    const run = async () => {
      const theme = SHARE_CARD_THEMES.find((t) => t.id === themeId) ?? SHARE_CARD_THEMES[0]

      const [avatar, qr] = await Promise.all([
        avatarSrc ? loadShareCardImage(avatarSrc).catch(() => null) : Promise.resolve(null),
        (async () => {
          try {
            const svg = qrWrapRef.current?.querySelector('svg')
            return svg ? await svgToShareCardImage(svg) : null
          } catch {
            return null
          }
        })(),
      ])
      if (cancelled) return

      paintShareCard(canvasEl, {
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
        reject(e)
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
      if (e instanceof Error && e.name === 'AbortError') return
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

        <div className="relative mx-auto w-full max-w-[300px]">
          <canvas
            ref={setCanvasEl}
            width={SHARE_CARD_W}
            height={SHARE_CARD_H}
            role="img"
            aria-label={`Profile card for ${username}`}
            className="w-full h-auto rounded-2xl shadow-lg ring-1 ring-black/5 bg-gray-100"
          />
          {rendering && (
            <div className="absolute inset-0 grid place-items-center rounded-2xl bg-white/60">
              <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
            </div>
          )}

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

        <div
          role="radiogroup"
          aria-label="Card theme"
          className="flex items-center justify-center gap-3"
        >
          {SHARE_CARD_THEMES.map((t) => (
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

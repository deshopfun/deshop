import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'

const ImageLightbox = ({
  images,
  index,
  open,
  onClose,
  onChange,
}: {
  images: string[]
  index: number
  open: boolean
  onClose: () => void
  onChange: (i: number) => void
}) => {
  const total = images.length

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange])
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && total > 1) prev()
      else if (e.key === 'ArrowRight' && total > 1) next()
    }
    window.addEventListener('keydown', onKey)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = originalOverflow
    }
  }, [open, total, prev, next, onClose])

  if (!open || total === 0) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt={`preview ${index + 1}`}
        className="max-w-[92vw] max-h-[88vh] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
      />

      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm tabular-nums bg-black/40 px-3 py-1 rounded-full">
          {index + 1} / {total}
        </div>
      )}
    </div>
  )
}

export default ImageLightbox

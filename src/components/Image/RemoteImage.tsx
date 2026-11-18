import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string | null
  alt: string
  fallbackSrc?: string
  className?: string
}

/**
 * next/image wrapper that tolerates empty/remote API URLs and falls back gracefully.
 */
export default function RemoteImage({
  src,
  alt,
  fallbackSrc = '/images/default_image.png',
  className,
  ...rest
}: Props) {
  const initial = src && src.length > 0 ? src : fallbackSrc
  const [current, setCurrent] = useState(initial)

  return (
    <Image
      {...rest}
      src={current}
      alt={alt}
      className={cn(className)}
      onError={() => {
        if (current !== fallbackSrc) setCurrent(fallbackSrc)
      }}
    />
  )
}

import * as AspectRatio from '@radix-ui/react-aspect-ratio'

type YoutubePlayerProps = {
  videoSrc: string
  title?: string
}

type ParsedVideo =
  | { provider: 'youtube'; embedUrl: string }
  | { provider: 'bilibili'; embedUrl: string }
  | { provider: 'direct'; src: string }

function parseVideoUrl(url: string): ParsedVideo | null {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname

    // ---- YouTube ----
    if (hostname.includes('youtu.be') || hostname.includes('youtube.com')) {
      let videoId: string | null = null

      if (hostname.includes('youtu.be')) {
        // https://youtu.be/VIDEO_ID
        videoId = parsed.pathname.slice(1)
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1]
      } else {
        // https://www.youtube.com/watch?v=VIDEO_ID
        videoId = parsed.searchParams.get('v')
      }

      if (!videoId) return null
      return {
        provider: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      }
    }

    // ---- Bilibili ----
    if (hostname.includes('bilibili.com')) {
      if (hostname.includes('player.bilibili.com')) {
        return { provider: 'bilibili', embedUrl: url }
      }

      const match = parsed.pathname.match(/\/video\/(BV[0-9A-Za-z]+)/)
      const bvid = match?.[1]
      if (!bvid) return null

      const params = new URLSearchParams({
        bvid,
        page: '1',
        high_quality: '1',
        danmaku: '0', // 关闭弹幕，如果想保留弹幕可以设为 '1'
      })

      return {
        provider: 'bilibili',
        embedUrl: `https://player.bilibili.com/player.html?${params.toString()}`,
      }
    }

    if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
      return { provider: 'direct', src: url }
    }

    return null
  } catch {
    return null
  }
}

const YoutubePlayer = ({ videoSrc, title = 'Video player' }: YoutubePlayerProps) => {
  const parsed = parseVideoUrl(videoSrc)

  if (!parsed) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg bg-muted flex items-center justify-center aspect-video text-sm text-muted-foreground">
        Invalid video link
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
      <AspectRatio.Root ratio={16 / 9}>
        {parsed.provider === 'direct' ? (
          <video className="w-full h-full" src={parsed.src} title={title} controls />
        ) : (
          <iframe
            className="w-full h-full"
            src={parsed.embedUrl}
            title={title}
            allow={
              parsed.provider === 'youtube'
                ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                : 'autoplay; encrypted-media; fullscreen; picture-in-picture'
            }
            allowFullScreen
          />
        )}
      </AspectRatio.Root>
    </div>
  )
}

export default YoutubePlayer

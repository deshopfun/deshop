import * as AspectRatio from '@radix-ui/react-aspect-ratio'

interface YoutubePlayerProps {
  videoSrc: string
  title?: string
}

const YoutubePlayer = ({ videoSrc, title = 'YouTube video player' }: YoutubePlayerProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
      <AspectRatio.Root ratio={16 / 9}>
        <iframe
          className="w-full h-full"
          src={videoSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </AspectRatio.Root>
    </div>
  )
}

export default YoutubePlayer

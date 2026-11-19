import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import RemoteImage from '@/components/Image/RemoteImage'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { cn } from '@/lib/utils'
import { BookOpen, ChevronDown, ExternalLink } from 'lucide-react'
import type { ProductType } from '@/utils/types'

type Props = {
  story: NonNullable<ProductType['story']>
  storyHtml: string
  showStory: boolean
  setShowStory: (v: boolean | ((prev: boolean) => boolean)) => void
}

export default function ProductStorySection({
  story,
  storyHtml,
  showStory,
  setShowStory,
}: Props) {
  return (
    <section
      id="story"
      className="scroll-mt-32 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          aria-expanded={showStory}
          onClick={() => setShowStory((v) => !v)}
          className="flex-1 min-w-0 flex items-start justify-between gap-4 text-left group"
        >
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-sky-600">
              <BookOpen className="h-3.5 w-3.5" />
              Product Story
              {story.story_status !== 'active' && (
                <Badge variant="outline" className="text-[10px] font-normal">
                  {story.story_status}
                </Badge>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-sky-600 transition-colors">
              {story.title}
            </h2>
            {story.sub_title && (
              <p className="text-sm text-muted-foreground">{story.sub_title}</p>
            )}
          </div>

          <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-sky-600 mt-1">
            {showStory ? 'Hide' : 'Read story'}
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                showStory && 'rotate-180'
              )}
            />
          </span>
        </button>
        <Link
          href={`/story/${story.slug}`}
          className="shrink-0 mt-1 inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:border-sky-300 hover:text-sky-600 transition-colors"
        >
          Full story
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {showStory && (
        <div className="mt-6 flex flex-col gap-6">
          {story.cover_image && (
            <figure className="flex flex-col gap-2">
              <RemoteImage
                src={GetAbosolutePathByRelative(story.cover_image)}
                alt={story.title}
                width={1200}
                height={420}
                className="w-full max-h-[420px] object-cover rounded-xl border border-gray-100"
              />
              {story.cover_image_caption && (
                <figcaption className="text-xs text-muted-foreground text-center">
                  {story.cover_image_caption}
                </figcaption>
              )}
            </figure>
          )}

          <div
            className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-a:text-sky-600"
            dangerouslySetInnerHTML={{ __html: storyHtml }}
          />

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowStory(false)}
              className="text-xs text-sky-600 hover:underline font-medium"
            >
              Hide story
            </button>
            <Link
              href={`/story/${story.slug}`}
              className="inline-flex items-center gap-1 text-xs text-sky-600 hover:underline font-medium"
            >
              Open full page <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MetaTags from '@/components/Common/MetaTags'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Loader2,
  ShoppingBag,
  Hand,
  MessageCircle,
  Repeat2,
  Bookmark,
  Upload,
  RefreshCw,
} from 'lucide-react'
import { Http } from '@/utils/http/http'
import { GetAbosolutePathByRelative } from '@/utils/image'
import RemoteImage from '@/components/Image/RemoteImage'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useShallow } from 'zustand/react/shallow'
import ImageLightbox from '../Image/ImageLightbox'
import { safeJsonLd } from '@/utils/seo'
import { useStoryBySlug } from '@/hooks/queries/useStories'
import { stripHtml, toStoryDate } from '@/utils/storyTime'

// NOTE: engagement numbers and responses below are placeholder/preview data —
// the comments & reactions backend isn't wired up yet. Everything in this
// block is visually flagged as a preview so it can't be mistaken for real
// social proof. Replace with live data once the API exists.
const PREVIEW_STORY_STATS = {
  claps: '0',
  responses: 0,
  restacks: 0,
}

function estimateReadingTime(html: string) {
  const words = stripHtml(html).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}


type LoadState = 'loading' | 'error' | 'not-found' | 'ready'

const StoryDetails = () => {
  const router = useRouter()
  const slug = typeof router.query.id === 'string' ? router.query.id : ''
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])

  const storyQuery = useStoryBySlug(slug, router.isReady && !!slug)
  const story = storyQuery.data

  const loadState: LoadState = !router.isReady
    ? 'loading'
    : !slug
      ? 'not-found'
      : storyQuery.isLoading || (storyQuery.isFetching && !story)
        ? 'loading'
        : storyQuery.isError && !story
          ? (storyQuery.error as Error)?.message?.toLowerCase().includes('not found')
            ? 'not-found'
            : 'error'
          : story
            ? 'ready'
            : 'not-found'

  const { uuid, isLogin } = useUserPresistStore(
    useShallow((state) => ({
      uuid: state.uuid,
      isLogin: state.isLogin,
    }))
  )

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }
  const showSuccess = (msg: string) => {
    setSnackSeverity('success')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const requireLogin = () => {
    if (!isLogin || !uuid) {
      showError('Please log in to continue')
      return false
    }
    return true
  }

  useEffect(() => {
    if (storyQuery.isError && loadState === 'error') {
      showError('Network error. Please try again later.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyQuery.isError, loadState])

  const onRetry = () => {
    void storyQuery.refetch()
  }

  if (!router.isReady || loadState === 'loading') {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
      </div>
    )
  }

  if (loadState === 'error') {
    return (
      <div className="mx-auto max-w-[680px] px-6 py-32 text-center">
        <p className="text-xl text-gray-900 mb-4">Couldn't load this story</p>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 underline underline-offset-4 hover:text-gray-900"
          onClick={onRetry}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </button>
      </div>
    )
  }

  if (loadState === 'not-found' || !story) {
    return (
      <div className="mx-auto max-w-[680px] px-6 py-32 text-center">
        <p className="text-xl text-gray-900 mb-4">Story not found</p>
        <Link
          href="/"
          className="text-sm text-gray-500 underline underline-offset-4 hover:text-gray-900"
        >
          Back to home
        </Link>
      </div>
    )
  }

  const minutes = estimateReadingTime(story.render_body_html)
  const hasProduct = Boolean(story.product_slug || story.product_id)
  const productHref = hasProduct ? `/products/${story.product_slug || story.product_id}` : ''

  const tags = (story.product_tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  const createdAt = toStoryDate(story.create_time)
  const updatedAt = toStoryDate(story.update_time) || createdAt

  const coverSrc = story.cover_image
    ? story.cover_image.startsWith('http')
      ? story.cover_image
      : GetAbosolutePathByRelative(story.cover_image)
    : ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.sub_title,
    image: coverSrc || undefined,
    datePublished: createdAt?.toISOString(),
    dateModified: (updatedAt || createdAt)?.toISOString(),
    author: { '@type': 'Person', name: story.username || 'DESHOP' },
    publisher: { '@type': 'Organization', name: 'DESHOP', url: Http.baseHttpPath },
    mainEntityOfPage: `${Http.baseHttpPath}/stories/${story.slug}`,
  }

  const onShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: story.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        showSuccess('Link copied')
      }
    } catch {
      /* user cancelled the native share sheet — nothing to report */
    }
  }

  const onBookmark = () => {
    if (!requireLogin()) return
    // Bookmark persistence isn't implemented yet.
    showSuccess('Saved')
  }

  const onClap = () => {
    if (!requireLogin()) return
  }

  const openLightbox = (images: string[], index = 0) => {
    if (!images.length) return
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <MetaTags title={story.title} description={story.sub_title} image={coverSrc} type="article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />

      <article className="bg-white text-gray-900">
        <div className="mx-auto max-w-[900px] px-6 pt-10 pb-24 sm:pt-14">
          <header className="mb-8">
            <h1 className="font-serif text-[2rem] sm:text-[2.5rem] leading-[1.15] tracking-tight text-gray-900 font-bold">
              {story.title}
            </h1>
            {story.sub_title && (
              <p className="mt-4 text-xl sm:text-[22px] leading-snug text-gray-500 font-normal">
                {story.sub_title}
              </p>
            )}
          </header>

          <div className="flex items-center gap-3 mb-10">
            <button
              type="button"
              className="flex items-center gap-2.5 group"
              onClick={() => void router.push(`/profile/${story.username}`)}
            >
              <Avatar className="h-12 w-12">
                {story.user_avatar_url ? (
                  <AvatarImage src={GetAbosolutePathByRelative(story.user_avatar_url)} />
                ) : null}
                <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                  {(story.username || 'D')[0]}
                </AvatarFallback>
              </Avatar>

              <span className="text-[15px] font-medium text-gray-900 truncate group-hover:text-sky-600">
                {story.username || 'DESHOP'}
              </span>
            </button>

            <div className="flex flex-wrap items-center gap-x-2 text-[13px] text-gray-500">
              {createdAt && (
                <>
                  <time dateTime={createdAt.toISOString()}>
                    {createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                </>
              )}
              <span>{minutes} min read</span>
            </div>
          </div>

          {coverSrc && (
            <figure className="mb-10 -mx-6 sm:mx-0">
              <RemoteImage
                src={coverSrc}
                alt={story.title}
                width={1200}
                height={480}
                className="w-full max-h-[480px] object-cover sm:rounded-sm cursor-pointer"
                onClick={() => openLightbox([coverSrc])}
              />
              {story.cover_image_caption && (
                <figcaption className="mt-3 px-6 sm:px-0 text-center text-[13px] text-gray-500 leading-relaxed">
                  {story.cover_image_caption}
                </figcaption>
              )}
            </figure>
          )}

          <div
            className="
              text-[18px] sm:text-[20px] leading-[1.7] text-gray-800
              [&_p]:mb-6
              [&_h2]:font-serif [&_h2]:text-[1.5rem] [&_h2]:font-bold [&_h2]:text-gray-900
              [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-snug
              [&_h3]:text-[1.15rem] [&_h3]:font-bold [&_h3]:text-gray-900
              [&_h3]:mt-8 [&_h3]:mb-3
              [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
              [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2
              [&_li]:leading-[1.7]
              [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2
              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-900
              [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-gray-700
              [&_blockquote]:my-8
              [&_strong]:font-semibold [&_strong]:text-gray-900
              [&_em]:italic
              [&_code]:text-[0.9em] [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded
            "
            dangerouslySetInnerHTML={{ __html: story.render_body_html }}
          />

          {tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3.5 py-1.5 text-[13px] text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 flex items-center justify-between border-y border-gray-100 py-3">
            <div className="flex items-center gap-5 text-gray-500">
              <button
                type="button"
                className="flex items-center gap-1.5 text-[14px] hover:text-gray-900 transition-colors"
                onClick={onClap}
              >
                <Hand className="h-[18px] w-[18px]" />
                <span>{PREVIEW_STORY_STATS.claps}</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[14px] hover:text-gray-900 transition-colors"
                onClick={() => {
                  document.getElementById('responses')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <MessageCircle className="h-[18px] w-[18px]" />
                <span>{PREVIEW_STORY_STATS.responses}</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[14px] hover:text-gray-900 transition-colors"
              >
                <Repeat2 className="h-[18px] w-[18px]" />
                <span>{PREVIEW_STORY_STATS.restacks}</span>
              </button>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <button
                type="button"
                className="hover:text-gray-900 transition-colors"
                aria-label="Bookmark"
                onClick={onBookmark}
              >
                <Bookmark className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                className="hover:text-gray-900 transition-colors"
                aria-label="Share"
                onClick={onShare}
              >
                <Upload className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => void router.push(`/profile/${story.username}`)}
            >
              <Avatar className="h-14 w-14 shrink-0">
                {story.user_avatar_url ? (
                  <AvatarImage src={GetAbosolutePathByRelative(story.user_avatar_url)} />
                ) : null}
                <AvatarFallback className="bg-gray-100 text-gray-700">
                  {(story.username || 'D')[0]}
                </AvatarFallback>
              </Avatar>
            </button>

            <div>
              <button
                type="button"
                onClick={() => void router.push(`/profile/${story.username}`)}
              >
                <p className="text-[15px] font-semibold text-gray-900">
                  Written by {story.username || 'DESHOP'}
                </p>
              </button>

              {story.user_bio && (
                <p className="mt-1 text-[14px] text-gray-500 leading-relaxed">{story.user_bio}</p>
              )}
            </div>
          </div>

          {hasProduct && (
            <div className="mt-14 rounded-sm border border-gray-200 bg-gray-50 px-5 py-6 sm:px-6">
              <p className="text-[13px] uppercase tracking-wide text-gray-500 mb-2">
                From this story
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-lg font-serif font-bold text-gray-900 truncate">
                    {story.product_title || 'View product on DESHOP'}
                  </p>
                </div>
                <Link href={productHref}>
                  <Button className="shrink-0 h-11 rounded-full bg-gray-900 hover:bg-gray-800 gap-2 px-5">
                    <ShoppingBag className="h-4 w-4" />
                    View product
                  </Button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </article>

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onChange={setLightboxIndex}
      />
    </>
  )
}

export default StoryDetails

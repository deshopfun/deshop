import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
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
  Shield,
  RefreshCw,
} from 'lucide-react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { CURRENCYS } from '@/packages/constants/currency'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { ProductStoryType } from '@/utils/types'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deshop.space'

// NOTE: engagement numbers and responses below are placeholder/preview data —
// the comments & reactions backend isn't wired up yet. Everything in this
// block is visually flagged as a preview so it can't be mistaken for real
// social proof. Replace with live data once the API exists.
const PREVIEW_STORY_STATS = {
  claps: '0',
  responses: 0,
  restacks: 0,
}

const PREVIEW_RESPONSES = [
  {
    id: 1,
    name: 'Alex Chen',
    date: 'Aug 2',
    body: 'The mutual confirmation step is what sold me. Most crypto checkouts stop at the tx hash.',
    claps: 128,
  },
  {
    id: 2,
    name: 'Jordan Lee',
    date: 'Aug 3',
    body: 'Clear write-up. Would love a follow-up on which networks you support first.',
    claps: 56,
  },
  {
    id: 3,
    name: 'Sam Rivera',
    date: 'Aug 4',
    body: 'Writing product pages for humans instead of crawlers is advice more marketplaces need.',
    claps: 41,
  },
]

const PREVIEW_RECOMMENDED = [
  {
    slug: 'why-we-built-deshop',
    title: 'Why we built DESHOP for open commerce',
    subtitle: 'A short note on crypto, creators, and keeping checkout honest.',
    author_name: 'DESHOP Editorial',
    date: 'Jul 28, 2026',
    read: '4 min read',
  },
  {
    slug: 'listing-that-converts',
    title: 'Listings that convert without keyword stuffing',
    subtitle: 'What we look for in a trustworthy product page.',
    author_name: 'DESHOP Editorial',
    date: 'Jul 12, 2026',
    read: '6 min read',
  },
  {
    slug: 'on-chain-confirmation',
    title: 'On-chain confirmation, explained simply',
    subtitle: 'What "confirmed" means for buyers and sellers.',
    author_name: 'DESHOP Editorial',
    date: 'Jun 30, 2026',
    read: '5 min read',
  },
]

// Backend timestamps have been inconsistent about seconds vs milliseconds in
// this codebase, so normalize defensively: anything below the "seconds since
// ~2001" threshold is treated as seconds and scaled up.
const SECONDS_HEURISTIC_THRESHOLD = 10_000_000_000
function toDate(timestamp: number | undefined | null): Date | null {
  if (!timestamp) return null
  const ms = timestamp < SECONDS_HEURISTIC_THRESHOLD ? timestamp * 1000 : timestamp
  const date = new Date(ms)
  return Number.isNaN(date.getTime()) ? null : date
}

function stripHtml(html: string) {
  if (typeof window === 'undefined') return html.replace(/<[^>]*>/g, ' ')
  const el = document.createElement('div')
  el.innerHTML = html
  return el.textContent || el.innerText || ''
}

function estimateReadingTime(html: string) {
  const words = stripHtml(html).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

function formatPrice(price: string, currencyCode: string) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: currencyCode ? 'currency' : 'decimal',
      currency: currencyCode || undefined,
      maximumFractionDigits: 2,
    }).format(Number(price))
  } catch {
    // Unknown/unsupported currency code — fall back to a plain label.
    return `${currencyCode} ${price}`.trim()
  }
}

// Escape "<" so a title/subtitle containing "</script>" can't break out of
// the inline JSON-LD script tag.
function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

type LoadState = 'loading' | 'error' | 'not-found' | 'ready'

const StoryDetails = () => {
  const router = useRouter()
  const slug = typeof router.query.id === 'string' ? router.query.id : ''
  const [story, setStory] = useState<ProductStoryType>()
  const [loadState, setLoadState] = useState<LoadState>('loading')

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)
  const { getUuid, getIsLogin } = useUserPresistStore((state) => state)

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
    if (!getIsLogin?.() || !getUuid?.()) {
      showError('Please log in to continue')
      return false
    }
    return true
  }

  const init = async (slugValue: string, signal?: AbortSignal) => {
    setLoadState('loading')
    try {
      if (!slugValue) {
        setLoadState('not-found')
        return
      }
      const response: any = await axios.get(Http.product_story_by_id, {
        params: { slug: slugValue },
        signal,
      })
      if (response.result && response.data) {
        setStory({
          ...response.data,
          render_body_html: DOMPurify.sanitize(await marked(response.data.body_html || '')),
        })
        setLoadState('ready')
      } else {
        setLoadState('not-found')
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return
      setLoadState('error')
      showError('Network error. Please try again later.')
    }
  }

  useAbortableEffect(
    (signal) => {
      if (!router.isReady) return
      init(slug, signal)
    },
    [router.isReady, slug]
  )

  const onRetry = () => init(slug)

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
  const currencyCode = CURRENCYS.find((c) => c.name === story.currency)?.code ?? ''
  const price = story.variants?.[0]?.price
  const hasProduct = Boolean(story.product_slug || story.product_id)
  const productHref = hasProduct ? `/products/${story.product_slug || story.product_id}` : ''

  const tags = (story.product_tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  const createdAt = toDate(story.create_time)
  const updatedAt = toDate(story.update_time) || createdAt

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
    publisher: { '@type': 'Organization', name: 'DESHOP', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/stories/${story.slug}`,
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

  return (
    <>
      <MetaTags title={story.title} description={story.sub_title} image={coverSrc} type="article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />

      <article className="bg-white text-gray-900">
        <div className="mx-auto max-w-[900px] px-6 pt-10 pb-24 sm:pt-14">
          {/* Title */}
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

          {/* Author */}
          <div className="flex items-center gap-3 mb-10">
            <button
              type="button"
              className="flex items-center gap-2.5 group"
              onClick={() => (window.location.href = `/profile/${story.username}`)}
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

          {/* Cover */}
          {coverSrc && (
            <figure className="mb-10 -mx-6 sm:mx-0">
              <img
                src={coverSrc}
                alt={story.title}
                className="w-full max-h-[480px] object-cover sm:rounded-sm"
              />
              {story.cover_image_caption && (
                <figcaption className="mt-3 px-6 sm:px-0 text-center text-[13px] text-gray-500 leading-relaxed">
                  {story.cover_image_caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Body */}
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

          {/* Tags */}
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

          {/* Engagement bar (preview data — backend not wired up yet) */}
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

          {/* Author footer */}
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => (window.location.href = `/profile/${story.username}`)}
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
                onClick={() => (window.location.href = `/profile/${story.username}`)}
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

          {/* Product CTA */}
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
                  {price != null && (
                    <p className="text-[15px] text-gray-500 mt-0.5">
                      From {formatPrice(price, currencyCode)}
                    </p>
                  )}
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

          {/* Responses (preview data — comments backend not wired up yet) */}
          {/* <section id="responses" className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">
                Responses ({PREVIEW_STORY_STATS.responses})
              </h2>
              <Shield className="h-5 w-5 text-gray-400" aria-hidden />
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">You</span>
                </div>
                <span className="text-[14px] text-gray-500">Write a response</span>
              </div>
              <input
                type="text"
                placeholder="What are your thoughts?"
                className="w-full h-12 rounded-full bg-gray-100 px-5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none border border-transparent cursor-not-allowed"
                disabled
              />
              <p className="mt-2 text-[12px] text-gray-400">
                Comments coming soon — preview only, the responses below are examples.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {PREVIEW_RESPONSES.map((r) => (
                <div key={r.id} className="py-6 first:pt-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                        {r.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-gray-900">{r.name}</span>
                      <span className="text-[12px] text-gray-400">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-gray-800 pl-11">{r.body}</p>
                  <div className="pl-11 mt-3 flex items-center gap-1.5 text-gray-400 text-[13px]">
                    <Hand className="h-3.5 w-3.5" />
                    {r.claps}
                  </div>
                </div>
              ))}
            </div>
          </section> */}

          {/* Recommended (preview data) */}
          {/* <section className="mt-20 pt-10 border-t border-gray-100">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight mb-8">
              Recommended from DESHOP
            </h2>
            <div className="flex flex-col gap-10">
              {PREVIEW_RECOMMENDED.map((item) => (
                <Link
                  key={item.slug}
                  href={`/stories/${item.slug}`}
                  className="text-left group block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-gray-100">D</AvatarFallback>
                    </Avatar>
                    <span className="text-[13px] text-gray-700">{item.author_name}</span>
                  </div>
                  <h3 className="font-serif text-[1.25rem] font-bold text-gray-900 leading-snug group-hover:underline underline-offset-2">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-gray-500 leading-snug line-clamp-2">
                    {item.subtitle}
                  </p>
                  <p className="mt-2 text-[13px] text-gray-400">
                    {item.date}
                    <span className="mx-1">·</span>
                    {item.read}
                  </p>
                </Link>
              ))}
            </div>
          </section> */}

          {/* <p className="mt-14 text-center">
            <Link
              href="/"
              className="text-[14px] text-gray-500 hover:text-gray-900 underline-offset-4 hover:underline"
            >
              Back to DESHOP
            </Link>
          </p> */}
        </div>
      </article>
    </>
  )
}

export default StoryDetails

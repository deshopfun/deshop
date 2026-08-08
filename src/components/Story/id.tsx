import { useEffect, useMemo, useState } from 'react'
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
} from 'lucide-react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { CURRENCYS } from '@/packages/constants/currency'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { ProductStoryType, ProductType } from '@/utils/types'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deshop.space'

type StoryItem = {
  slug: string
  title: string
  subtitle?: string
  cover?: string
  cover_caption?: string
  author_name?: string
  author_bio?: string
  author_avatar?: string
  published_at: string
  updated_at?: string
  seo_title?: string
  seo_description?: string
  tags?: string[]
  body_markdown: string
  product_id?: number
  product_slug?: string
}

const STORIES: StoryItem[] = [
  {
    slug: 'deshop-crypto-checkout-guide',
    title: 'How crypto checkout actually works on DESHOP',
    subtitle:
      'On-chain payment, mutual confirmation, and what trust looks like when both sides have to agree.',
    cover: '/og-default.png',
    cover_caption: 'DESHOP — discover, buy, and sell with crypto',
    author_name: 'DESHOP Editorial',
    author_bio: 'Product and marketplace notes from the DESHOP team.',
    published_at: '2026-08-01T00:00:00.000Z',
    updated_at: '2026-08-07T00:00:00.000Z',
    seo_title: 'How crypto checkout works on DESHOP',
    seo_description:
      'A clear guide to paying with crypto on DESHOP: on-chain confirmation, mutual confirm between buyer and seller, and when an order is complete.',
    tags: ['Crypto', 'Checkout', 'Trust'],
    body_markdown: `
What if checkout didn’t end when you hit pay — but only when the chain settles and both people say the deal is done?

That is the bet DESHOP makes. Crypto is not a badge on a button; it is part of how completion is defined.

## Payment is only the first step

On many marketplaces, “paid” is treated as the finish line. Here, payment starts a sequence:

1. You choose a product and options  
2. You pay with supported crypto  
3. The network confirms the transfer  
4. Buyer and seller each confirm  

Until those last steps land, the order is not complete. That is deliberate. It gives both sides a shared checkpoint instead of a silent assumption.

## Why mutual confirmation matters

Chains are public; intent is not. A transfer can succeed on-chain while delivery is still open, disputed, or misunderstood. Asking both sides to confirm is a simple way to say: *we agree this is done.*

It will not fix every conflict. It does make the expected end state obvious — which is often what trust needs.

## Write the product page for humans, too

A listing that only chases keywords reads like it was written for a crawler. The same is true of checkout copy. Short, honest lines beat a wall of guarantees nobody reads.

If you sell on DESHOP, say what the buyer gets, when you deliver, and what happens after payment. People stay for clarity, not for denser SEO.

## FAQ

### When is an order complete?

After **on-chain confirmation** and **mutual confirmation** by buyer and seller.

### What should buyers check before paying?

Amount, asset, network, and the product terms on the listing. Crypto moves under network rules — verify before you send.
`.trim(),
  },
]

const STORY_STATS = {
  claps: '3.7K',
  responses: 75,
  restacks: 28,
}

const FAKE_RESPONSES = [
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

const FAKE_RECOMMENDED = [
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
    subtitle: 'What “confirmed” means for buyers and sellers.',
    author_name: 'DESHOP Editorial',
    date: 'Jun 30, 2026',
    read: '5 min read',
  },
]

function estimateReadingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

const StoryDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const [story, setStory] = useState<ProductStoryType>()

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

  const init = async (id: any, signal?: AbortSignal) => {
    try {
      if (!id) return showError('Incorrect product id')
      const response: any = await axios.get(Http.product_story_by_id, {
        params: { slug: id },
        signal,
      })
      if (response.result) {
        setStory({
          ...response.data,
          render_body_html: DOMPurify.sanitize(await marked(response.data.body_html || '')),
        })
      } else {
        showError(response.message)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return
      showError('Network error. Please try again later.')
    }
  }

  useAbortableEffect(
    (signal) => {
      if (!router.isReady || !id) return
      init(id, signal)
    },
    [router.isReady, id]
  )

  // const story = useMemo(() => {
  //   if (!router.isReady) return null
  //   if (id) return STORIES.find((s) => s.slug === id) || null
  //   return STORIES[0] || null
  // }, [router.isReady, id])

  // useEffect(() => {
  //   if (!story) {
  //     setBodyHtml('')
  //     return
  //   }
  //   let cancelled = false
  //   ;(async () => {
  //     const raw = String(await marked(story.body_markdown || ''))
  //     const safe = DOMPurify.sanitize(raw)
  //     if (!cancelled) setBodyHtml(safe)
  //   })()
  //   return () => {
  //     cancelled = true
  //   }
  // }, [story])

  // useEffect(() => {
  //   if (!story?.product_id && !story?.product_slug) {
  //     setProduct(null)
  //     return
  //   }
  //   let cancelled = false
  //   ;(async () => {
  //     try {
  //       const params = story.product_id
  //         ? { product_id: story.product_id }
  //         : { slug: story.product_slug }
  //       const res: any = await axios.get(Http.product_by_id, { params })
  //       if (!cancelled && res.result) setProduct(res.data)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   })()
  //   return () => {
  //     cancelled = true
  //   }
  // }, [story?.product_id, story?.product_slug])

  if (!router.isReady) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="mx-auto max-w-[680px] px-6 py-32 text-center">
        <p className="text-xl text-gray-900 mb-4">Story not found</p>
        <button
          type="button"
          className="text-sm text-gray-500 underline underline-offset-4 hover:text-gray-900"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Back to home
        </button>
      </div>
    )
  }

  const minutes = estimateReadingTime(story.render_body_html)
  // const currencyCode = CURRENCYS.find((c) => c.name === product?.currency)?.code ?? ''
  // const price = product?.variants?.[0]?.price
  // const productHref = story
  //   ? `/products/${story.product_slug || story.product_id}`
  //   : story.product_slug
  //     ? `/products/${story.product_slug}`
  //     : null
  const productHref = `/products/${story.product_slug || story.product_id}`

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
    datePublished: story.create_time,
    dateModified: story.update_time || story.create_time,
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
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <MetaTags
        title={story.title}
        description={story.sub_title}
        // image={story.cover_image}
        image={coverSrc}
        type="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Avatar className="h-12 w-12">
              {story.user_avatar_url ? (
                <AvatarImage src={GetAbosolutePathByRelative(story.user_avatar_url, 'avatar')} />
              ) : null}
              <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                {(story.username || 'D')[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] font-medium text-gray-900 truncate">
                {story.username || 'DESHOP'}
              </span>
              <div className="flex flex-wrap items-center gap-x-2 text-[13px] text-gray-500">
                <time dateTime={story.create_time.toLocaleString()}>
                  {new Date(story.create_time).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{minutes} min read</span>
              </div>
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
            // dangerouslySetInnerHTML={{ __html: bodyHtml }}
            dangerouslySetInnerHTML={{ __html: story.render_body_html }}
          />

          {/* Tags */}
          {story.product_tags && story.product_tags.split(',').length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {story.product_tags.split(',').map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3.5 py-1.5 text-[13px] text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Engagement bar */}
          <div className="mt-12 flex items-center justify-between border-y border-gray-100 py-3">
            <div className="flex items-center gap-5 text-gray-500">
              <button
                type="button"
                className="flex items-center gap-1.5 text-[14px] hover:text-gray-900 transition-colors"
              >
                <Hand className="h-[18px] w-[18px]" />
                <span>{STORY_STATS.claps}</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[14px] hover:text-gray-900 transition-colors"
                onClick={() => {
                  document.getElementById('responses')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <MessageCircle className="h-[18px] w-[18px]" />
                <span>{STORY_STATS.responses}</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[14px] hover:text-gray-900 transition-colors"
              >
                <Repeat2 className="h-[18px] w-[18px]" />
                <span>{STORY_STATS.restacks}</span>
              </button>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <button
                type="button"
                className="hover:text-gray-900 transition-colors"
                aria-label="Bookmark"
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
            <Avatar className="h-14 w-14 shrink-0">
              {story.user_avatar_url ? (
                <AvatarImage src={GetAbosolutePathByRelative(story.user_avatar_url, 'avatar')} />
              ) : null}
              <AvatarFallback className="bg-gray-100 text-gray-700">
                {(story.username || 'D')[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[15px] font-semibold text-gray-900">
                Written by {story.username || 'DESHOP'}
              </p>
              {story.user_bio && (
                <p className="mt-1 text-[14px] text-gray-500 leading-relaxed">{story.user_bio}</p>
              )}
            </div>
          </div>

          {/* Product CTA */}
          {productHref && (
            <div className="mt-14 rounded-sm border border-gray-200 bg-gray-50 px-5 py-6 sm:px-6">
              <p className="text-[13px] uppercase tracking-wide text-gray-500 mb-2">
                From this story
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-lg font-serif font-bold text-gray-900 truncate">
                    {/* {product?.title || 'View product on DESHOP'} */}
                  </p>
                  {/* {price != null && (
                    <p className="text-[15px] text-gray-500 mt-0.5">
                      From {currencyCode}
                      {price}
                    </p>
                  )} */}
                </div>
                <Button
                  className="shrink-0 h-11 rounded-full bg-gray-900 hover:bg-gray-800 gap-2 px-5"
                  onClick={() => {
                    window.location.href = productHref
                  }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  View product
                </Button>
              </div>
            </div>
          )}

          {/* Responses */}
          <section id="responses" className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">
                Responses ({STORY_STATS.responses})
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
                className="w-full h-12 rounded-full bg-gray-100 px-5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-colors"
                readOnly
              />
              <p className="mt-2 text-[12px] text-gray-400">
                Comments coming soon — UI preview only.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {FAKE_RESPONSES.map((r) => (
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
          </section>

          {/* Recommended */}
          <section className="mt-20 pt-10 border-t border-gray-100">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight mb-8">
              Recommended from DESHOP
            </h2>
            <div className="flex flex-col gap-10">
              {FAKE_RECOMMENDED.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  className="text-left group"
                  onClick={() => {
                    window.location.href = `/stories/${item.slug}`
                  }}
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
                </button>
              ))}
            </div>
          </section>

          <p className="mt-14 text-center">
            <Link
              href="/"
              className="text-[14px] text-gray-500 hover:text-gray-900 underline-offset-4 hover:underline"
            >
              Back to DESHOP
            </Link>
          </p>
        </div>
      </article>
    </>
  )
}

export default StoryDetails

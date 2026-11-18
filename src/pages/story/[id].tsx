import Index from '@/components/Index'
import Head from 'next/head'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { APP_DESCRIPTION, APP_NAME, IS_DEVELOPMENT } from '@/packages/constants'
import { getSiteOrigin, safeJsonLd, toAbsoluteUrl } from '@/utils/seo'

type SeoProps = {
  title: string
  description: string
  image: string
  canonicalPath: string
  jsonLd: Record<string, unknown> | null
}

export const getServerSideProps: GetServerSideProps<{ seo: SeoProps }> = async (ctx) => {
  const id = typeof ctx.params?.id === 'string' ? ctx.params.id : ''
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || getSiteOrigin()
  const apiBase = IS_DEVELOPMENT ? 'http://127.0.0.1:8899/api' : 'https://api.deshop.space/api'
  const assetBase = IS_DEVELOPMENT ? 'http://127.0.0.1:8899' : 'https://api.deshop.space'
  const canonicalPath = `/story/${id}`

  const fallback: SeoProps = {
    title: 'Story',
    description: APP_DESCRIPTION,
    image: toAbsoluteUrl('/og-default.png', origin),
    canonicalPath,
    jsonLd: null,
  }

  if (!id) return { props: { seo: fallback } }

  try {
    const params = new URLSearchParams({ slug: id })
    const res = await fetch(`${apiBase}/client/product-story-by-unique?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return { props: { seo: fallback } }

    const body = await res.json()
    if (!body?.result || !body.data) return { props: { seo: fallback } }

    const story = body.data
    const rawImage = story.cover_url || story.image
    const image = rawImage
      ? rawImage.startsWith('http')
        ? rawImage
        : `${assetBase}${rawImage}`
      : fallback.image
    const description =
      (typeof story.subtitle === 'string' && story.subtitle) ||
      (typeof story.body_html === 'string'
        ? story.body_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        : '') ||
      APP_DESCRIPTION

    return {
      props: {
        seo: {
          title: story.title || 'Story',
          description: description.slice(0, 160),
          image,
          canonicalPath,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: story.title,
            description: description.slice(0, 300),
            image,
            url: toAbsoluteUrl(canonicalPath, origin),
          },
        },
      },
    }
  } catch {
    return { props: { seo: fallback } }
  }
}

export default function StoryPage({
  seo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://deshop.space'
  const canonicalUrl = toAbsoluteUrl(seo.canonicalPath, origin)
  const title = `${seo.title} | ${APP_NAME}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={seo.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />
        {seo.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(seo.jsonLd) }}
          />
        )}
      </Head>
      <Index />
    </>
  )
}

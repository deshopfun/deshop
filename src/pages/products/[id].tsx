import Index from '@/components/Index'
import Head from 'next/head'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { APP_DESCRIPTION, APP_NAME, IS_DEVELOPMENT } from '@/packages/constants'
import { getSiteOrigin, safeJsonLd, stripUndefined, toAbsoluteUrl } from '@/utils/seo'

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
  const canonicalPath = `/products/${id}`

  const fallback: SeoProps = {
    title: 'Product',
    description: APP_DESCRIPTION,
    image: toAbsoluteUrl('/og-default.png', origin),
    canonicalPath,
    jsonLd: null,
  }

  if (!id) return { props: { seo: fallback } }

  try {
    const isNumericId = /^\d+$/.test(id)
    const params = new URLSearchParams(
      isNumericId ? { product_id: id } : { slug: id }
    )
    const res = await fetch(`${apiBase}/client/product-by-unique?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return { props: { seo: fallback } }

    const body = await res.json()
    if (!body?.result || !body.data) return { props: { seo: fallback } }

    const product = body.data
    const rawImage = product.images?.[0]?.src
    const image = rawImage
      ? rawImage.startsWith('http')
        ? rawImage
        : `${assetBase}${rawImage}`
      : fallback.image
    const description =
      (typeof product.body_html === 'string'
        ? product.body_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        : '') || APP_DESCRIPTION

    const variant = product.variants?.[0]
    const seo: SeoProps = {
      title: product.title || 'Product',
      description: description.slice(0, 160),
      image,
      canonicalPath,
      jsonLd: stripUndefined({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: description.slice(0, 300),
        image,
        sku: String(product.product_id ?? id),
        brand: product.vendor
          ? { '@type': 'Brand', name: product.vendor }
          : undefined,
        offers: variant
          ? {
              '@type': 'Offer',
              priceCurrency: product.currency || 'USD',
              price: variant.price ?? null,
              availability:
                Number(variant.inventory_quantity) > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
              url: toAbsoluteUrl(canonicalPath, origin),
            }
          : undefined,
      }),
    }

    return { props: { seo } }
  } catch {
    return { props: { seo: fallback } }
  }
}

export default function ProductPage({
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
        <meta property="og:type" content="product" />
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

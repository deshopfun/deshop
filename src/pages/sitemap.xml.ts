import { Http } from '@/utils/http/http'
import axios from '@/utils/http/axios'
import { ProductStoryType, ProductType } from '@/utils/types'
import type { GetServerSideProps } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || Http.httpClient

async function getProducts(): Promise<ProductType[]> {
  try {
    const response: any = await axios.get(Http.product_list, {
      params: { limit: 5000 },
    })

    if (response.result) {
      return response.data || []
    } else {
      return []
    }
  } catch (e) {
    return []
  }
}

async function getStories(): Promise<ProductStoryType[]> {
  try {
    const response: any = await axios.get(Http.product_story_list, {
      params: { limit: 5000 },
    })

    if (response.result) {
      return response.data || []
    } else {
      return []
    }
  } catch (e) {
    return []
  }
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

type SitemapUrl = {
  loc: string
  lastmod?: string
  changefreq: string
  priority: string
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const products = await getProducts()
  const stories = await getStories()

  const staticUrls: SitemapUrl[] = [
    { loc: SITE_URL, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/explore`, changefreq: 'daily', priority: '0.9' },
    { loc: `${SITE_URL}/support`, changefreq: 'monthly', priority: '0.5' },
  ]

  const productUrls = products.map((p) => ({
    loc: `${SITE_URL}/products/${p.slug || p.product_id}`,
    lastmod: p.update_time ? new Date(p.update_time).toISOString() : undefined,
    changefreq: 'weekly',
    priority: '0.8',
  }))

  const storyUrls = stories.map((p) => ({
    loc: `${SITE_URL}/story/${p.slug}`,
    lastmod: p.update_time ? new Date(p.update_time).toISOString() : undefined,
    changefreq: 'weekly',
    priority: '0.7',
  }))

  const all: SitemapUrl[] = [...staticUrls, ...productUrls, ...storyUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default function SiteMap() {
  return null
}

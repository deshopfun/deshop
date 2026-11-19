import { useQuery } from '@tanstack/react-query'
import { marked } from 'marked'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { ProductStoryType } from '@/utils/types'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

export type StoryWithHtml = ProductStoryType & { render_body_html?: string }

export const storyKeys = {
  list: (limit: number) => ['stories', 'list', limit] as const,
  bySlug: (slug: string) => ['stories', 'slug', slug] as const,
}

export function useStoryList(limit = 5) {
  return useQuery({
    queryKey: storyKeys.list(limit),
    queryFn: async () => {
      const response = (await axios.get(Http.product_story_list, {
        params: { limit },
      })) as ApiResponse<ProductStoryType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load stories')
      return response.data || []
    },
  })
}

export function useStoryBySlug(slug: string, enabled = true) {
  return useQuery({
    queryKey: storyKeys.bySlug(slug),
    enabled: enabled && !!slug,
    queryFn: async (): Promise<StoryWithHtml> => {
      const response = (await axios.get(Http.product_story_by_id, {
        params: { slug },
      })) as ApiResponse<ProductStoryType>
      if (!response.result || !response.data) {
        throw new Error(response.message || 'Story not found')
      }
      return {
        ...response.data,
        render_body_html: sanitizeHtml(await marked(response.data.body_html || '')),
      }
    },
  })
}

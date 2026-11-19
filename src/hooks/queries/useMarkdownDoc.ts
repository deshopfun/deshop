import { useQuery } from '@tanstack/react-query'
import { marked } from 'marked'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

export const markdownDocKeys = {
  byUrl: (url: string) => ['markdown-doc', url] as const,
}

export function useMarkdownDoc(url: string, enabled = true) {
  return useQuery({
    queryKey: markdownDocKeys.byUrl(url),
    enabled: enabled && !!url,
    queryFn: async () => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load document')
      const fileContents = await response.text()
      const htmlContents = await marked(fileContents)
      return sanitizeHtml(htmlContents)
    },
    staleTime: 5 * 60_000,
  })
}

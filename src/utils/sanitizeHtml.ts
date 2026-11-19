import DOMPurify from 'dompurify'

/**
 * Sanitize HTML for UGC. Uses DOMPurify when `window` exists;
 * on SSR returns empty string so callers never inject unsanitized markup.
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') return ''
  return DOMPurify.sanitize(dirty)
}

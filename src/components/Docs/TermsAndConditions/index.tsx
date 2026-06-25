import { useSnackPresistStore } from '@/lib'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'
import { Http } from '@/utils/http/http'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollText, Loader2 } from 'lucide-react'

const DocsTermsAndConditions = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const init = async () => {
    setLoading(true)
    try {
      const response = await fetch(Http.terms_and_conditions_md)
      const fileContents = await response.text()
      const htmlContents = await marked(fileContents)
      setContent(DOMPurify.sanitize(htmlContents))
    } catch {
      setSnackSeverity('error')
      setSnackMessage('Network error. Please try again later.')
      setSnackOpen(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { init() }, [])

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">

      {/* 页面标题 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
          <ScrollText className="h-5 w-5 text-purple-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Terms and Conditions</h1>
          <p className="text-sm text-muted-foreground">Please read these terms carefully before using Deshop</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : content ? (
            <div
              className="prose prose-sm max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-sky-500 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-800
                prose-ul:text-gray-600 prose-ol:text-gray-600
                prose-li:my-1
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-blockquote:border-l-purple-400 prose-blockquote:text-muted-foreground
                prose-hr:border-gray-100"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                <ScrollText className="h-7 w-7 text-gray-300" />
              </div>
              <p className="font-medium text-sm">No content available</p>
              <p className="text-xs text-muted-foreground">The terms document could not be loaded.</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}

export default DocsTermsAndConditions
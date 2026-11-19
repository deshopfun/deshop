import { useEffect } from 'react'
import { useSnackPresistStore } from '@/lib'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Loader2, type LucideIcon } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { useMarkdownDoc } from '@/hooks/queries/useMarkdownDoc'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  description: string
  url: string
  emptyHint: string
  icon?: LucideIcon
  iconWrapClassName?: string
  iconClassName?: string
}

const PROSE_CLASS =
  'prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-sky-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:my-1 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-sky-400 prose-blockquote:text-muted-foreground prose-hr:border-gray-100'

export default function DocsMarkdownPage({
  title,
  description,
  url,
  emptyHint,
  icon: Icon = FileText,
  iconWrapClassName = 'bg-sky-50',
  iconClassName = 'text-sky-500',
}: Props) {
  const docQuery = useMarkdownDoc(url)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  useEffect(() => {
    if (docQuery.isError) {
      setSnackSeverity('error')
      setSnackMessage(
        (docQuery.error as Error)?.message || 'Network error. Please try again later.'
      )
      setSnackOpen(true)
    }
  }, [docQuery.isError, docQuery.error, setSnackSeverity, setSnackMessage, setSnackOpen])

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={cn(
            'h-10 w-10 rounded-xl flex items-center justify-center',
            iconWrapClassName
          )}
        >
          <Icon className={cn('h-5 w-5', iconClassName)} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          {docQuery.isLoading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : docQuery.data ? (
            <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: docQuery.data }} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="h-7 w-7 text-gray-300" />
              </div>
              <p className="font-medium text-sm">No content available</p>
              <p className="text-xs text-muted-foreground">{emptyHint}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

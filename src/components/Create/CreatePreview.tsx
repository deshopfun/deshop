import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImagePlus } from 'lucide-react'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

const PreviewSwiper = dynamic(() => import('./CreatePreviewSwiper'), {
  ssr: false,
  loading: () => <div className="min-h-72 animate-pulse bg-gray-50" />,
})

type Props = {
  title: string
  vendor: string
  tags: string
  description: string
  productType: string
  imageList: string[]
}

export default function CreatePreview({
  title,
  vendor,
  tags,
  description,
  productType,
  imageList,
}: Props) {
  const hasContent = Boolean(title || vendor || tags.length > 0 || description || imageList.length)

  return (
    <div className="sticky top-24">
      <h2 className="font-semibold text-base mb-3">Preview</h2>
      <Card className="overflow-hidden">
        {hasContent ? (
          <>
            {imageList.length > 0 ? (
              <PreviewSwiper imageList={imageList} />
            ) : (
              <div className="w-full h-56 bg-gray-50 flex items-center justify-center text-muted-foreground text-sm">
                No images yet
              </div>
            )}

            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-base line-clamp-2">{title || 'Product Title'}</p>
                <Badge className="bg-sky-500 shrink-0">{productType}</Badge>
              </div>
              {vendor && <p className="text-sm text-muted-foreground">{vendor}</p>}
              {tags && (
                <div className="flex flex-wrap gap-1">
                  {tags
                    .split(',')
                    .filter(Boolean)
                    .map((tag, i) => (
                      <Badge key={`${tag.trim()}-${i}`} variant="outline" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                </div>
              )}
              {description && (
                <div
                  className="text-sm text-muted-foreground line-clamp-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
                />
              )}
            </CardContent>
          </>
        ) : (
          <CardContent className="p-8 flex flex-col items-center justify-center gap-3 text-center min-h-64">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <ImagePlus className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-sm text-muted-foreground">
              A preview of how your product will look
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

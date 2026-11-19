import { PRODUCT_TYPE } from '@/packages/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import SwitchRow from '../Switch/SwitchRow'

type Props = {
  title: string
  slug: string
  vendor: string
  productType: string
  tags: string
  description: string
  isPromote: boolean
  onTitleChange: (v: string) => void
  onSlugChange: (v: string) => void
  onVendorChange: (v: string) => void
  onProductTypeChange: (v: string) => void
  onTagsChange: (v: string) => void
  onDescriptionChange: (v: string) => void
  onPromoteChange: (v: boolean) => void
}

export default function CreateDetailsCard({
  title,
  slug,
  vendor,
  productType,
  tags,
  description,
  isPromote,
  onTitleChange,
  onSlugChange,
  onVendorChange,
  onProductTypeChange,
  onTagsChange,
  onDescriptionChange,
  onPromoteChange,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-base">Product Details</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Title your product"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="Unique your product url"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Vendor</Label>
            <Input
              value={vendor}
              onChange={(e) => onVendorChange(e.target.value)}
              placeholder="Product vendor name"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>
            Type <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRODUCT_TYPE).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => onProductTypeChange(val as string)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm border transition-all duration-150',
                  productType === val
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500'
                )}
              >
                {val as string}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>
            Tags <span className="text-red-500">*</span>
          </Label>
          <Input
            value={tags}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="Separate with commas: apple,nike,ai"
          />
          {tags && (
            <div className="flex flex-wrap gap-1 mt-1">
              {tags
                .split(',')
                .filter(Boolean)
                .map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag.trim()}
                  </Badge>
                ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>
            Description (supports HTML) <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Write a detailed description..."
            className="min-h-32 resize-y"
          />
        </div>

        <div className="flex flex-col">
          <SwitchRow
            label="Promote"
            desc="This product is only for promotion"
            checked={isPromote}
            onCheckedChange={onPromoteChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}

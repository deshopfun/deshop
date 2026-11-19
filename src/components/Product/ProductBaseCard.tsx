import { PRODUCT_TYPE } from '@/packages/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ImagePlus, Save, Settings, X, ImageIcon } from 'lucide-react'
import { getSiteOrigin } from '@/utils/seo'
import { GetAbosolutePathByRelative } from '@/utils/image'
import RemoteImage from '@/components/Image/RemoteImage'
import SwitchRow from '../Switch/SwitchRow'
import ProductStatusControls from './ProductStatusControls'
import { ACCEPT_TYPES, Field } from './ProductFormParts'

type StatusConfig = { label: string; className: string }

type Props = {
  title: string
  slug: string
  vendor: string
  productType: string
  tags: string
  description: string
  website: string
  video: string
  isPromote: boolean
  planImage: string
  planImageCaption: string
  planImageWebsite: string
  productStatus?: string
  currentStatus: StatusConfig
  savingBase: boolean
  savingStatus: boolean
  uploadingPlan: boolean
  onTitleChange: (v: string) => void
  onSlugChange: (v: string) => void
  onVendorChange: (v: string) => void
  onProductTypeChange: (v: string) => void
  onTagsChange: (v: string) => void
  onDescriptionChange: (v: string) => void
  onWebsiteChange: (v: string) => void
  onVideoChange: (v: string) => void
  onPromoteChange: (v: boolean) => void
  onPlanImageChange: (v: string) => void
  onPlanImageCaptionChange: (v: string) => void
  onPlanImageWebsiteChange: (v: string) => void
  onUploadPlanImage: (files: FileList | null) => void
  onSaveBase: () => void
  onUpdateStatus: (status: string) => void
}

export default function ProductBaseCard({
  title,
  slug,
  vendor,
  productType,
  tags,
  description,
  website,
  video,
  isPromote,
  planImage,
  planImageCaption,
  planImageWebsite,
  productStatus,
  currentStatus,
  savingBase,
  savingStatus,
  uploadingPlan,
  onTitleChange,
  onSlugChange,
  onVendorChange,
  onProductTypeChange,
  onTagsChange,
  onDescriptionChange,
  onWebsiteChange,
  onVideoChange,
  onPromoteChange,
  onPlanImageChange,
  onPlanImageCaptionChange,
  onPlanImageWebsiteChange,
  onUploadPlanImage,
  onSaveBase,
  onUpdateStatus,
}: Props) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
              <Settings className="h-4 w-4 text-sky-500" />
            </div>
            <h3 className="font-semibold">Base Info</h3>
          </div>
          <Button
            className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
            onClick={onSaveBase}
            disabled={savingBase}
          >
            <Save className="h-4 w-4" /> {savingBase ? 'Saving...' : 'Save'}
          </Button>
        </div>

        <ProductStatusControls
          productStatus={productStatus}
          currentStatus={currentStatus}
          saving={savingStatus}
          onUpdateStatus={onUpdateStatus}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Title" required>
            <Input value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Product title" />
          </Field>
          <Field label="Slug" required>
            <Input value={slug} onChange={(e) => onSlugChange(e.target.value)} placeholder="Product slug" />
          </Field>
          <Field label="Vendor">
            <Input value={vendor} onChange={(e) => onVendorChange(e.target.value)} placeholder="Vendor name" />
          </Field>
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
          <Input value={tags} onChange={(e) => onTagsChange(e.target.value)} placeholder="e.g. apple,nike,ai" />
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
        <div className="flex flex-col gap-1.5">
          <Label>Website</Label>
          <Input value={website} onChange={(e) => onWebsiteChange(e.target.value)} placeholder={getSiteOrigin()} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Video</Label>
          <Input
            value={video}
            onChange={(e) => onVideoChange(e.target.value)}
            placeholder="Video presentation of your product"
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

        <div className="border-t border-dashed mb-4" />

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
            <ImageIcon className="h-4 w-4 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold">Plan Image</h3>
            <p className="text-xs text-muted-foreground">
              A screenshot of your plans / pricing. Max 1MB · JPG / PNG / GIF / SVG · saved with Base Info
            </p>
          </div>
        </div>

        {planImage ? (
          <div className="group relative w-full max-w-lg rounded-xl overflow-hidden border bg-gray-50">
            <RemoteImage
              src={GetAbosolutePathByRelative(planImage)}
              alt="Plan"
              width={800}
              height={450}
              className="w-full h-auto object-contain"
            />
            <button
              type="button"
              aria-label="Remove plan image"
              onClick={() => onPlanImageChange('')}
              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            className={cn(
              'flex flex-col items-center justify-center gap-2 py-12 w-full max-w-lg rounded-xl border-2 border-dashed cursor-pointer transition-colors',
              uploadingPlan
                ? 'border-sky-300 bg-sky-50 pointer-events-none'
                : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
            )}
          >
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <ImagePlus className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              {uploadingPlan ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-xs text-muted-foreground">Only one image</p>
            <input
              type="file"
              accept={ACCEPT_TYPES.join(',')}
              className="sr-only"
              disabled={uploadingPlan}
              onChange={(e) => {
                onUploadPlanImage(e.target.files)
                e.target.value = ''
              }}
            />
          </label>
        )}

        {planImage && (
          <>
            <div className="flex flex-col gap-1.5">
              <Label>Plan Image Caption</Label>
              <Input
                value={planImageCaption}
                maxLength={100}
                onChange={(e) => onPlanImageCaptionChange(e.target.value)}
                placeholder="e.g. Pricing as of Oct 2026"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Plan Image Website</Label>
              <Input
                value={planImageWebsite}
                onChange={(e) => onPlanImageWebsiteChange(e.target.value)}
                placeholder={getSiteOrigin()}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

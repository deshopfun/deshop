import { useSnackPresistStore } from '@/lib'
import { FILE_TYPE, PRODUCT_TYPE } from '@/packages/constants'
import { ReactNode, useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import {
  ProductFaqType,
  ProductHighlightType,
  ProductImageType,
  ProductOptionType,
  ProductSpecType,
} from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  ImagePlus,
  Trash2,
  Plus,
  Save,
  Settings,
  Layers,
  Image as ImagesIcon,
  X,
  ImageIcon,
  Sparkles,
  ListChecks,
  HelpCircle,
} from 'lucide-react'
import { isValidHttpUrl } from '@/utils/verify'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useShallow } from 'zustand/react/shallow'
import SwitchRow from '../Switch/SwitchRow'
import { useListField } from '@/hooks/useListField'

interface Props {
  productId: number
  title?: string
  slug?: string
  vendor?: string
  productType?: string
  tags?: string
  description?: string
  website?: string
  video?: string
  isPromote?: string
  planImage?: string
  planImageCaption?: string
  planImageWebsite?: string
  options?: ProductOptionType[]
  images?: ProductImageType[]
  specs?: ProductSpecType[]
  highlights?: ProductHighlightType[]
  faqs?: ProductFaqType[]
  productStatus?: string
  init: (id: any) => Promise<void>
}

const LIMIT = { options: 3, highlights: 4, specs: 12, faqs: 8 }
const MAX_SIZE = 3 * 1024 * 1024
const PLAN_MAX_SIZE = 1 * 1024 * 1024
const ACCEPT_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

const newOption = () => ({ name: '', value: '' })
const newHighlight = () => ({ title: '', description: '' })
const newSpec = () => ({ label: '', value: '' })
const newFaq = () => ({ question: '', answer: '' })

const contentKey = (v: unknown) => JSON.stringify(v ?? null)

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  archived: { label: 'Archived', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  draft: { label: 'Draft', className: 'bg-amber-100 text-amber-700 border-amber-200' },
}

const TONES = {
  purple: { bg: 'bg-purple-50', text: 'text-purple-500' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-500' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-500' },
} as const

const SectionCard = ({
  icon: Icon,
  tone,
  title,
  description,
  count,
  max,
  canAdd,
  onAdd,
  addLabel,
  onSave,
  saving,
  children,
}: {
  icon: any
  tone: keyof typeof TONES
  title: string
  description?: string
  count?: number
  max?: number
  canAdd?: boolean
  onAdd?: () => void
  addLabel?: string
  onSave?: () => void
  saving?: boolean
  children: ReactNode
}) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              'h-8 w-8 shrink-0 rounded-lg flex items-center justify-center',
              TONES[tone].bg
            )}
          >
            <Icon className={cn('h-4 w-4', TONES[tone].text)} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold">{title}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onAdd && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAdd}
              disabled={!canAdd}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              {addLabel}
              {max !== undefined && count !== undefined && (
                <span className="text-xs text-muted-foreground tabular-nums">
                  {count}/{max}
                </span>
              )}
            </Button>
          )}
          {onSave && (
            <Button
              type="button"
              className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
              onClick={onSave}
              disabled={saving}
            >
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
            </Button>
          )}
        </div>
      </div>
      {children}
    </CardContent>
  </Card>
)

const ListRow = ({
  index,
  canRemove,
  onRemove,
  children,
}: {
  index: number
  canRemove: boolean
  onRemove: () => void
  children: ReactNode
}) => (
  <div>
    {index > 0 && <div className="border-t border-dashed mb-4" />}
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">{children}</div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Remove"
        disabled={!canRemove}
        className="mt-6 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0 disabled:opacity-30"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
)

const Field = ({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) => (
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs text-muted-foreground">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
  </div>
)

const EmptyHint = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-muted-foreground py-1">{children}</p>
)

const Product = (props: Props) => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [vendor, setVendor] = useState('')
  const [productType, setProductType] = useState<string>(PRODUCT_TYPE.OPENSOURCE)
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [video, setVideo] = useState('')
  const [isPromote, setIsPromote] = useState(false)
  const [planImage, setPlanImage] = useState('')
  const [planImageCaption, setPlanImageCaption] = useState('')
  const [planImageWebsite, setPlanImageWebsite] = useState('')
  const [imageList, setImageList] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadingPlan, setUploadingPlan] = useState(false)
  const [savingKey, setSavingKey] = useState<string | null>(null)

  // options 必填（至少 1 行）；其余三项选填，可以清空
  const optionsField = useListField([newOption()], newOption, { max: LIMIT.options, min: 1 })
  const highlightsField = useListField<{ title: string; description: string }>([], newHighlight, {
    max: LIMIT.highlights,
  })
  const specsField = useListField<{ label: string; value: string }>([], newSpec, {
    max: LIMIT.specs,
  })
  const faqsField = useListField<{ question: string; answer: string }>([], newFaq, {
    max: LIMIT.faqs,
  })

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }
  const showSuccess = (msg: string) => {
    setSnackSeverity('success')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  useEffect(() => {
    setTitle(props.title || '')
    setSlug(props.slug || '')
    setVendor(props.vendor || '')
    setProductType(props.productType || '')
    setTags(props.tags || '')
    setDescription(props.description || '')
    setWebsite(props.website || '')
    setVideo(props.video || '')
    setIsPromote(props.isPromote === 'true')
    setPlanImage(props.planImage || '')
    setPlanImageCaption(props.planImageCaption || '')
    setPlanImageWebsite(props.planImageWebsite || '')
  }, [
    props.title,
    props.slug,
    props.vendor,
    props.productType,
    props.tags,
    props.description,
    props.website,
    props.video,
    props.isPromote,
    props.planImage,
    props.planImageCaption,
    props.planImageWebsite,
  ])

  const optionsKey = contentKey(props.options)
  useEffect(() => {
    optionsField.setItems(
      props.options?.length
        ? props.options.map((o) => ({ name: o.name ?? '', value: o.value ?? '' }))
        : [newOption()]
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsKey])

  const imagesKey = contentKey(props.images?.map((i) => i.src))
  useEffect(() => {
    setImageList((props.images ?? []).filter((i) => i.src).map((i) => i.src))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesKey])

  const highlightsKey = contentKey(props.highlights)
  useEffect(() => {
    highlightsField.setItems(
      (props.highlights ?? []).map((h) => ({
        title: h.title ?? '',
        description: h.description ?? '',
      }))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightsKey])

  const specsKey = contentKey(props.specs)
  useEffect(() => {
    specsField.setItems(
      (props.specs ?? []).map((s) => ({ label: s.label ?? '', value: s.value ?? '' }))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specsKey])

  const faqsKey = contentKey(props.faqs)
  useEffect(() => {
    faqsField.setItems(
      (props.faqs ?? []).map((f) => ({ question: f.question ?? '', answer: f.answer ?? '' }))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqsKey])

  const saveSection = async (key: string, url: string, body: object) => {
    setSavingKey(key)
    try {
      const response: any = await axios.put(url, { product_id: props.productId, ...body })
      if (response.result) {
        await props.init(props.productId)
        showSuccess('Updated successfully')
      } else {
        showError(response.message || 'Update failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setSavingKey(null)
    }
  }

  const uploadFile = async (files: FileList | null) => {
    if (!files || !files.length) return showError('Not found the file')

    const validFiles = Array.from(files).filter((file) => {
      if (!ACCEPT_TYPES.includes(file.type)) {
        showError(`${file.name}: unsupported file type`)
        return false
      }
      if (file.size > MAX_SIZE) {
        showError(`${file.name}: exceeds 3MB`)
        return false
      }
      return true
    })
    if (!validFiles.length) return

    setUploadingImages(true)
    try {
      const formData = new FormData()
      validFiles.forEach((file) => formData.append('files', file))
      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.result && response.data.urls.length > 0) {
        setImageList((prev) => [...prev, ...response.data.urls])
      } else {
        showError('Upload Failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setUploadingImages(false)
    }
  }

  const uploadPlanImage = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return showError('Not found the file')
    if (!ACCEPT_TYPES.includes(file.type)) return showError('Unsupported file type')
    if (file.size > PLAN_MAX_SIZE) return showError('File exceeds 1MB')

    setUploadingPlan(true)
    try {
      const formData = new FormData()
      formData.append('files', file)
      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.result && response.data.urls.length > 0) {
        setPlanImage(response.data.urls[0])
        showSuccess('Image uploaded. Click Save in Base Info to apply.')
      } else {
        showError('Upload failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setUploadingPlan(false)
    }
  }

  const removeImage = (index: number) => {
    setImageList((prev) => prev.filter((_, i) => i !== index))
  }

  const onClickUpdateProductBase = async () => {
    if (!title) return showError('Incorrect title input')
    if (!slug) return showError('Incorrect slug input')
    if (!productType) return showError('Incorrect product type')
    if (!tags) return showError('Incorrect tags input')
    if (!description) return showError('Incorrect description input')
    if (website && !isValidHttpUrl(website)) return showError('Incorrect website input')
    if (video && !isValidHttpUrl(video)) return showError('Incorrect video input')
    if (planImageWebsite && !isValidHttpUrl(planImageWebsite))
      return showError('Incorrect plan image website input')

    const lowerSlug = slug.toLowerCase()
    setSavingKey('base')
    try {
      const response: any = await axios.put(Http.product_base, {
        product_id: props.productId,
        title,
        slug: lowerSlug,
        body_html: description,
        product_type: productType,
        tags,
        vendor,
        website,
        video,
        is_promote: isPromote ? 'true' : 'false',
        plan_image: planImage,
        plan_image_caption: planImage ? planImageCaption.trim() : '',
        plan_image_website: planImageWebsite,
      })
      if (response.result) {
        showSuccess('Updated successfully')
        window.location.href = `/products/${lowerSlug}`
      } else showError('Update failed')
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setSavingKey(null)
    }
  }

  const onClickUpdateProductOption = () => {
    const productOption: ProductOptionType[] = []
    for (const opt of optionsField.items) {
      const name = opt.name.trim()
      const value = opt.value.trim()
      if (name && value) {
        const arr = value.split(',').map((v) => v.trim())
        if (new Set(arr).size !== arr.length) {
          return showError('Product option has duplicate values')
        }
        productOption.push({ name, value: arr.join(',') })
      }
    }
    if (productOption.length === 0) return showError('At least one product option is needed')
    saveSection('options', Http.product_option, { options: productOption })
  }

  const onClickUpdateProductImage = () => {
    if (imageList.length === 0) return showError('At least one image is needed')
    const productImages: ProductImageType[] = imageList.map((src) => ({
      src,
      width: 100,
      height: 100,
    }))
    saveSection('images', Http.product_image, { images: productImages })
  }

  const onClickUpdateProductHighlight = () => {
    const cleaned = highlightsField.items
      .map((h) => ({ title: h.title.trim(), description: h.description.trim() }))
      .filter((h) => h.title || h.description)
    if (cleaned.some((h) => !h.title)) return showError('Each highlight needs a title')
    saveSection('highlights', Http.product_highlight, { highlights: cleaned })
  }

  const onClickUpdateProductSpec = () => {
    const cleaned = specsField.items
      .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
      .filter((s) => s.label || s.value)
    if (cleaned.some((s) => !s.label || !s.value))
      return showError('Each spec needs both a name and a value')
    const labels = cleaned.map((s) => s.label.toLowerCase())
    if (new Set(labels).size !== labels.length) return showError('Spec names must be unique')
    saveSection('specs', Http.product_spec, { specs: cleaned })
  }

  const onClickUpdateProductFaq = () => {
    const cleaned = faqsField.items
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question || f.answer)
    if (cleaned.some((f) => !f.question || !f.answer))
      return showError('Each FAQ needs both a question and an answer')
    saveSection('faqs', Http.product_faq, { faqs: cleaned })
  }

  const onClickUpdateProductStatus = async (status: string) => {
    if (status === props.productStatus) return showError('Product is already in this status')
    setSavingKey('status')
    try {
      const response: any = await axios.put(Http.product_base, {
        product_id: props.productId,
        product_status: status,
      })
      if (response.result) {
        await props.init(props.productId)
        showSuccess('Status updated')
      } else showError('Update failed')
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setSavingKey(null)
    }
  }

  const currentStatus = statusConfig[props.productStatus ?? 'draft']

  return (
    <div className="flex flex-col gap-4 py-4">
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
              onClick={onClickUpdateProductBase}
              disabled={savingKey === 'base'}
            >
              <Save className="h-4 w-4" /> {savingKey === 'base' ? 'Saving...' : 'Save'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <span
                className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-full border',
                  currentStatus.className
                )}
              >
                {currentStatus.label}
              </span>
            </div>
            <div className="flex gap-2">
              {props.productStatus !== 'active' && (
                <Button
                  size="sm"
                  className="h-8 bg-green-500 hover:bg-green-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus('active')}
                  disabled={savingKey === 'status'}
                >
                  Active
                </Button>
              )}
              {props.productStatus !== 'archived' && (
                <Button
                  size="sm"
                  className="h-8 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus('archived')}
                  disabled={savingKey === 'status'}
                >
                  Archived
                </Button>
              )}
              {props.productStatus !== 'draft' && (
                <Button
                  size="sm"
                  className="h-8 bg-amber-500 hover:bg-amber-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus('draft')}
                  disabled={savingKey === 'status'}
                >
                  Draft
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Title" required>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
              />
            </Field>
            <Field label="Slug" required>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Product slug"
              />
            </Field>
            <Field label="Vendor">
              <Input
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="Vendor name"
              />
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
                  onClick={() => setProductType(val as string)}
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
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. apple,nike,ai"
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a detailed description..."
              className="min-h-32 resize-y"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Website</Label>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder={typeof window !== 'undefined' ? window.location.origin : ''}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Video</Label>
            <Input
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="Video presentation of your product"
            />
          </div>

          <div className="flex flex-col">
            <SwitchRow
              label="Promote"
              desc="This product is only for promotion"
              checked={isPromote}
              onCheckedChange={setIsPromote}
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
                A screenshot of your plans / pricing. Max 1MB · JPG / PNG / GIF / SVG · saved with
                Base Info
              </p>
            </div>
          </div>

          {planImage ? (
            <div className="group relative w-full max-w-lg rounded-xl overflow-hidden border bg-gray-50">
              <img
                src={GetAbosolutePathByRelative(planImage)}
                alt="Plan"
                className="w-full h-auto object-contain"
              />
              <button
                type="button"
                aria-label="Remove plan image"
                onClick={() => setPlanImage('')}
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
                  uploadPlanImage(e.target.files)
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
                  onChange={(e) => setPlanImageCaption(e.target.value)}
                  placeholder="e.g. Pricing as of Oct 2026"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Plan Image Website</Label>
                <Input
                  value={planImageWebsite}
                  onChange={(e) => setPlanImageWebsite(e.target.value)}
                  placeholder={typeof window !== 'undefined' ? window.location.origin : ''}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <SectionCard
        icon={Layers}
        tone="purple"
        title="Product Options"
        description="Add up to 3 options like Color, Size, Material"
        count={optionsField.items.length}
        max={LIMIT.options}
        canAdd={optionsField.canAdd}
        onAdd={optionsField.add}
        addLabel="Add Option"
        onSave={onClickUpdateProductOption}
        saving={savingKey === 'options'}
      >
        <div className="flex flex-col gap-4">
          {optionsField.items.map((opt, index) => (
            <ListRow
              key={index}
              index={index}
              canRemove={optionsField.canRemove}
              onRemove={() => optionsField.remove(index)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label={`Option ${index + 1} Name`} required={index === 0}>
                  <Input
                    value={opt.name}
                    onChange={(e) => optionsField.update(index, 'name', e.target.value)}
                    placeholder={`e.g. ${['Color', 'Size', 'Material'][index] || 'Option'}`}
                  />
                </Field>
                <Field label="Values (comma separated)" required={index === 0}>
                  <Input
                    value={opt.value}
                    onChange={(e) => optionsField.update(index, 'value', e.target.value)}
                    placeholder="e.g. Red,Blue,Green"
                  />
                </Field>
              </div>
            </ListRow>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        icon={ImagesIcon}
        tone="orange"
        title="Product Images"
        description="Max 3MB · JPG / PNG / GIF / SVG"
        onSave={onClickUpdateProductImage}
        saving={savingKey === 'images'}
      >
        {imageList.length > 0 && (
          <div className="flex justify-end -mt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5"
              onClick={() => setImageList([])}
            >
              <Trash2 className="h-4 w-4" /> Clear all
            </Button>
          </div>
        )}

        {imageList.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {imageList.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="group relative aspect-square rounded-xl overflow-hidden border"
              >
                <img
                  src={GetAbosolutePathByRelative(src)}
                  alt="product"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={() => removeImage(i)}
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500 transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <label
              className={cn(
                'aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors',
                uploadingImages
                  ? 'border-sky-300 bg-sky-50 pointer-events-none'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
              )}
            >
              <Plus className="h-6 w-6 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">
                {uploadingImages ? 'Uploading...' : 'Add more'}
              </span>
              <input
                type="file"
                className="sr-only"
                multiple
                accept={ACCEPT_TYPES.join(',')}
                onChange={(e) => {
                  uploadFile(e.target.files)
                  e.target.value = ''
                }}
              />
            </label>
          </div>
        ) : (
          <label
            className={cn(
              'flex flex-col items-center justify-center gap-3 py-12 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
              uploadingImages
                ? 'border-sky-300 bg-sky-50 pointer-events-none'
                : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
            )}
          >
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <ImagePlus className="h-6 w-6 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                {uploadingImages ? 'Uploading...' : 'Click to upload images'}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Support multiple files</p>
            </div>
            <input
              type="file"
              className="sr-only"
              multiple
              accept={ACCEPT_TYPES.join(',')}
              onChange={(e) => {
                uploadFile(e.target.files)
                e.target.value = ''
              }}
            />
          </label>
        )}
      </SectionCard>

      <SectionCard
        icon={Sparkles}
        tone="sky"
        title="Product Highlights"
        description="Short selling points that tell buyers why this product is worth choosing."
        count={highlightsField.items.length}
        max={LIMIT.highlights}
        canAdd={highlightsField.canAdd}
        onAdd={highlightsField.add}
        addLabel="Add Highlight"
        onSave={onClickUpdateProductHighlight}
        saving={savingKey === 'highlights'}
      >
        {highlightsField.items.length === 0 ? (
          <EmptyHint>No highlights yet. Click “Add Highlight” to create one.</EmptyHint>
        ) : (
          <div className="flex flex-col gap-4">
            {highlightsField.items.map((h, index) => (
              <ListRow
                key={index}
                index={index}
                canRemove={highlightsField.canRemove}
                onRemove={() => highlightsField.remove(index)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label={`Highlight ${index + 1} Title`} required>
                    <Input
                      value={h.title}
                      maxLength={60}
                      onChange={(e) => highlightsField.update(index, 'title', e.target.value)}
                      placeholder="e.g. Works offline"
                    />
                  </Field>
                  <Field label="Description (optional)">
                    <Input
                      value={h.description}
                      maxLength={140}
                      onChange={(e) => highlightsField.update(index, 'description', e.target.value)}
                      placeholder="One sentence that explains it"
                    />
                  </Field>
                </div>
              </ListRow>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        icon={ListChecks}
        tone="emerald"
        title="Product Specifications"
        description="Factual details, such as version, license, or compatibility, shown as a label-and-value table."
        count={specsField.items.length}
        max={LIMIT.specs}
        canAdd={specsField.canAdd}
        onAdd={specsField.add}
        addLabel="Add Spec"
        onSave={onClickUpdateProductSpec}
        saving={savingKey === 'specs'}
      >
        {specsField.items.length === 0 ? (
          <EmptyHint>No specifications yet. Click “Add Spec” to create one.</EmptyHint>
        ) : (
          <div className="flex flex-col gap-4">
            {specsField.items.map((spec, index) => (
              <ListRow
                key={index}
                index={index}
                canRemove={specsField.canRemove}
                onRemove={() => specsField.remove(index)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label={`Spec ${index + 1} Name`} required>
                    <Input
                      value={spec.label}
                      maxLength={40}
                      onChange={(e) => specsField.update(index, 'label', e.target.value)}
                      placeholder={`e.g. ${['Platforms', 'License', 'Supported chains'][index] || 'Spec'}`}
                    />
                  </Field>
                  <Field label="Value" required>
                    <Input
                      value={spec.value}
                      maxLength={120}
                      onChange={(e) => specsField.update(index, 'value', e.target.value)}
                      placeholder="e.g. Web, iOS, Android"
                    />
                  </Field>
                </div>
              </ListRow>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        icon={HelpCircle}
        tone="rose"
        title="Product FAQs"
        description="Answers to the questions buyers most often ask before purchasing."
        count={faqsField.items.length}
        max={LIMIT.faqs}
        canAdd={faqsField.canAdd}
        onAdd={faqsField.add}
        addLabel="Add FAQ"
        onSave={onClickUpdateProductFaq}
        saving={savingKey === 'faqs'}
      >
        {faqsField.items.length === 0 ? (
          <EmptyHint>No FAQs yet. Click “Add FAQ” to create one.</EmptyHint>
        ) : (
          <div className="flex flex-col gap-4">
            {faqsField.items.map((faq, index) => (
              <ListRow
                key={index}
                index={index}
                canRemove={faqsField.canRemove}
                onRemove={() => faqsField.remove(index)}
              >
                <div className="flex flex-col gap-3">
                  <Field label={`Question ${index + 1}`} required>
                    <Input
                      value={faq.question}
                      maxLength={120}
                      onChange={(e) => faqsField.update(index, 'question', e.target.value)}
                      placeholder="e.g. Can I cancel anytime?"
                    />
                  </Field>
                  <Field label="Answer" required>
                    <Textarea
                      value={faq.answer}
                      maxLength={600}
                      rows={3}
                      className="resize-y"
                      onChange={(e) => faqsField.update(index, 'answer', e.target.value)}
                      placeholder="Write a clear, short answer"
                    />
                  </Field>
                </div>
              </ListRow>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  )
}

export default Product

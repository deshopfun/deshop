import { useSnackPresistStore } from '@/lib'
import { FILE_TYPE, PRODUCT_TYPE } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductImageType, ProductOptionType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ImagePlus, Trash2, Plus, Save, Settings, Layers, Image } from 'lucide-react'
import { isValidHttpUrl } from '@/utils/verify'
import { GetAbosolutePathByRelative } from '@/utils/image'

type Props = {
  product_id: number
  title?: string
  slug?: string
  vendor?: string
  productType?: string
  tags?: string
  description?: string
  website?: string
  video?: string
  options?: ProductOptionType[]
  images?: ProductImageType[]
  productStatus?: number
  init: (id: any) => Promise<void>
}

const OptionRow = ({
  index,
  name,
  value,
  onNameChange,
  onValueChange,
}: {
  index: number
  name: string
  value: string
  onNameChange: (v: string) => void
  onValueChange: (v: string) => void
}) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">Option {index} Name</Label>
      <Input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={`e.g. ${['Color', 'Size', 'Material'][index - 1]}`}
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">Values (comma separated)</Label>
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="e.g. Red,Blue,Green"
      />
    </div>
  </div>
)

const statusConfig: Record<number, { label: string; className: string }> = {
  1: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  2: { label: 'Archived', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  3: { label: 'Draft', className: 'bg-amber-100 text-amber-700 border-amber-200' },
}

const Product = (props: Props) => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [vendor, setVendor] = useState('')
  const [productType, setProductType] = useState(PRODUCT_TYPE.OPENSOURCE)
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [video, setVideo] = useState('')
  const [optionOne, setOptionOne] = useState('')
  const [optionOneValue, setOptionOneValue] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [optionTwoValue, setOptionTwoValue] = useState('')
  const [optionThree, setOptionThree] = useState('')
  const [optionThreeValue, setOptionThreeValue] = useState('')
  const [imageList, setImageList] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

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
    if (props.options) {
      setOptionOne(props.options[0]?.name || '')
      setOptionOneValue(props.options[0]?.value || '')
      setOptionTwo(props.options[1]?.name || '')
      setOptionTwoValue(props.options[1]?.value || '')
      setOptionThree(props.options[2]?.name || '')
      setOptionThreeValue(props.options[2]?.value || '')
    }
    if (props.images) {
      setImageList(props.images.filter((i) => i.src).map((i) => i.src))
    }
  }, [props])

  const uploadFile = async (files: FileList) => {
    if (!files.length) return showError('No file selected')
    setUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((f) => formData.append('files', f))
      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.result && response.data.urls.length > 0) {
        setImageList(response.data.urls)
      } else {
        showError('Upload failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setUploading(false)
    }
  }

  const onClickUpdateProductBase = async () => {
    if (!title) return showError('Incorrect title input')
    if (!slug) return showError('Incorrect slug input')
    if (!productType) return showError('Incorrect product type')
    if (!tags) return showError('Incorrect tags input')
    if (!description) return showError('Incorrect description input')
    if (website && !isValidHttpUrl(website)) return showError('Incorrect website input')
    if (video && !isValidHttpUrl(video)) return showError('Incorrect video input')
    try {
      const response: any = await axios.put(Http.product_base, {
        product_id: props.product_id,
        title,
        slug,
        body_html: description,
        product_type: productType,
        tags,
        vendor,
        website,
        video,
      })
      if (response.result) {
        window.location.href = `/products/${slug}`
        showSuccess('Updated successfully')
      } else showError('Update failed')
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const onClickUpdateProductOption = async () => {
    const productOption: ProductOptionType[] = []
    for (const [name, value] of [
      [optionOne, optionOneValue],
      [optionTwo, optionTwoValue],
      [optionThree, optionThreeValue],
    ]) {
      if (name && value) {
        const arr = value.split(',')
        if (new Set(arr).size !== arr.length)
          return showError('Product option has duplicate values')
        productOption.push({ name, value })
      }
    }
    if (productOption.length === 0) return showError('At least one product option is needed')
    try {
      const response: any = await axios.put(Http.product_option, {
        product_id: props.product_id,
        options: productOption,
      })
      if (response.result) {
        await props.init(props.product_id)
        showSuccess('Updated successfully')
      } else showError('Update failed')
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const onClickUpdateProductImage = async () => {
    if (imageList.length === 0) return showError('At least one image is needed')
    try {
      const productImages: ProductImageType[] = imageList.map((src) => ({
        src,
        width: 100,
        height: 100,
      }))
      const response: any = await axios.put(Http.product_image, {
        product_id: props.product_id,
        images: productImages,
      })
      if (response.result) {
        await props.init(props.product_id)
        showSuccess('Updated successfully')
      } else showError('Update failed')
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const onClickUpdateProductStatus = async (status: number) => {
    if (status === props.productStatus) return showError('Product is already in this status')
    try {
      const response: any = await axios.put(Http.product_base, {
        product_id: props.product_id,
        product_status: status,
      })
      if (response.result) {
        await props.init(props.product_id)
        showSuccess('Status updated')
      } else showError('Update failed')
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const currentStatus = statusConfig[props.productStatus ?? 3]

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
            >
              <Save className="h-4 w-4" /> Save
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
              {props.productStatus !== 1 && (
                <Button
                  size="sm"
                  className="h-8 bg-green-500 hover:bg-green-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus(1)}
                >
                  Active
                </Button>
              )}
              {props.productStatus !== 2 && (
                <Button
                  size="sm"
                  className="h-8 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus(2)}
                >
                  Archived
                </Button>
              )}
              {props.productStatus !== 3 && (
                <Button
                  size="sm"
                  className="h-8 bg-amber-500 hover:bg-amber-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus(3)}
                >
                  Draft
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Product slug"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Vendor</Label>
              <Input
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="Vendor name"
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
              placeholder={`${window.location.origin}`}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Video</Label>
            <Input
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder={'Video presentation of your product'}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Layers className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Product Options</h3>
                <p className="text-xs text-muted-foreground">Color, Size, Material etc.</p>
              </div>
            </div>
            <Button
              className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
              onClick={onClickUpdateProductOption}
            >
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>

          <OptionRow
            index={1}
            name={optionOne}
            value={optionOneValue}
            onNameChange={setOptionOne}
            onValueChange={setOptionOneValue}
          />
          <div className="border-t border-dashed" />
          <OptionRow
            index={2}
            name={optionTwo}
            value={optionTwoValue}
            onNameChange={setOptionTwo}
            onValueChange={setOptionTwoValue}
          />
          <div className="border-t border-dashed" />
          <OptionRow
            index={3}
            name={optionThree}
            value={optionThreeValue}
            onNameChange={setOptionThree}
            onValueChange={setOptionThreeValue}
          />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Image className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Product Images</h3>
                <p className="text-xs text-muted-foreground">Max 3MB · JPG / PNG / GIF / SVG</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {imageList.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5"
                  onClick={() => setImageList([])}
                >
                  <Trash2 className="h-4 w-4" /> Clear
                </Button>
              )}
              <Button
                className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
                onClick={onClickUpdateProductImage}
              >
                <Save className="h-4 w-4" /> Save
              </Button>
            </div>
          </div>

          {imageList.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {imageList.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border">
                  <img
                    src={GetAbosolutePathByRelative(src)}
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-sky-300 hover:bg-sky-50 transition-colors">
                <Plus className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Add more</span>
                <input
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={(e: any) => uploadFile(e.target.files)}
                />
              </label>
            </div>
          ) : (
            <label
              className={cn(
                'flex flex-col items-center justify-center gap-3 py-12 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
                uploading
                  ? 'border-sky-300 bg-sky-50'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
              )}
            >
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <ImagePlus className="h-6 w-6 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  {uploading ? 'Uploading...' : 'Click to upload images'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Support multiple files</p>
              </div>
              <input
                type="file"
                className="sr-only"
                multiple
                onChange={(e: any) => uploadFile(e.target.files)}
              />
            </label>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Product

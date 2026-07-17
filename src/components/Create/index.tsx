import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { FILE_TYPE, PRODUCT_TYPE } from '@/packages/constants'
import { useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductImageType, ProductOptionType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ImagePlus, Trash2, Plus, PackagePlus } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/navigation'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/scrollbar'
import { GetAbosolutePathByRelative } from '@/utils/image'

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
      <Label className="text-xs text-muted-foreground">
        Option {index} Name {index === 1 && <span className="text-red-500">*</span>}
      </Label>
      <Input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={`e.g. ${['Color', 'Size', 'Material'][index - 1]}`}
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">
        Values (comma separated) {index === 1 && <span className="text-red-500">*</span>}
      </Label>
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="e.g. Red,Blue,Green"
      />
    </div>
  </div>
)

const Create = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [vendor, setVendor] = useState('')
  const [productType, setProductType] = useState<string>(PRODUCT_TYPE.OPENSOURCE)
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [optionOne, setOptionOne] = useState('')
  const [optionOneValue, setOptionOneValue] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [optionTwoValue, setOptionTwoValue] = useState('')
  const [optionThree, setOptionThree] = useState('')
  const [optionThreeValue, setOptionThreeValue] = useState('')
  const [imageList, setImageList] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)
  const { getIsLogin } = useUserPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const uploadFile = async (files: FileList) => {
    if (!files.length) return showError('Not found the file')
    setUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((file) => formData.append('files', file))
      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.result && response.data.urls.length > 0) {
        setImageList(response.data.urls)
      } else {
        showError('Upload Failed')
      }
    } catch (e) {
      showError('Network error. Please try again later.')
    } finally {
      setUploading(false)
    }
  }

  const onClickCreateProduct = async () => {
    if (!getIsLogin()) return showError('Need login')
    if (!title) return showError('Incorrect title input')
    if (!slug) return showError('Incorrect slug input')
    if (!productType) return showError('Incorrect product type')
    if (!tags) return showError('Incorrect tags input')
    if (!description) return showError('Incorrect description input')

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
    if (imageList.length === 0) return showError('At least one image is needed')

    try {
      const productImages: ProductImageType[] = imageList.map((src) => ({
        src,
        width: 100,
        height: 100,
      }))
      const response: any = await axios.post(Http.product, {
        title,
        slug,
        body_html: description,
        product_type: productType,
        tags,
        vendor,
        images: productImages,
        options: productOption,
      })
      if (response.result) {
        setSnackSeverity('success')
        setSnackMessage('Create successfully')
        setSnackOpen(true)
        window.location.href = `/products/${response.data.slug}`
      } else {
        showError(response.message)
      }
    } catch (e) {
      showError('Network error. Please try again later.')
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
          <PackagePlus className="h-5 w-5 text-sky-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Create New Product</h1>
          <p className="text-sm text-muted-foreground">
            You can modify it after the product is created
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
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
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title your product"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>
                    Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Unique your product url"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Vendor</Label>
                  <Input
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="Product vendor name"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>
                  Type <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_TYPE &&
                    Object.entries(PRODUCT_TYPE).map(([key, val]) => (
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
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a detailed description..."
                  className="min-h-32 resize-y"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">Product Options</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add up to 3 options like Color, Size, Material
                </p>
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

          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-base">
                    Product Images <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Max 3MB · JPG / PNG / GIF / SVG
                  </p>
                </div>
                {imageList.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
                    onClick={() => setImageList([])}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>

              {imageList.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {imageList.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden border"
                    >
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
                    'flex flex-col items-center justify-center gap-3 py-16 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
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

          <Button
            className="h-12 text-base bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
            onClick={onClickCreateProduct}
          >
            <PackagePlus className="h-5 w-5" />
            Create Product
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="sticky top-24">
            <h2 className="font-semibold text-base mb-3">Preview</h2>
            <Card className="overflow-hidden">
              {title || slug || vendor || tags.length > 0 || description ? (
                <>
                  {imageList.length > 0 ? (
                    <Swiper
                      navigation={true}
                      pagination={true}
                      modules={[Navigation, Pagination]}
                      className="min-h-72"
                    >
                      {imageList.map((item, i) => (
                        <SwiperSlide key={i}>
                          <div className="flex justify-center items-center p-8 bg-gray-50 min-h-72">
                            <img
                              src={GetAbosolutePathByRelative(item)}
                              alt="product"
                              className="max-h-64 object-contain rounded-xl"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      src={GetAbosolutePathByRelative(imageList[0])}
                      alt="preview"
                      className="w-full h-56 object-cover"
                    />
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
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                      </div>
                    )}
                    {description && (
                      <div
                        className="text-sm text-muted-foreground line-clamp-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: description }}
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
        </div>
      </div>
    </div>
  )
}

export default Create

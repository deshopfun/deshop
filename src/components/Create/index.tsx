import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { PRODUCT_TYPE } from '@/packages/constants'
import { useState } from 'react'
import { ProductImageType, ProductOptionType } from '@/utils/types'
import { uploadFiles } from '@/utils/upload'
import { parseProductImport, pickImportField } from '@/utils/productImport'
import { useRouter } from 'next/router'
import { useCreateProduct } from '@/hooks/queries/useCreateProduct'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PackagePlus } from 'lucide-react'
import CreateImportPanel from './CreateImportPanel'
import CreatePreview from './CreatePreview'
import CreateOptionsCard from './CreateOptionsCard'
import CreateDetailsCard from './CreateDetailsCard'
import ProductImageGrid from '@/components/Product/ProductImageGrid'
import { ACCEPT_TYPES, MAX_SIZE } from '@/components/Product/ProductFormParts'
import { useShallow } from 'zustand/react/shallow'
const Create = () => {
  const router = useRouter()
  const createProduct = useCreateProduct()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [vendor, setVendor] = useState('')
  const [productType, setProductType] = useState<string>(PRODUCT_TYPE.OPENSOURCE)
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState<{ name: string; value: string }[]>([
    { name: '', value: '' },
  ])
  const [imageList, setImageList] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  // Import related
  const [importText, setImportText] = useState('')
  const [parsing, setParsing] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [isPromote, setIsPromote] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )
  const { isLogin } = useUserPresistStore(
    useShallow((state) => ({
      isLogin: state.isLogin,
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

  // ========== Option helpers ==========
  const addOption = () => {
    if (options.length >= 3) return
    setOptions([...options, { name: '', value: '' }])
  }

  const removeOption = (index: number) => {
    if (options.length <= 1) return
    setOptions(options.filter((_, i) => i !== index))
  }

  const updateOption = (index: number, field: 'name' | 'value', val: string) => {
    const next = [...options]
    next[index] = { ...next[index], [field]: val }
    setOptions(next)
  }

  // ========== Parse & Fill ==========
  const parseAndFill = (raw: string) => {
    if (!raw.trim()) {
      showError('Please paste text or upload a file first')
      return
    }

    setParsing(true)
    try {
      const data = parseProductImport(raw)

      if (!data.title && !data.Title) {
        showError('Failed to parse. Please check the text format')
        return
      }

      const get = (...keys: string[]) => pickImportField(data, ...keys)

      const newTitle = get('title', 'Title')
      const newSlug = get('slug', 'Slug')
      const newVendor = get('vendor', 'Vendor')
      const newType = get('product_type', 'productType', 'Type', 'type')
      const newTags = get('tags', 'Tags')
      const newDesc = get('description', 'Description', 'body_html', 'body')
      const newPromote = get('is_promote', 'IsPromote', 'Promote', 'promote')

      if (newTitle) setTitle(newTitle)
      if (newSlug) setSlug(newSlug)
      if (newVendor) setVendor(newVendor)
      if (newTags) setTags(newTags)
      if (newDesc) setDescription(newDesc)
      if (newPromote) setIsPromote(newPromote === 'true')

      if (newType) {
        const matched = Object.values(PRODUCT_TYPE).find(
          (v) => String(v).toLowerCase() === newType.toLowerCase()
        )
        if (matched) setProductType(matched as string)
      }

      // Options
      if (Array.isArray(data.options) && data.options.length > 0) {
        const parsed = data.options.slice(0, 3).map((opt) => ({
          name: opt.name || '',
          value: opt.value || '',
        }))
        setOptions(parsed.length > 0 ? parsed : [{ name: '', value: '' }])
      } else {
        const list: { name: string; value: string }[] = []
        const o1 = get('Option1', 'option1')
        const v1 = get('Values1', 'values1')
        const o2 = get('Option2', 'option2')
        const v2 = get('Values2', 'values2')
        const o3 = get('Option3', 'option3')
        const v3 = get('Values3', 'values3')

        if (o1 || v1) list.push({ name: o1, value: v1 })
        if (o2 || v2) list.push({ name: o2, value: v2 })
        if (o3 || v3) list.push({ name: o3, value: v3 })

        setOptions(list.length > 0 ? list : [{ name: '', value: '' }])
      }

      showSuccess('Parsed successfully. Form has been filled. Please review and submit.')
    } catch (e) {
      console.error(e)
      showError('An error occurred while parsing. Please check the text format')
    } finally {
      setParsing(false)
    }
  }

  const handleImportFile = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content) {
        setImportText(content)
        parseAndFill(content)
      }
    }
    reader.onerror = () => showError('Failed to read the file')
    reader.readAsText(file)
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

    setUploading(true)
    try {
      const urls = await uploadFiles(validFiles)
      setImageList((prev) => [...prev, ...urls])
    } catch (e) {
      showError((e as Error)?.message || 'Network error. Please try again later.')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImageList((prev) => prev.filter((_, i) => i !== index))
  }

  const onClickCreateProduct = async () => {
    if (!isLogin) return showError('Need login')
    if (!title) return showError('Incorrect title input')
    if (!slug) return showError('Incorrect slug input')
    if (!productType) return showError('Incorrect product type')
    if (!tags) return showError('Incorrect tags input')
    if (!description) return showError('Incorrect description input')

    const productOption: ProductOptionType[] = []
    for (const opt of options) {
      if (opt.name && opt.value) {
        const arr = opt.value.split(',')
        if (new Set(arr).size !== arr.length) {
          return showError('Product option has duplicate values')
        }
        productOption.push({ name: opt.name, value: opt.value })
      }
    }
    if (productOption.length === 0) return showError('At least one product option is needed')
    if (imageList.length === 0) return showError('At least one image is needed')
    const lowerSlug = slug.toLowerCase()

    try {
      const productImages: ProductImageType[] = imageList.map((src) => ({
        src,
        width: 100,
        height: 100,
      }))
      const data = await createProduct.mutateAsync({
        title,
        slug: lowerSlug,
        body_html: description,
        product_type: productType,
        tags,
        vendor,
        images: productImages,
        options: productOption,
        is_promote: isPromote ? 'true' : 'false',
      })
      setSnackSeverity('success')
      setSnackMessage('Create successfully')
      setSnackOpen(true)
      void router.push(`/products/${data.slug}`)
    } catch (e) {
      showError(e instanceof Error ? e.message : 'Network error. Please try again later.')
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
          <CreateImportPanel
            showImport={showImport}
            onToggle={() => setShowImport(!showImport)}
            importText={importText}
            onImportTextChange={setImportText}
            parsing={parsing}
            onParse={() => parseAndFill(importText)}
            onImportFile={handleImportFile}
            onClear={() => setImportText('')}
          />

          <CreateDetailsCard
            title={title}
            slug={slug}
            vendor={vendor}
            productType={productType}
            tags={tags}
            description={description}
            isPromote={isPromote}
            onTitleChange={setTitle}
            onSlugChange={setSlug}
            onVendorChange={setVendor}
            onProductTypeChange={setProductType}
            onTagsChange={setTags}
            onDescriptionChange={setDescription}
            onPromoteChange={setIsPromote}
          />

          <CreateOptionsCard
            options={options}
            onAdd={addOption}
            onRemove={removeOption}
            onUpdate={updateOption}
          />

          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">
                  Product Images <span className="text-red-500">*</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Max 3MB · JPG / PNG / GIF / SVG
                </p>
              </div>

              <ProductImageGrid
                imageList={imageList}
                uploading={uploading}
                onUpload={uploadFile}
                onRemove={removeImage}
                onClear={() => setImageList([])}
              />
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
          <CreatePreview
            title={title}
            vendor={vendor}
            tags={tags}
            description={description}
            productType={productType}
            imageList={imageList}
          />
        </div>
      </div>
    </div>
  )
}

export default Create

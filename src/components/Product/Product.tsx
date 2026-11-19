import { useRouter } from 'next/router'
import { useSnackPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import { Http } from '@/utils/http/http'
import { uploadFiles } from '@/utils/upload'
import {
  useUpdateProductBase,
  useUpdateProductEndpoint,
} from '@/hooks/queries/useUpdateProduct'
import {
  ProductFaqType,
  ProductHighlightType,
  ProductImageType,
  ProductOptionType,
  ProductSpecType,
} from '@/utils/types'
import { Image as ImagesIcon } from 'lucide-react'
import { isValidHttpUrl } from '@/utils/verify'
import { useShallow } from 'zustand/react/shallow'
import { useListField } from '@/hooks/useListField'
import {
  ACCEPT_TYPES,
  LIMIT,
  MAX_SIZE,
  PLAN_MAX_SIZE,
  SectionCard,
  contentKey,
  newFaq,
  newHighlight,
  newOption,
  newSpec,
  statusConfig,
} from './ProductFormParts'
import ProductImageGrid from './ProductImageGrid'
import ProductMetaSections from './ProductMetaSections'
import ProductBaseCard from './ProductBaseCard'
import ProductOptionsCard from './ProductOptionsCard'

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
  init: (id?: string | number) => Promise<void>
}

const Product = (props: Props) => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [vendor, setVendor] = useState('')
  const [productType, setProductType] = useState('')
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
  const updateBase = useUpdateProductBase()
  const updateEndpoint = useUpdateProductEndpoint()

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
      await updateEndpoint.mutateAsync({
        url,
        payload: { product_id: props.productId, ...body },
      })
      await props.init(props.productId)
      showSuccess('Updated successfully')
    } catch (e) {
      showError(e instanceof Error ? e.message : 'Network error. Please try again later.')
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
      const urls = await uploadFiles(validFiles)
      setImageList((prev) => [...prev, ...urls])
    } catch (e) {
      showError((e as Error)?.message || 'Network error. Please try again later.')
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
      const urls = await uploadFiles([file])
      if (urls[0]) {
        setPlanImage(urls[0])
        showSuccess('Image uploaded. Click Save in Base Info to apply.')
      } else {
        showError('Upload failed')
      }
    } catch (e) {
      showError((e as Error)?.message || 'Network error. Please try again later.')
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
      await updateBase.mutateAsync({
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
      showSuccess('Updated successfully')
      void router.push(`/products/${lowerSlug}`)
    } catch (e) {
      showError(e instanceof Error ? e.message : 'Network error. Please try again later.')
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
      await updateBase.mutateAsync({
        product_id: props.productId,
        product_status: status,
      })
      await props.init(props.productId)
      showSuccess('Status updated')
    } catch (e) {
      showError(e instanceof Error ? e.message : 'Network error. Please try again later.')
    } finally {
      setSavingKey(null)
    }
  }

  const currentStatus = statusConfig[props.productStatus ?? 'draft'] ?? statusConfig.draft

  return (
    <div className="flex flex-col gap-4 py-4">
      <ProductBaseCard
        title={title}
        slug={slug}
        vendor={vendor}
        productType={productType}
        tags={tags}
        description={description}
        website={website}
        video={video}
        isPromote={isPromote}
        planImage={planImage}
        planImageCaption={planImageCaption}
        planImageWebsite={planImageWebsite}
        productStatus={props.productStatus}
        currentStatus={currentStatus}
        savingBase={savingKey === 'base'}
        savingStatus={savingKey === 'status'}
        uploadingPlan={uploadingPlan}
        onTitleChange={setTitle}
        onSlugChange={setSlug}
        onVendorChange={setVendor}
        onProductTypeChange={setProductType}
        onTagsChange={setTags}
        onDescriptionChange={setDescription}
        onWebsiteChange={setWebsite}
        onVideoChange={setVideo}
        onPromoteChange={setIsPromote}
        onPlanImageChange={setPlanImage}
        onPlanImageCaptionChange={setPlanImageCaption}
        onPlanImageWebsiteChange={setPlanImageWebsite}
        onUploadPlanImage={uploadPlanImage}
        onSaveBase={onClickUpdateProductBase}
        onUpdateStatus={onClickUpdateProductStatus}
      />

      <ProductOptionsCard
        items={optionsField.items}
        canAdd={optionsField.canAdd}
        canRemove={optionsField.canRemove}
        saving={savingKey === 'options'}
        onAdd={optionsField.add}
        onRemove={optionsField.remove}
        onUpdate={optionsField.update}
        onSave={onClickUpdateProductOption}
      />

      <SectionCard
        icon={ImagesIcon}
        tone="orange"
        title="Product Images"
        description="Max 3MB · JPG / PNG / GIF / SVG"
        onSave={onClickUpdateProductImage}
        saving={savingKey === 'images'}
      >
        <ProductImageGrid
          imageList={imageList}
          uploading={uploadingImages}
          onUpload={uploadFile}
          onRemove={removeImage}
          onClear={() => setImageList([])}
        />
      </SectionCard>

      <ProductMetaSections
        highlightsField={highlightsField}
        specsField={specsField}
        faqsField={faqsField}
        savingKey={savingKey}
        onSaveHighlights={onClickUpdateProductHighlight}
        onSaveSpecs={onClickUpdateProductSpec}
        onSaveFaqs={onClickUpdateProductFaq}
      />
    </div>
  )
}

export default Product

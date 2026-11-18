import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'
import { COLLECT_TYPE } from '@/packages/constants'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { ProductType, ProductVariantType } from '@/utils/types'
import { CURRENCYS } from '@/packages/constants/currency'
import Decimal from 'decimal.js'
import { useShallow } from 'zustand/react/shallow'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import type { ApiResponse } from '@/utils/http/types'

type ProductDetailResult = {
  product: ProductType
  storyHtml: string
}

async function fetchProductDetail(id: string, isLogin: boolean): Promise<ProductDetailResult> {
  const endpoint = isLogin ? Http.product_by_login_id : Http.product_by_id
  const isNumericId = /^\d+$/.test(String(id))
  const response = (await axios.get(endpoint, {
    params: isNumericId ? { product_id: id } : { slug: id },
  })) as ApiResponse<ProductType & { story?: { body_html?: string } }>

  if (!response.result) {
    throw new Error(response.message || 'Failed to load product')
  }

  return {
    product: {
      ...response.data,
      render_body_html: DOMPurify.sanitize(await marked(response.data.body_html || '')),
    },
    storyHtml: response.data.story?.body_html
      ? DOMPurify.sanitize(await marked(response.data.story.body_html))
      : '',
  }
}

export function useProductDetails(id: string, routerReady: boolean) {
  const queryClient = useQueryClient()

  const [openRatingsDialog, setOpenRatingsDialog] = useState(false)
  const [openRefundPolicy, setOpenRefundPolicy] = useState(false)
  const [tabValue, setTabValue] = useState('0')
  const [optionOneValue, setOptionOneValue] = useState('')
  const [optionTwoValue, setOptionTwoValue] = useState('')
  const [optionThreeValue, setOptionThreeValue] = useState('')
  const [currentProductVariant, setCurrentProductVariant] = useState<ProductVariantType>()
  const [isSelectOption, setIsSelectOption] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [showStory, setShowStory] = useState(false)
  const [showAbout, setShowAbout] = useState(true)
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])

  const { uuid, isLogin } = useUserPresistStore(
    useShallow((state) => ({
      uuid: state.uuid,
      isLogin: state.isLogin,
    }))
  )

  const refreshProduct = async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.products.detail(id, isLogin),
    })
  }

  const { addToCart: addCartLine } = useCartPresistStore(
    useShallow((state) => ({
      addToCart: state.addToCart,
    }))
  )

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

  const productQuery = useQuery({
    queryKey: queryKeys.products.detail(id, isLogin),
    queryFn: () => fetchProductDetail(id, isLogin),
    enabled: routerReady && !!id,
  })

  const product = productQuery.data?.product
  const storyHtml = productQuery.data?.storyHtml || ''

  useEffect(() => {
    if (productQuery.isError) {
      showError((productQuery.error as Error)?.message || 'Network error. Please try again later.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productQuery.isError, productQuery.error])

  const currencyCode = CURRENCYS.find((c) => c.name === product?.currency)?.code ?? ''

  useEffect(() => {
    const initOptionValue = async () => {
      if (!product) return
      const one = optionOneValue
      const two = optionTwoValue
      const three = optionThreeValue
      let option = ''
      switch (product.options.length) {
        case 3:
          if (!one || !two || !three) return
          option = `${one},${two},${three}`
          break
        case 2:
          if (!one || !two) return
          option = `${one},${two}`
          break
        case 1:
          if (!one) return
          option = one
          break
        default:
          return
      }
      setIsSelectOption(true)
      try {
        const response: any = await axios.get(Http.product_variant_by_option, {
          params: { product_id: product.product_id, option },
        })
        if (response.result) {
          setCurrentProductVariant({
            ...response.data,
            inventory_policy: response.data.inventory_policy,
            taxable: response.data.taxable,
            is_virtual: response.data.is_virtual,
          })
        } else {
          setCurrentProductVariant(undefined)
          setQuantity(1)
        }
      } catch {
        showError('Network error. Please try again later.')
      }
    }

    initOptionValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionOneValue, optionTwoValue, optionThreeValue, product?.product_id])

  const buildOption = () => {
    if (!product) return null
    switch (product.options.length) {
      case 3:
        if (!optionOneValue || !optionTwoValue || !optionThreeValue) return null
        return `${optionOneValue},${optionTwoValue},${optionThreeValue}`
      case 2:
        if (!optionOneValue || !optionTwoValue) return null
        return `${optionOneValue},${optionTwoValue}`
      case 1:
        if (!optionOneValue) return null
        return optionOneValue
      default:
        return null
    }
  }

  const addToCart = () => {
    if (!product || !currentProductVariant) return
    const option = buildOption()
    if (option === null) return

    addCartLine(product.user_uuid, {
      productId: product.product_id,
      option,
      quantity,
      snapshotTitle: product.title,
      snapshotImage: String(currentProductVariant.image ?? ''),
      snapshotSlug: product.slug,
    })
  }

  const onClickAddToCart = () => {
    if (!product || !currentProductVariant) return showError('Please select a variant.')
    if (quantity <= 0) return showError('At least one quantity is required.')
    if (quantity > currentProductVariant.inventory_quantity)
      return showError('Not enough stock for the selected quantity.')
    if (uuid === product.user_uuid) return showError('Cannot buy your own products.')
    addToCart()
    showSuccess('Added to cart successfully')
  }

  const onClickBuyNow = () => {
    if (!product || !currentProductVariant) return showError('Please select a variant.')
    if (quantity <= 0) return showError('At least one quantity is required.')
    if (quantity > currentProductVariant.inventory_quantity)
      return showError('Not enough stock for the selected quantity.')
    if (uuid === product.user_uuid) return showError('Cannot buy your own products.')
    addToCart()
    window.location.href = `/checkout/${product.user_uuid}`
  }

  const onClickFavorite = async () => {
    if (!product?.product_id) return showError('Incorrect product id')
    try {
      const response: any = await axios.put(Http.collect, {
        collect_type: COLLECT_TYPE.PRODUCT,
        bind_id: product.product_id,
      })
      if (response.result) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.products.detail(id, isLogin),
        })
      } else {
        showError(response.message)
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const avgRating = product?.ratings?.length
    ? product.ratings
        .reduce((s, r) => s.plus(new Decimal(r.number ?? 0)), new Decimal(0))
        .dividedBy(product.ratings.length)
        .toFixed(1)
    : '0.0'

  const highlights = (
    product?.highlights?.length
      ? product.highlights.map((h) => h.title)
      : (product?.tags || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
  ).slice(0, 4)

  const init = async (_productId?: any) => {
    await refreshProduct()
  }

  return {
    product,
    loading: productQuery.isLoading,
    storyHtml,
    openRatingsDialog,
    setOpenRatingsDialog,
    openRefundPolicy,
    setOpenRefundPolicy,
    tabValue,
    setTabValue,
    optionOneValue,
    setOptionOneValue,
    optionTwoValue,
    setOptionTwoValue,
    optionThreeValue,
    setOptionThreeValue,
    currentProductVariant,
    isSelectOption,
    quantity,
    setQuantity,
    thumbsSwiper,
    setThumbsSwiper,
    showStory,
    setShowStory,
    showAbout,
    setShowAbout,
    aboutExpanded,
    setAboutExpanded,
    lightboxOpen,
    setLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    lightboxImages,
    setLightboxImages,
    uuid,
    isLogin,
    currencyCode,
    avgRating,
    highlights,
    onClickAddToCart,
    onClickBuyNow,
    onClickFavorite,
    init,
  }
}

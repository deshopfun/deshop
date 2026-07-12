import { useSnackPresistStore } from '@/lib'
import { FILE_TYPE } from '@/packages/constants'
import { CURRENCYS } from '@/packages/constants/currency'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductOptionType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ImagePlus, Trash2, Save, Package, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  product_id: number
  options?: ProductOptionType[]
  currency: string
}

const CurrencyInput = ({
  label,
  desc,
  value,
  onChange,
  placeholder,
  currencyCode,
}: {
  label: string
  desc?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  currencyCode: string
}) => (
  <div className="flex flex-col gap-1.5">
    <Label>{label}</Label>
    {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
        {currencyCode}
      </span>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  </div>
)

const SwitchRow = ({
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  label: string
  desc?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-dashed last:border-0">
    <div>
      <p className="text-sm font-medium">{label}</p>
      {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
)

const ProductVariant = (props: Props) => {
  const [currency, setCurrency] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [barcode, setBarcode] = useState('')
  const [compareAtPrice, setCompareAtPrice] = useState('')
  const [inventoryPolicy, setInventoryPolicy] = useState(false)
  const [isVirtual, setIsVirtual] = useState(true)
  const [inventoryQuantity, setInventoryQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [position, setPosition] = useState('')
  const [sku, setSku] = useState('')
  const [tax, setTax] = useState('')
  const [taxable, setTaxable] = useState(false)
  const [discounts, setDiscounts] = useState('')
  const [tip, setTip] = useState('')
  const [options, setOptions] = useState<ProductOptionType[]>([])
  const [optionOneValue, setOptionOneValue] = useState('')
  const [optionTwoValue, setOptionTwoValue] = useState('')
  const [optionThreeValue, setOptionThreeValue] = useState('')
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
  const currencyCode = CURRENCYS.find((c) => c.name === currency)?.code ?? ''

  useEffect(() => {
    if (props.options) {
      setOptions(props.options)
      setOptionOneValue(props.options[0]?.value.split(',')[0] || '')
      setOptionTwoValue(props.options[1]?.value.split(',')[0] || '')
      setOptionThreeValue(props.options[2]?.value.split(',')[0] || '')
      setCurrency(props.currency)
    }
  }, [props])

  const buildOption = () => {
    switch (options.length) {
      case 3:
        return optionOneValue && optionTwoValue && optionThreeValue
          ? `${optionOneValue},${optionTwoValue},${optionThreeValue}`
          : ''
      case 2:
        return optionOneValue && optionTwoValue ? `${optionOneValue},${optionTwoValue}` : ''
      case 1:
        return optionOneValue || ''
      default:
        return ''
    }
  }

  const resetForm = () => {
    setTitle('')
    setImage('')
    setBarcode('')
    setCompareAtPrice('')
    setInventoryPolicy(false)
    setIsVirtual(true)
    setInventoryQuantity('')
    setPrice('')
    setPosition('')
    setSku('')
    setTax('')
    setTaxable(false)
    setDiscounts('')
    setTip('')
  }

  const init = async (one: string, two: string, three: string) => {
    const option = (() => {
      switch (options.length) {
        case 3:
          return one && two && three ? `${one},${two},${three}` : ''
        case 2:
          return one && two ? `${one},${two}` : ''
        case 1:
          return one || ''
        default:
          return ''
      }
    })()
    if (!option) return
    try {
      const response: any = await axios.get(Http.product_variant, {
        params: { product_id: props.product_id, option },
      })
      if (response.result) {
        const d = response.data
        setTitle(d.title)
        setImage(d.image)
        setBarcode(d.barcode)
        setCompareAtPrice(d.compare_at_price)
        setInventoryPolicy(d.inventory_policy === 1)
        setIsVirtual(d.is_virtual === 1)
        setInventoryQuantity(d.inventory_quantity)
        setPrice(d.price)
        setPosition(d.position)
        setSku(d.sku)
        setTax(d.tax)
        setTaxable(d.taxable === 1)
        setDiscounts(d.discounts)
        setTip(d.tip)
      } else {
        resetForm()
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  useEffect(() => {
    init(optionOneValue, optionTwoValue, optionThreeValue)
  }, [optionOneValue, optionTwoValue, optionThreeValue])

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
        setImage(response.data.urls[0])
      } else {
        showError('Upload failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setUploading(false)
    }
  }

  const onClickUpdateProductVariant = async () => {
    if (!image) return showError('Please upload a variant image')
    if (!title) return showError('Incorrect title input')
    if (!position || parseInt(position) <= 0) return showError('Incorrect position input')
    if (!price || Number(price) <= 0) return showError('Incorrect price input')
    if (compareAtPrice && Number(compareAtPrice) < 0) return showError('Incorrect compare at price')
    if (compareAtPrice && Number(price) < Number(compareAtPrice))
      return showError('Price cannot be less than compare at price')
    if (tip && Number(tip) < 0) return showError('Incorrect tip input')
    if (discounts && Number(discounts) < 0) return showError('Incorrect discounts input')
    if (discounts && Number(discounts) > Number(price))
      return showError('Discounts cannot exceed price')
    if (!inventoryQuantity || parseInt(inventoryQuantity) < 0)
      return showError('Incorrect inventory quantity')
    if (taxable && (!tax || Number(tax) <= 0)) return showError('Incorrect tax input')

    const option = buildOption()
    if (!option) return showError('Incorrect option parameter')

    try {
      const response: any = await axios.post(Http.product_variant, {
        product_id: props.product_id,
        image,
        position: parseInt(position),
        title,
        price,
        compare_at_price: compareAtPrice,
        tip,
        discounts,
        barcode,
        inventory_quantity: parseInt(inventoryQuantity),
        sku,
        inventory_policy: inventoryPolicy ? 1 : 2,
        is_virtual: isVirtual ? 1 : 2,
        taxable: taxable ? 1 : 2,
        tax: taxable ? tax : undefined,
        option,
      })
      if (response.result) {
        await init(optionOneValue, optionTwoValue, optionThreeValue)
        showSuccess('Updated successfully')
      } else {
        showError(response.message)
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {options.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <SlidersHorizontal className="h-4 w-4 text-purple-500" />
              </div>
              <h3 className="font-semibold">Select Variant</h3>
            </div>

            {options.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Label className="text-sm">{item.name}</Label>
                <div className="flex flex-wrap gap-2">
                  {item.value.split(',').map((val, vi) => {
                    const isSelected =
                      (index === 0 && val === optionOneValue) ||
                      (index === 1 && val === optionTwoValue) ||
                      (index === 2 && val === optionThreeValue)
                    return (
                      <button
                        key={vi}
                        onClick={() => {
                          if (index === 0) setOptionOneValue(val)
                          else if (index === 1) setOptionTwoValue(val)
                          else setOptionThreeValue(val)
                        }}
                        className={cn(
                          'px-4 py-1.5 rounded-full text-sm border transition-all duration-150',
                          isSelected
                            ? 'bg-sky-500 text-white border-sky-500'
                            : 'border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500'
                        )}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <Package className="h-4 w-4 text-sky-500" />
              </div>
              <h3 className="font-semibold">Variant Details</h3>
            </div>
            <Button
              className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
              onClick={onClickUpdateProductVariant}
            >
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>
                Variant Image <span className="text-red-500">*</span>
              </Label>
              {image && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:bg-red-50 gap-1"
                  onClick={() => setImage('')}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </Button>
              )}
            </div>
            {image ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border">
                <img src={image} alt="variant" className="w-full h-full object-cover" />
              </div>
            ) : (
              <label
                className={cn(
                  'flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
                  uploading
                    ? 'border-sky-300 bg-sky-50'
                    : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
                )}
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ImagePlus className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  {uploading ? 'Uploading...' : 'Click to upload image'}
                </p>
                <input
                  type="file"
                  className="sr-only"
                  onChange={(e: any) => uploadFile(e.target.files)}
                />
              </label>
            )}
          </div>

          <div className="border-t border-dashed" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Variant title"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>
                Position <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Display order"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>SKU</Label>
              <Input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Stock keeping unit"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Barcode</Label>
              <Input
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="UPC, ISBN, etc."
              />
            </div>
          </div>

          <div className="border-t border-dashed" />

          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Pricing
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <CurrencyInput
              label="Price *"
              value={price}
              onChange={setPrice}
              placeholder="0.00"
              currencyCode={currencyCode}
            />
            <CurrencyInput
              label="Compare at Price"
              desc="Original price before sale"
              value={compareAtPrice}
              onChange={setCompareAtPrice}
              placeholder="0.00"
              currencyCode={currencyCode}
            />
            <CurrencyInput
              label="Tip"
              value={tip}
              onChange={setTip}
              placeholder="0.00"
              currencyCode={currencyCode}
            />
            <CurrencyInput
              label="Discounts"
              value={discounts}
              onChange={setDiscounts}
              placeholder="0.00"
              currencyCode={currencyCode}
            />
          </div>

          <div className="border-t border-dashed" />

          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Inventory
          </h4>
          <div className="flex flex-col gap-1.5">
            <Label>
              Inventory Quantity <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              value={inventoryQuantity}
              onChange={(e) => setInventoryQuantity(e.target.value)}
              placeholder="Available stock"
            />
          </div>

          <div className="border-t border-dashed" />

          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Settings
          </h4>
          <div className="flex flex-col">
            <SwitchRow
              label="Virtual"
              desc="Whether it is a virtual product"
              checked={isVirtual}
              onCheckedChange={setIsVirtual}
            />
            <SwitchRow
              label="Taxable"
              desc="Charge tax when this variant is sold"
              checked={taxable}
              onCheckedChange={setTaxable}
            />
            {taxable && (
              <div className="py-3">
                <CurrencyInput
                  label="Tax Amount"
                  value={tax}
                  onChange={setTax}
                  placeholder="0.00"
                  currencyCode={currencyCode}
                />
              </div>
            )}
            <SwitchRow
              label="Allow Overselling"
              desc="Let buyers order even when out of stock"
              checked={inventoryPolicy}
              onCheckedChange={setInventoryPolicy}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductVariant

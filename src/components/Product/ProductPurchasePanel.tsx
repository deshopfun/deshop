import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProductOptionType, ProductVariantType } from '@/utils/types'
import { Minus, PackageX, Plus, ShoppingCart, Zap } from 'lucide-react'

type Props = {
  options?: ProductOptionType[]
  optionOneValue: string
  optionTwoValue: string
  optionThreeValue: string
  setOptionOneValue: (v: string) => void
  setOptionTwoValue: (v: string) => void
  setOptionThreeValue: (v: string) => void
  productStatus?: string
  isSelectOption: boolean
  canBuy: boolean
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  currentProductVariant?: ProductVariantType
  onAddToCart: () => void
  onBuyNow: () => void
}

export default function ProductPurchasePanel({
  options,
  optionOneValue,
  optionTwoValue,
  optionThreeValue,
  setOptionOneValue,
  setOptionTwoValue,
  setOptionThreeValue,
  productStatus,
  isSelectOption,
  canBuy,
  quantity,
  setQuantity,
  currentProductVariant,
  onAddToCart,
  onBuyNow,
}: Props) {
  return (
    <>
      {options?.map((item, index) => (
        <div key={index} className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
            <span className="text-xs text-muted-foreground">
              {index === 0
                ? optionOneValue
                : index === 1
                  ? optionTwoValue
                  : optionThreeValue || 'Select'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.value.split(',').map((val, vi) => {
              const isSelected =
                (index === 0 && val === optionOneValue) ||
                (index === 1 && val === optionTwoValue) ||
                (index === 2 && val === optionThreeValue)
              return (
                <button
                  key={vi}
                  type="button"
                  onClick={() => {
                    if (index === 0) setOptionOneValue(val)
                    else if (index === 1) setOptionTwoValue(val)
                    else setOptionThreeValue(val)
                  }}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150',
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-200'
                      : 'border-gray-200 text-gray-700 hover:border-sky-300 hover:bg-sky-50'
                  )}
                >
                  {val}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {productStatus === 'active' &&
        isSelectOption &&
        (canBuy ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  value={quantity > 0 ? quantity : ''}
                  className="w-12 h-10 text-center text-sm font-semibold bg-transparent outline-none border-x border-gray-200"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '')
                    if (raw === '') {
                      setQuantity(0)
                      return
                    }
                    setQuantity(
                      Math.min(currentProductVariant!.inventory_quantity, Number(raw))
                    )
                  }}
                  onBlur={() => {
                    setQuantity((q) => {
                      if (!q || q < 1) return 1
                      return Math.min(currentProductVariant!.inventory_quantity, q)
                    })
                  }}
                />
                <button
                  type="button"
                  className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
                  disabled={quantity >= currentProductVariant!.inventory_quantity}
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(currentProductVariant!.inventory_quantity, q + 1)
                    )
                  }
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                className="text-xs text-sky-600 hover:underline font-medium"
                onClick={() => setQuantity(1)}
              >
                Min
              </button>
              <button
                type="button"
                className="text-xs text-sky-600 hover:underline font-medium"
                onClick={() => setQuantity(currentProductVariant!.inventory_quantity)}
              >
                Max ({currentProductVariant!.inventory_quantity})
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Button
                className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2 rounded-xl shadow-sm shadow-sky-200"
                onClick={onAddToCart}
              >
                <ShoppingCart className="h-4 w-4" /> Add to cart
              </Button>
              <Button
                className="h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold gap-2 rounded-xl"
                onClick={onBuyNow}
              >
                <Zap className="h-4 w-4" /> Buy now
              </Button>
            </div>
          </div>
        ) : (
          isSelectOption && (
            <div className="flex items-center gap-3 px-4 py-3.5 bg-red-50 text-red-600 rounded-xl">
              <PackageX className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">Sorry, this product is sold out.</p>
            </div>
          )
        ))}

      {!isSelectOption && (options?.length ?? 0) > 0 && (
        <p className="text-sm text-muted-foreground">Select options to see price and buy.</p>
      )}
    </>
  )
}

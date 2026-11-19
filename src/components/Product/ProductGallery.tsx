import { useState } from 'react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { ZoomIn } from 'lucide-react'
import RemoteImage from '@/components/Image/RemoteImage'
import { GetAbosolutePathByRelative } from '@/utils/image'
import type { ProductImageType, ProductVariantType } from '@/utils/types'

type Props = {
  title: string
  images?: ProductImageType[]
  isSelectOption: boolean
  currentProductVariant?: ProductVariantType
  onOpenLightbox: (images: string[], index?: number) => void
}

const ProductGallery = ({
  title,
  images,
  isSelectOption,
  currentProductVariant,
  onOpenLightbox,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  if (isSelectOption && currentProductVariant?.image) {
    const src = GetAbosolutePathByRelative(currentProductVariant.image)
    return (
      <div className="flex justify-center items-center p-6 min-h-[320px] sm:min-h-[420px]">
        <button
          type="button"
          className="relative max-h-[380px] w-full max-w-md cursor-zoom-in"
          onClick={() => onOpenLightbox([src])}
        >
          <RemoteImage
            src={src}
            alt="variant"
            width={640}
            height={640}
            className="max-h-[380px] w-auto object-contain rounded-xl mx-auto"
          />
        </button>
      </div>
    )
  }

  return (
    <>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="min-h-[320px] sm:min-h-[420px]"
      >
        {images?.map((item, i) => {
          const src = GetAbosolutePathByRelative(item.src)
          return (
            <SwiperSlide key={i}>
              <div className="group relative flex justify-center items-center p-6 min-h-[320px] sm:min-h-[420px]">
                <button
                  type="button"
                  className="relative max-h-[380px] w-full max-w-md cursor-zoom-in"
                  onClick={() =>
                    onOpenLightbox(
                      (images ?? []).map((img) => GetAbosolutePathByRelative(img.src)),
                      i
                    )
                  }
                >
                  <RemoteImage
                    src={src}
                    alt={`${title} ${i + 1}`}
                    width={640}
                    height={640}
                    className="max-h-[380px] w-auto object-contain rounded-xl mx-auto"
                  />
                </button>
                <span className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {images && images.length > 1 && (
        <div className="px-3 pb-3">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={5}
            watchSlidesProgress
            modules={[Thumbs]}
            className="thumbs-swiper"
          >
            {images.map((item, i) => (
              <SwiperSlide key={i} className="cursor-pointer">
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-sky-400 transition-colors bg-white">
                  <RemoteImage
                    src={GetAbosolutePathByRelative(item.src)}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  )
}

export default ProductGallery

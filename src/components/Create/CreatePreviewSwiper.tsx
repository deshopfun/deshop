import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { GetAbosolutePathByRelative } from '@/utils/image'
import RemoteImage from '@/components/Image/RemoteImage'

export default function CreatePreviewSwiper({ imageList }: { imageList: string[] }) {
  return (
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
      className="min-h-72"
    >
      {imageList.map((item, i) => (
        <SwiperSlide key={`${item}-${i}`}>
          <div className="flex justify-center items-center p-8 bg-gray-50 min-h-72">
            <RemoteImage
              src={GetAbosolutePathByRelative(item)}
              alt="product"
              width={512}
              height={256}
              className="max-h-64 w-auto object-contain rounded-xl"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

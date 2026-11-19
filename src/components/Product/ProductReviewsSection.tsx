import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { RatingType } from '@/utils/types'
import { Star } from 'lucide-react'
import { RatingBar } from './ProductDetailParts'

type Props = {
  ratings: RatingType[]
  avgRating: string | number
  onViewAll: () => void
}

export default function ProductReviewsSection({ ratings, avgRating, onViewAll }: Props) {
  if (!ratings.length) return null

  return (
    <section
      id="reviews"
      className="scroll-mt-32 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Ratings & Reviews</h2>
        <Button variant="outline" size="sm" className="rounded-xl" onClick={onViewAll}>
          View all
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 mb-6">
        <div className="flex flex-col items-center sm:items-start shrink-0">
          <span className="text-5xl font-bold text-gray-900 leading-none">{avgRating}</span>
          <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  'h-4 w-4',
                  s <= Math.round(Number(avgRating))
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-200 fill-gray-200'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground mt-1">{ratings.length} reviews</span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5 max-w-md">
          {[5, 4, 3, 2, 1].map((s) => (
            <RatingBar key={s} star={s} ratings={ratings} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ratings.slice(0, 4).map((item, i) => (
          <div
            key={`${item.username}-${i}`}
            className="flex flex-col gap-1.5 p-4 rounded-xl bg-gray-50 border border-gray-100"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-gray-800 truncate">{item.username}</span>
              <div className="flex shrink-0">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      'h-3 w-3',
                      s <= item.number
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200 fill-gray-200'
                    )}
                  />
                ))}
              </div>
            </div>
            {item.body && (
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{item.body}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

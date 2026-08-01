import { RATING_TYPE, SORT_BY_TYPE } from '@/packages/constants'
import { useEffect, useState } from 'react'
import { Http } from '@/utils/http/http'
import axios from '@/utils/http/axios'
import { useSnackPresistStore } from '@/lib'
import { RatingType } from '@/utils/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star, Search, MessageSquare, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Decimal from 'decimal.js'
import { GetAbosolutePathByRelative } from '@/utils/image'

type DialogType = {
  product_id: number
  ratings: RatingType[]
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

const StarRow = ({
  value,
  max = 5,
  size = 'sm',
}: {
  value: number
  max?: number
  size?: 'sm' | 'md'
}) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
          i < Math.round(value) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'
        )}
      />
    ))}
  </div>
)

const RatingBar = ({
  star,
  ratings,
  active,
  onClick,
}: {
  star: number
  ratings: RatingType[]
  active?: boolean
  onClick?: () => void
}) => {
  const count = ratings.filter((r) => r.number === star).length
  const percent = ratings.length > 0 ? Math.round((count / ratings.length) * 100) : 0

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 w-full rounded-lg px-1.5 py-1 transition-colors',
        active ? 'bg-amber-50' : 'hover:bg-gray-100'
      )}
    >
      <div className="flex items-center gap-1 shrink-0 w-10">
        <span className="text-xs font-medium text-gray-700">{star}</span>
        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
      </div>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-6 text-right tabular-nums">{count}</span>
    </button>
  )
}

export default function ProductRatingsDialog({
  product_id,
  ratings: propsRatings,
  openDialog,
  setOpenDialog,
}: DialogType) {
  const [ratings, setRatings] = useState<RatingType[]>([])
  const [reviewSearch, setReviewSearch] = useState('')
  const [selectSortBy, setSelectSortBy] = useState('')
  const [selectRating, setSelectRating] = useState('')

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const avgRating = propsRatings?.length
    ? propsRatings
        .reduce((s, r) => s.plus(new Decimal(r.number || 0)), new Decimal(0))
        .dividedBy(propsRatings.length)
        .toFixed(1)
    : '0.0'

  const init = async (id: number, sortBy: string, ratingFilter: string) => {
    if (!id) return
    try {
      const ratingVal = !isNaN(parseInt(ratingFilter)) ? parseInt(ratingFilter) : 0
      const response: any = await axios.get(Http.product_rating_by_id, {
        params: { product_id: id, sort_by: sortBy || undefined, rating_number: ratingVal },
      })
      setRatings(response.result ? response.data || [] : [])
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Network error. Please try again later.')
      setSnackOpen(true)
    }
  }

  const filteredRatings = ratings.filter(
    (r) =>
      !reviewSearch ||
      r.body?.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      r.username?.toLowerCase().includes(reviewSearch.toLowerCase())
  )

  useEffect(() => {
    if (product_id) init(product_id, selectSortBy, selectRating)
  }, [product_id, selectSortBy, selectRating])

  const handleStarFilter = (star: number) => {
    const val = String(star)
    setSelectRating(selectRating === val ? '' : val)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl shadow-xl">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b shrink-0 bg-white">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Ratings & Reviews
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Summary */}
          <div className="px-6 py-6 bg-gradient-to-b from-gray-50 to-white border-b">
            <div className="flex items-center gap-6 sm:gap-10">
              {/* Big score */}
              <div className="flex flex-col items-center gap-1.5 shrink-0 min-w-[88px]">
                <span className="text-5xl font-bold tracking-tight text-gray-900 leading-none">
                  {avgRating}
                </span>
                <StarRow value={Number(avgRating)} size="md" />
                <span className="text-xs text-muted-foreground mt-1">
                  {propsRatings?.length || 0} review{(propsRatings?.length || 0) !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Distribution bars */}
              <div className="flex-1 flex flex-col gap-0.5">
                {[5, 4, 3, 2, 1].map((s) => (
                  <RatingBar
                    key={s}
                    star={s}
                    ratings={propsRatings || []}
                    active={selectRating === String(s)}
                    onClick={() => handleStarFilter(s)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-3.5 border-b bg-white sticky top-0 z-10">
            {/* Row 1: Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search reviews..."
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                className="pl-9 pr-9 h-9 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-muted-foreground focus-visible:ring-sky-500"
              />
              {reviewSearch && (
                <button
                  type="button"
                  onClick={() => setReviewSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Row 2: Sort + Rating */}
            <div className="flex gap-2 mt-2.5">
              <Select value={selectSortBy} onValueChange={setSelectSortBy}>
                <SelectTrigger className="h-9 flex-1 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SORT_BY_TYPE).map(([k, v]) => (
                    <SelectItem key={k} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectRating} onValueChange={setSelectRating}>
                <SelectTrigger className="h-9 flex-1 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="All stars" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stars</SelectItem>
                  {Object.entries(RATING_TYPE).map(([k, v]) => (
                    <SelectItem key={k} value={v}>
                      {v} Stars
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Review list */}
          <div className="px-6 py-5">
            <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              {filteredRatings.length} result{filteredRatings.length !== 1 ? 's' : ''}
            </p>

            {filteredRatings.length > 0 ? (
              <div className="flex flex-col gap-1">
                {filteredRatings.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-100 bg-white p-4 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    {/* User row */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-gray-100">
                          <AvatarFallback className="text-sm bg-sky-50 text-sky-600 font-semibold">
                            {item.username?.[0]?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-gray-900 truncate">
                            {item.username || 'Anonymous'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.create_time).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      <StarRow value={item.number} />
                    </div>

                    {/* Option tags */}
                    {item.product_option && (
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {item.product_option.split(',').map((opt, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-[11px] font-normal bg-gray-100 text-gray-600 hover:bg-gray-100"
                          >
                            {opt.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Image */}
                    {item.image && (
                      <img
                        src={GetAbosolutePathByRelative(item.image)}
                        alt="review"
                        className="mb-2.5 h-20 w-20 object-cover rounded-lg border border-gray-100"
                        loading="lazy"
                      />
                    )}

                    {/* Body */}
                    {item.body && (
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                <div className="h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <MessageSquare className="h-7 w-7 text-gray-300" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">No reviews found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
                {(reviewSearch || selectRating) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1"
                    onClick={() => {
                      setReviewSearch('')
                      setSelectRating('')
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t bg-white shrink-0">
          <Button
            variant="outline"
            className="w-full h-10 rounded-xl"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

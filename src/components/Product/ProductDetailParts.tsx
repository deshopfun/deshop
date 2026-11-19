import type { RatingType } from '@/utils/types'

export const NAV_STICKY_TOP = 70

export const RatingBar = ({ star, ratings }: { star: number; ratings: RatingType[] }) => {
  const count = ratings.filter((r) => r.number === star).length
  const percent = ratings.length > 0 ? (count / ratings.length) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-3 tabular-nums">{star}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-5 text-right tabular-nums">{count}</span>
    </div>
  )
}

export const PriceRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
)

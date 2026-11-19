import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type StatusConfig = { label: string; className: string }

type Props = {
  productStatus?: string
  currentStatus: StatusConfig
  saving: boolean
  onUpdateStatus: (status: string) => void
}

export default function ProductStatusControls({
  productStatus,
  currentStatus,
  saving,
  onUpdateStatus,
}: Props) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Status</span>
        <span
          className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-full border',
            currentStatus.className
          )}
        >
          {currentStatus.label}
        </span>
      </div>
      <div className="flex gap-2">
        {productStatus !== 'active' && (
          <Button
            size="sm"
            className="h-8 bg-green-500 hover:bg-green-600 text-white text-xs"
            onClick={() => onUpdateStatus('active')}
            disabled={saving}
          >
            Active
          </Button>
        )}
        {productStatus !== 'archived' && (
          <Button
            size="sm"
            className="h-8 bg-blue-500 hover:bg-blue-600 text-white text-xs"
            onClick={() => onUpdateStatus('archived')}
            disabled={saving}
          >
            Archived
          </Button>
        )}
        {productStatus !== 'draft' && (
          <Button
            size="sm"
            className="h-8 bg-amber-500 hover:bg-amber-600 text-white text-xs"
            onClick={() => onUpdateStatus('draft')}
            disabled={saving}
          >
            Draft
          </Button>
        )}
      </div>
    </div>
  )
}

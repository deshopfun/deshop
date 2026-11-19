import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Plus, Save, Trash2 } from 'lucide-react'

export const LIMIT = { options: 3, highlights: 4, specs: 12, faqs: 8 }
export const MAX_SIZE = 3 * 1024 * 1024
export const PLAN_MAX_SIZE = 1 * 1024 * 1024
export const ACCEPT_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

export const newOption = () => ({ name: '', value: '' })
export const newHighlight = () => ({ title: '', description: '' })
export const newSpec = () => ({ label: '', value: '' })
export const newFaq = () => ({ question: '', answer: '' })

export const contentKey = (v: unknown) => JSON.stringify(v ?? null)

export const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  archived: { label: 'Archived', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  draft: { label: 'Draft', className: 'bg-amber-100 text-amber-700 border-amber-200' },
}

const TONES = {
  purple: { bg: 'bg-purple-50', text: 'text-purple-500' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-500' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-500' },
} as const

export const SectionCard = ({
  icon: Icon,
  tone,
  title,
  description,
  count,
  max,
  canAdd,
  onAdd,
  addLabel,
  onSave,
  saving,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  tone: keyof typeof TONES
  title: string
  description?: string
  count?: number
  max?: number
  canAdd?: boolean
  onAdd?: () => void
  addLabel?: string
  onSave?: () => void
  saving?: boolean
  children: ReactNode
}) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={cn(
              'h-8 w-8 shrink-0 rounded-lg flex items-center justify-center',
              TONES[tone].bg
            )}
          >
            <Icon className={cn('h-4 w-4', TONES[tone].text)} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold">{title}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onAdd && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAdd}
              disabled={!canAdd}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              {addLabel}
              {max !== undefined && count !== undefined && (
                <span className="text-xs text-muted-foreground tabular-nums">
                  {count}/{max}
                </span>
              )}
            </Button>
          )}
          {onSave && (
            <Button
              type="button"
              className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
              onClick={onSave}
              disabled={saving}
            >
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
            </Button>
          )}
        </div>
      </div>
      {children}
    </CardContent>
  </Card>
)

export const ListRow = ({
  index,
  canRemove,
  onRemove,
  children,
}: {
  index: number
  canRemove: boolean
  onRemove: () => void
  children: ReactNode
}) => (
  <div>
    {index > 0 && <div className="border-t border-dashed mb-4" />}
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">{children}</div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Remove"
        disabled={!canRemove}
        className="mt-6 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0 disabled:opacity-30"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
)

export const Field = ({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) => (
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs text-muted-foreground">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
  </div>
)

export const EmptyHint = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-muted-foreground py-1">{children}</p>
)

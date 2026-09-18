import { Switch } from '@/components/ui/switch'

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

export default SwitchRow

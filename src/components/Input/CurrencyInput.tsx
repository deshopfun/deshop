import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

export default CurrencyInput

import { Input } from '@/components/ui/input'
import { Layers } from 'lucide-react'
import { Field, LIMIT, ListRow, SectionCard } from './ProductFormParts'

type OptionItem = { name: string; value: string }

type Props = {
  items: OptionItem[]
  canAdd: boolean
  canRemove: boolean
  saving: boolean
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, key: keyof OptionItem, value: string) => void
  onSave: () => void
}

export default function ProductOptionsCard({
  items,
  canAdd,
  canRemove,
  saving,
  onAdd,
  onRemove,
  onUpdate,
  onSave,
}: Props) {
  return (
    <SectionCard
      icon={Layers}
      tone="purple"
      title="Product Options"
      description="Add up to 3 options like Color, Size, Material"
      count={items.length}
      max={LIMIT.options}
      canAdd={canAdd}
      onAdd={onAdd}
      addLabel="Add Option"
      onSave={onSave}
      saving={saving}
    >
      <div className="flex flex-col gap-4">
        {items.map((opt, index) => (
          <ListRow key={index} index={index} canRemove={canRemove} onRemove={() => onRemove(index)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label={`Option ${index + 1} Name`} required={index === 0}>
                <Input
                  value={opt.name}
                  onChange={(e) => onUpdate(index, 'name', e.target.value)}
                  placeholder={`e.g. ${['Color', 'Size', 'Material'][index] || 'Option'}`}
                />
              </Field>
              <Field label="Values (comma separated)" required={index === 0}>
                <Input
                  value={opt.value}
                  onChange={(e) => onUpdate(index, 'value', e.target.value)}
                  placeholder="e.g. Red,Blue,Green"
                />
              </Field>
            </div>
          </ListRow>
        ))}
      </div>
    </SectionCard>
  )
}

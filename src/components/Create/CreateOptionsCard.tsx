import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'

type OptionRow = { name: string; value: string }

type Props = {
  options: OptionRow[]
  onAdd: () => void
  onRemove: (index: number) => void
  onUpdate: (index: number, field: 'name' | 'value', value: string) => void
}

export default function CreateOptionsCard({ options, onAdd, onRemove, onUpdate }: Props) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-base">Product Options</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add up to 3 options like Color, Size, Material
            </p>
          </div>
          {options.length < 3 && (
            <Button type="button" variant="outline" size="sm" onClick={onAdd} className="gap-1">
              <Plus className="h-4 w-4" />
              Add Option
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {options.map((opt, index) => (
            <div key={index} className="relative">
              {index > 0 && <div className="border-t border-dashed mb-4" />}
              <div className="flex items-start gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Option {index + 1} Name{' '}
                      {index === 0 && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      value={opt.name}
                      onChange={(e) => onUpdate(index, 'name', e.target.value)}
                      placeholder={`e.g. ${['Color', 'Size', 'Material'][index] || 'Option'}`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Values (comma separated){' '}
                      {index === 0 && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      value={opt.value}
                      onChange={(e) => onUpdate(index, 'value', e.target.value)}
                      placeholder="e.g. Red,Blue,Green"
                    />
                  </div>
                </div>

                {options.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                    onClick={() => onRemove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

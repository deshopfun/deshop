import { Button } from '@/components/ui/button'
import RemoteImage from '@/components/Image/RemoteImage'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { cn } from '@/lib/utils'
import { ImagePlus, Plus, Trash2, X } from 'lucide-react'
import { ACCEPT_TYPES } from './ProductFormParts'

type Props = {
  imageList: string[]
  uploading: boolean
  onUpload: (files: FileList | null) => void
  onRemove: (index: number) => void
  onClear: () => void
}

export default function ProductImageGrid({
  imageList,
  uploading,
  onUpload,
  onRemove,
  onClear,
}: Props) {
  return (
    <>
      {imageList.length > 0 && (
        <div className="flex justify-end -mt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5"
            onClick={onClear}
          >
            <Trash2 className="h-4 w-4" /> Clear all
          </Button>
        </div>
      )}

      {imageList.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {imageList.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="group relative aspect-square rounded-xl overflow-hidden border"
            >
              <RemoteImage
                src={GetAbosolutePathByRelative(src)}
                alt="product"
                fill
                sizes="200px"
                className="object-cover"
              />
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => onRemove(i)}
                className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500 transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <label
            className={cn(
              'aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors',
              uploading
                ? 'border-sky-300 bg-sky-50 pointer-events-none'
                : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
            )}
          >
            <Plus className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">
              {uploading ? 'Uploading...' : 'Add more'}
            </span>
            <input
              type="file"
              className="sr-only"
              multiple
              accept={ACCEPT_TYPES.join(',')}
              onChange={(e) => {
                onUpload(e.target.files)
                e.target.value = ''
              }}
            />
          </label>
        </div>
      ) : (
        <label
          className={cn(
            'flex flex-col items-center justify-center gap-3 py-12 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
            uploading
              ? 'border-sky-300 bg-sky-50 pointer-events-none'
              : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
          )}
        >
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <ImagePlus className="h-6 w-6 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Support multiple files</p>
          </div>
          <input
            type="file"
            className="sr-only"
            multiple
            accept={ACCEPT_TYPES.join(',')}
            onChange={(e) => {
              onUpload(e.target.files)
              e.target.value = ''
            }}
          />
        </label>
      )}
    </>
  )
}

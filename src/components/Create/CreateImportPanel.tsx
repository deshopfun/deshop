import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Upload, ChevronDown, ChevronUp } from 'lucide-react'

type Props = {
  showImport: boolean
  onToggle: () => void
  importText: string
  onImportTextChange: (value: string) => void
  parsing: boolean
  onParse: () => void
  onImportFile: (files: FileList | null) => void
  onClear: () => void
}

export default function CreateImportPanel({
  showImport,
  onToggle,
  importText,
  onImportTextChange,
  parsing,
  onParse,
  onImportFile,
  onClear,
}: Props) {
  return (
    <Card className="border-sky-100 bg-sky-50/30">
      <CardContent className="p-0">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-sky-50/50 transition-colors rounded-xl"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-sky-500" />
            <div>
              <h2 className="font-semibold text-base">Import from Text / File</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Paste text or upload a .txt / .md / .json file to auto-fill the form
              </p>
            </div>
          </div>
          {showImport ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
          )}
        </button>

        {showImport && (
          <div className="px-5 pb-5 flex flex-col gap-4 border-t border-sky-100/60 pt-4">
            <Textarea
              value={importText}
              onChange={(e) => onImportTextChange(e.target.value)}
              placeholder={`Supported formats:

1. Key-value text:
Title: My Product
Slug: my-product
Type: OPENSOURCE
Tags: ai,tool
Description: xxxxxx
Promote: true
Multi-line description...

Option1: Color
Values1: Red,Blue,Green

2. JSON is also supported`}
              className="min-h-40 font-mono text-sm"
            />

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={onParse}
                disabled={parsing || !importText.trim()}
                className="bg-sky-500 hover:bg-sky-600 text-white gap-2"
              >
                <FileText className="h-4 w-4" />
                {parsing ? 'Parsing...' : 'Parse & Fill Form'}
              </Button>

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent cursor-pointer text-sm">
                <Upload className="h-4 w-4" />
                Upload File
                <input
                  type="file"
                  accept=".txt,.md,.json,text/plain,application/json"
                  className="sr-only"
                  onChange={(e) => onImportFile(e.target.files)}
                />
              </label>

              {importText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  className="text-muted-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  html: string
  showAbout: boolean
  setShowAbout: (v: boolean | ((prev: boolean) => boolean)) => void
  aboutExpanded: boolean
  setAboutExpanded: (v: boolean | ((prev: boolean) => boolean)) => void
}

export default function ProductAboutSection({
  html,
  showAbout,
  setShowAbout,
  aboutExpanded,
  setAboutExpanded,
}: Props) {
  if (!html) return null

  return (
    <section
      id="overview"
      className="scroll-mt-32 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm"
    >
      <button
        type="button"
        aria-expanded={showAbout}
        onClick={() => setShowAbout((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left group"
      >
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors">
          About this product
        </h2>
        <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-sky-600">
          {showAbout ? 'Hide' : 'Show'}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-200', showAbout && 'rotate-180')}
          />
        </span>
      </button>

      {showAbout && (
        <div className="mt-4">
          <div
            className={cn(
              'relative',
              !aboutExpanded && html.length > 800 ? 'max-h-64 overflow-hidden' : ''
            )}
          >
            <div
              className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-a:text-sky-600"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {!aboutExpanded && html.length > 800 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          {html.length > 800 && (
            <button
              type="button"
              onClick={() => setAboutExpanded((v) => !v)}
              className="mt-3 flex items-center gap-1 text-xs font-medium text-sky-600 hover:underline"
            >
              {aboutExpanded ? 'Show less' : 'Show more'}
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  aboutExpanded && 'rotate-180'
                )}
              />
            </button>
          )}
        </div>
      )}
    </section>
  )
}

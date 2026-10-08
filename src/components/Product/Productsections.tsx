import { ReactNode, useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { ProductFaqType, ProductHighlightType, ProductSpecType } from '@/utils/types'

const Shell = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section
    id={id}
    className="scroll-mt-32 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm"
  >
    <h2 className="text-lg font-bold text-gray-900 mb-5">{title}</h2>
    {children}
  </section>
)

export const SectionNav = ({
  items,
  stickyTop = 0,
}: {
  items: { id: string; label: string }[]
  stickyTop?: number // 如果全局 Header 是固定的，传入 Header 高度（px）
}) => {
  const [active, setActive] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  return (
    <nav
      style={{ top: stickyTop }}
      className="sticky z-30 -mx-4 px-4 py-2 bg-white/85 backdrop-blur border-b border-gray-100"
    >
      <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() =>
              document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            className={cn(
              'shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors',
              active === it.id ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export const HighlightsSection = ({ items }: { items: ProductHighlightType[] }) => (
  <Shell id="highlights" title="Highlights">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((h, i) => (
        <div key={i} className="flex gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4">
          <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
            <Check className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">{h.title}</p>
            {h.description && (
              <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{h.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </Shell>
)

export const PlansSection = ({
  image,
  caption,
  website,
  onOpen,
}: {
  image: string
  caption?: string
  website?: string
  onOpen: (src: string) => void
}) => {
  const src = GetAbosolutePathByRelative(image)
  return (
    <Shell id="plans" title="Plans & Pricing">
      <button
        type="button"
        onClick={() => onOpen(src)}
        className="group relative block w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50 cursor-zoom-in"
      >
        <img src={src} alt="Plans and pricing" className="w-full h-auto object-contain" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 text-white text-xs px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-3.5 w-3.5" /> Click to enlarge
        </span>
      </button>
      {caption && <p className="text-xs text-muted-foreground text-center mt-3">{caption}</p>}
      {website && (
        <button
          type="button"
          onClick={() => (window.location.href = website)}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-left transition-colors border border-gray-100 bg-gray-50 bg-sky-500 hover:bg-sky-600 text-white"
        >
          Go to Buy Now
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </Shell>
  )
}

export const SpecsSection = ({ items }: { items: ProductSpecType[] }) => (
  <Shell id="specs" title="Specifications">
    <dl className="rounded-xl border border-gray-100 overflow-hidden text-sm">
      {items.map((s, i) => (
        <div
          key={i}
          className={cn(
            'grid grid-cols-3 sm:grid-cols-4 gap-4 px-4 py-3',
            i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
          )}
        >
          <dt className="col-span-1 font-medium text-gray-500">{s.label}</dt>
          <dd className="col-span-2 sm:col-span-3 text-gray-900 break-words">{s.value}</dd>
        </div>
      ))}
    </dl>
  </Shell>
)

export const FaqSection = ({ items }: { items: ProductFaqType[] }) => {
  const [open, setOpen] = useState<number | null>(0)

  // SEO：FAQPage 结构化数据（转义 < 防止 </script> 注入）
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }).replace(/</g, '\\u003c')

  return (
    <Shell id="faq" title="Frequently asked questions">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
        {items.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={i}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900">{f.question}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200',
                    isOpen && 'rotate-180 text-sky-500'
                  )}
                />
              </button>
              {isOpen && (
                <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {f.answer}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </Shell>
  )
}

import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { LOCALES } from '@/packages/constants'
import { useUserPresistStore } from '@/lib'

const LanguageSwitcher = () => {
  const { getUserLanguage, setUserLanguage } = useUserPresistStore((state) => state)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = getUserLanguage() ?? router.locale ?? 'en'

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const changeLocale = (code: string) => {
    setUserLanguage(code)
    setOpen(false)
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
      locale: code,
    })
  }

  const currentLocale = LOCALES.find((l) => l.code === current)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-textPrimary hover:opacity-80 transition-opacity"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {currentLocale ? (
          <currentLocale.flag
            className="w-4 h-4 rounded-sm object-cover"
            title={currentLocale.label}
          />
        ) : (
          <Globe size={16} />
        )}
        <span>{currentLocale?.label ?? current}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute bottom-full mb-2 right-0 min-w-[150px] rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden z-10"
        >
          {LOCALES.map((locale) => (
            <li key={locale.code}>
              <button
                type="button"
                onClick={() => changeLocale(locale.code)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <locale.flag className="w-4 h-4 rounded-sm object-cover" title={locale.label} />
                  {locale.label}
                </span>
                {locale.code === current && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher

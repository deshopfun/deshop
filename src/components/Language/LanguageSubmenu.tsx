import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/router'
import { Globe, Check } from 'lucide-react'
import { LOCALES } from '@/packages/constants'
import { useUserPresistStore } from '@/lib'

const LanguageSubmenu = () => {
  const { getUserLanguage, setUserLanguage } = useUserPresistStore((state) => state)
  const router = useRouter()
  const current = getUserLanguage() ?? router.locale ?? 'en'
  const currentLocale = LOCALES.find((l) => l.code === current)

  const changeLocale = (code: string) => {
    setUserLanguage(code)
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
      locale: code,
    })
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center gap-2">
        {currentLocale ? (
          <currentLocale.flag className="w-4 h-4 rounded-sm" />
        ) : (
          <Globe size={16} />
        )}
        <span>{currentLocale?.label ?? 'Language'}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="max-h-72 overflow-y-auto">
          {LOCALES.map((locale) => (
            <DropdownMenuItem
              key={locale.code}
              onClick={() => changeLocale(locale.code)}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <locale.flag className="w-4 h-4 rounded-sm" />
                {locale.label}
              </span>
              {locale.code === current && <Check size={14} />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default LanguageSubmenu

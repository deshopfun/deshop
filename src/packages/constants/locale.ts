import {
  GB,
  BD,
  DE,
  ES,
  FR,
  IN,
  ID,
  IT,
  JP,
  PL,
  PT,
  RU,
  TH,
  PH,
  UA,
  VN,
  CN,
  TW,
  FlagComponent,
  US,
} from 'country-flag-icons/react/3x2'

export type LOCALE = {
  code: string
  label: string
  flag: FlagComponent
}

export const LOCALES: LOCALE[] = [
  { code: 'en', label: 'English', flag: US },
  { code: 'bn', label: 'বাংলা', flag: BD },
  { code: 'de', label: 'Deutsch', flag: DE },
  { code: 'es', label: 'Español', flag: ES },
  { code: 'fr', label: 'Français', flag: FR },
  { code: 'hi', label: 'हिन्दी', flag: IN },
  { code: 'id', label: 'Bahasa Indonesia', flag: ID },
  { code: 'it', label: 'Italiano', flag: IT },
  { code: 'ja', label: '日本語', flag: JP },
  { code: 'pl', label: 'Polski', flag: PL },
  { code: 'pt', label: 'Português', flag: PT },
  { code: 'ru', label: 'Русский', flag: RU },
  { code: 'th', label: 'ไทย', flag: TH },
  { code: 'tl', label: 'Tagalog', flag: PH },
  { code: 'uk', label: 'Українська', flag: UA },
  { code: 'vi', label: 'Tiếng Việt', flag: VN },
  { code: 'zh-CN', label: '中文', flag: CN },
  { code: 'zh-TW', label: '繁體中文', flag: TW },
]

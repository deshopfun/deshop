// utils/social.tsx
import type { ComponentType } from 'react'
import { Globe } from 'lucide-react'
import { SiDiscord, SiGithub, SiInspire, SiTelegram, SiX, SiYoutube } from '@icons-pack/react-simple-icons'
import { isValidHttpUrl } from '@/utils/verify'
import type { ProfileType } from '@/utils/types'

export type SocialKey = 'x' | 'github' | 'telegram' | 'discord' | 'youtube' | 'linkedin' | 'website'
export type SocialValues = Record<SocialKey, string>

type IconType = ComponentType<{ className?: string }>

export type SocialConfig = {
  key: SocialKey
  label: string
  icon: IconType
  placeholder: string
  // 把用户名拼成主页链接；没有则表示该平台只有用户名（如 Discord）
  toUrl?: (handle: string) => string
}

// 数组顺序 = 展示顺序
export const SOCIALS: SocialConfig[] = [
  {
    key: 'x',
    label: 'X',
    icon: SiX,
    placeholder: 'username or https://x.com/username',
    toUrl: (h) => `https://x.com/${h}`,
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: SiGithub,
    placeholder: 'username or https://github.com/username',
    toUrl: (h) => `https://github.com/${h}`,
  },
  {
    key: 'telegram',
    label: 'Telegram',
    icon: SiTelegram,
    placeholder: 'username or https://t.me/username',
    toUrl: (h) => `https://t.me/${h}`,
  },
  {
    key: 'discord',
    label: 'Discord',
    icon: SiDiscord,
    placeholder: 'username or invite link',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: SiYoutube,
    placeholder: '@channel or https://youtube.com/@channel',
    toUrl: (h) => `https://www.youtube.com/@${h}`,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: SiInspire,
    placeholder: 'username or https://linkedin.com/in/username',
    toUrl: (h) => `https://www.linkedin.com/in/${h}`,
  },
  {
    key: 'website',
    label: 'Website',
    icon: Globe,
    placeholder: 'https://your-site.com',
  },
]

export const EMPTY_SOCIALS: SocialValues = {
  x: '',
  github: '',
  telegram: '',
  discord: '',
  youtube: '',
  linkedin: '',
  website: '',
}

// 从 profile 里取出社交字段
export const pickSocials = (p?: Partial<ProfileType>): SocialValues => ({
  x: p?.x ?? '',
  github: p?.github ?? '',
  telegram: p?.telegram ?? '',
  discord: p?.discord ?? '',
  youtube: p?.youtube ?? '',
  linkedin: p?.linkedin ?? '',
  website: p?.website ?? '',
})

const HANDLE_RE = /^[A-Za-z0-9._-]{1,64}$/
const isUrl = (v: string) => /^https?:\/\//i.test(v)

/**
 * 规范化用户输入：
 * - 完整链接：只接受 http(s)
 * - website：没写协议时补 https://
 * - 其余：当作用户名，去掉开头的 @，并严格校验字符（它会被拼进 URL 路径）
 * 返回 value 是应当保存的值；有 error 说明输入不合法。
 */
export const normalizeSocial = (
  cfg: SocialConfig,
  raw?: string
): { value: string; error?: string } => {
  const v = (raw ?? '').trim()
  if (!v) return { value: '' }

  if (isUrl(v)) {
    return isValidHttpUrl(v) ? { value: v } : { value: v, error: 'Invalid link' }
  }

  if (cfg.key === 'website') {
    const url = `https://${v}`
    return isValidHttpUrl(url) ? { value: url } : { value: v, error: 'Invalid website' }
  }

  const handle = v.replace(/^@/, '')
  if (!HANDLE_RE.test(handle) || /^\.+$/.test(handle)) {
    return { value: v, error: 'Enter a username or a full https:// link' }
  }
  return { value: handle }
}

export type ResolvedSocial = { href?: string; copy?: string }

// 展示用：把保存的值解析成可点击链接，或"点击复制"的用户名
export const resolveSocial = (cfg: SocialConfig, raw?: string): ResolvedSocial | null => {
  const { value, error } = normalizeSocial(cfg, raw)
  if (!value || error) return null
  if (isUrl(value)) return { href: value }
  return cfg.toUrl ? { href: cfg.toUrl(encodeURIComponent(value)) } : { copy: value }
}

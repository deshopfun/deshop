import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Send, ChevronUp, Mail } from 'lucide-react'
import LanguageSwitcher from '../Language/LanguageSwitcher'
import { PRODUCT_TYPE } from '@/packages/constants'
import { SiGithub, SiX } from '@icons-pack/react-simple-icons'

const SOCIAL_LINKS = [
  { href: 'https://t.me/deshop_tech_updates', label: 'Telegram', icon: Send },
  { href: 'https://twitter.com/', label: 'X (Twitter)', icon: SiX },
  { href: 'https://github.com/deshopfun', label: 'GitHub', icon: SiGithub },
]

const SUPPORT_LINKS = [
  { href: '/support', label: 'Help Center' },
  { href: '/support', label: 'Contact us' },
  { href: '/docs/fees', label: 'Fees' },
  { href: 'https://deshop.instatus.com', label: 'Status' },
]

const COMPANY_LINKS = [
  { href: 'https://docs.deshop.space', label: 'Documentation' },
  { href: '/docs/terms-and-conditions', label: 'Terms of Use' },
  { href: '/docs/privacy-policy', label: 'Privacy Policy' },
  { href: '/create', label: 'Start Selling' },
]

const LEGAL_LINKS = [
  { href: '/docs/privacy-policy', label: 'Privacy' },
  { href: '/docs/terms-and-conditions', label: 'Terms of Use' },
  { href: '/docs/fees', label: 'Fees' },
  { href: '/support', label: 'Help Center' },
  { href: 'https://docs.deshop.space', label: 'Docs' },
]

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-600 transition-colors"
    >
      <ChevronUp size={20} />
    </button>
  )
}

const HomeFooter = () => {
  const router = useRouter()
  const [showAllCategories, setShowAllCategories] = useState(false)

  const categories = Object.entries(PRODUCT_TYPE)
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 12)

  return (
    <>
      <footer className="mt-16 bg-gray-50 text-gray-900 border-t border-gray-100">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-sm">
                D
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-wide">DESHOP</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">Decentralized Digital Exchange Platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-gray-400 mb-4">Browse by category</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                {visibleCategories.map(([key, value]) => (
                  <Link key={key} href={`/explore?type=${key}`} className="group">
                    <p className="text-sm text-gray-900 group-hover:text-sky-600 transition-colors">
                      {value}
                    </p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                      Products & listings
                    </p>
                  </Link>
                ))}
              </div>
              {categories.length > 12 && (
                <button
                  type="button"
                  onClick={() => setShowAllCategories((v) => !v)}
                  className="mt-4 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showAllCategories ? 'View less' : 'View more'} ⌄
                </button>
              )}
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-medium text-gray-400 mb-4">Support & Social</p>
              <ul className="flex flex-col gap-2.5">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 hover:text-sky-600 transition-colors"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="text-xs font-medium text-gray-400 mb-4">DESHOP</p>
              <ul className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {router.pathname === '/products/[id]' && router.query.id && (
                  <li>
                    <Link
                      href={`/report/products/${router.query.id}`}
                      className="text-sm text-gray-700 hover:text-sky-600 transition-colors"
                    >
                      Report product
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
              <a
                href="mailto:support@deshop.space"
                aria-label="Email"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span>© deshop.space 2026</span>
              {LEGAL_LINKS.map((link) => (
                <span key={link.label} className="flex items-center gap-3">
                  <span className="text-gray-300">·</span>
                  <Link href={link.href} className="hover:text-gray-900 transition-colors">
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>

            <div className="md:shrink-0">
              <LanguageSwitcher />
            </div>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-gray-400 max-w">
            DESHOP is a marketplace for digital and physical products with crypto checkout.
            Transactions may require on-chain confirmation and mutual confirmation between buyer and
            seller before an order is marked complete. Trading and payments involve risk. See our{' '}
            <Link href="/docs/terms-and-conditions" className="underline hover:text-gray-600">
              Terms of Service
            </Link>{' '}
            &{' '}
            <Link href="/docs/privacy-policy" className="underline hover:text-gray-600">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </footer>

      <BackToTop />
    </>
  )
}

export default HomeFooter

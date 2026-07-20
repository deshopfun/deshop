// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const HomeFooter = () => {
//   const router = useRouter();

//   return (
//     <div className="flex flex-row items-center p-4">
//       <div className="flex-1">
//         <p>© deshop.space 2026</p>
//       </div>
//       <div className="flex flex-row items-center justify-center gap-4">
//         <Link color={'textPrimary'} href="/docs/privacy-policy">
//           Privacy policy
//         </Link>
//         <p>|</p>
//         <Link color={'textPrimary'} href="/docs/terms-and-conditions">
//           Terms of service
//         </Link>
//         <p>|</p>
//         <Link color={'textPrimary'} href="/docs/fees">
//           Fees
//         </Link>
//         <p>|</p>
//         <Link color={'textPrimary'} href="#">
//           Revenue
//         </Link>
//         <p>|</p>
//         <Link color={'textPrimary'} href="https://t.me/deshop_tech_updates" target="_blank">
//           Tech updates
//         </Link>
//       </div>
//       <div className="flex-1 flex justify-end">
//         {router.pathname === '/products/[id]' && router.query.id && (
//           <Link className="no-underline text-right" color={'textPrimary'} href={`/report/products/${router.query.id}`}>
//             Report
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeFooter;

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Send, ChevronUp, X, Bot } from 'lucide-react'
import LanguageSwitcher from '../Language/LanguageSwitcher'

const SOCIAL_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  { href: 'https://t.me/deshop_tech_updates', label: 'Telegram', icon: <Send size={18} /> },
  { href: 'https://twitter.com/', label: 'Twitter / X', icon: <X size={18} /> },
  { href: 'https://github.com/deshopfun', label: 'GitHub', icon: <Bot size={18} /> },
]

const LEGAL_LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: '/docs/privacy-policy', label: 'Privacy policy' },
  { href: '/docs/terms-and-conditions', label: 'Terms of service' },
  { href: '/docs/fees', label: 'Fees' },
  { href: '#', label: 'Revenue' },
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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-textPrimary shadow-lg hover:opacity-90 transition-opacity"
    >
      <ChevronUp size={20} />
    </button>
  )
}

const HomeFooter = () => {
  const router = useRouter()

  return (
    <>
      <div className="container mx-auto">
        <footer className="border-t border-gray-100 mt-8">
          <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
            <div className="flex-1 text-sm text-gray-500">
              <p>© deshop.space 2026</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
              {LEGAL_LINKS.map((link, i) => (
                <div key={link.href + link.label} className="flex items-center gap-3">
                  {i > 0 && <span className="text-gray-300">|</span>}
                  <Link
                    className="text-textPrimary hover:opacity-80 transition-opacity"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex flex-1 items-center justify-center md:justify-end gap-4">
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-textPrimary hover:opacity-80 transition-opacity"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <span className="text-gray-300">|</span>

              <LanguageSwitcher />

              {router.pathname === '/products/[id]' && router.query.id && (
                <>
                  <span className="text-gray-300">|</span>
                  <Link
                    className="no-underline text-textPrimary hover:opacity-80 transition-opacity"
                    href={`/report/products/${router.query.id}`}
                  >
                    Report
                  </Link>
                </>
              )}
            </div>
          </div>
        </footer>

        <BackToTop />
      </div>
    </>
  )
}

export default HomeFooter

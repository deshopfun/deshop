import { useState } from 'react'

type DeshopWelcomeProps = {
  className?: string
}

type Step = {
  title: string
  body: string
}

type FaqItem = {
  question: string
  answer: string
}

const BUYER_STEPS: Step[] = [
  {
    title: 'Browse & compare',
    body: 'See features, pricing, and honest trade-offs side by side. No account needed to look around.',
  },
  {
    title: 'Sign up with email',
    body: 'Create an account to save products and track orders. Still no wallet required yet.',
  },
  {
    title: 'Connect a wallet to pay',
    body: "Only when you're ready to buy. Funds go straight to the maker's wallet — DeShop never touches them.",
  },
]

const OWNER_STEPS: Step[] = [
  {
    title: 'Sign up with email',
    body: 'Create your account and set up a listing profile — no crypto wallet needed to get started.',
  },
  {
    title: 'Set your payout wallet once',
    body: "Add one wallet in your account settings. It's used to receive payment for every product you publish.",
  },
  {
    title: 'List products & get paid',
    body: 'Buyers compare you honestly, pay on-chain, and earnings land straight in that one wallet.',
  },
]

const BUYER_FAQS: FaqItem[] = [
  {
    question: 'Do I need a crypto wallet to sign up?',
    answer:
      'No. You create your account with just an email address. A wallet is only needed later, at the moment you decide to pay for something.',
  },
  {
    question: 'What happens if a transaction fails?',
    answer:
      'It depends where it stopped. Stuck on "pending" usually means the gas fee was set too low. Rejected means your funds never left your wallet. Confirmed on-chain but the order hasn\'t updated yet usually means it\'s waiting on the maker to confirm delivery.',
  },
  {
    question: "What's the refund policy?",
    answer:
      "DeShop never holds funds, so refunds are set by each maker individually. Check the policy on the listing page before you buy, or ask the maker directly if it isn't stated.",
  },
  {
    question: 'Any wallet safety tips before I pay?',
    answer:
      "Double-check the address, chain, and amount before confirming. For a large first-time payment, send a small test amount first. Never type your seed phrase into a website or chat, and only pay the address shown on the maker's DeShop listing.",
  },
]

const OWNER_FAQS: FaqItem[] = [
  {
    question: 'How long does review take?',
    answer:
      'It depends on how complete your listing is. A clear description, honest trade-offs, and finished pricing usually move through review faster.',
  },
  {
    question: 'Do I need a separate wallet for each product?',
    answer:
      "No. You set one payout wallet in your account settings, and every product you publish gets paid to that same wallet — you don't manage a different address per listing.",
  },
  {
    question: 'What does DeShop charge?',
    answer:
      'Fees (like listing or featured placement) are set by DeShop and can change over time — check the current rates in your account before you publish.',
  },
  {
    question: "Can I edit a listing after it's live?",
    answer:
      'Yes. Update your description, pricing, or supported chains any time from your account. Bigger changes, like switching your payout wallet, may need extra verification to protect buyers.',
  },
]

export default function DeshopWelcome({ className = '' }: DeshopWelcomeProps) {
  return (
    <div className={`min-h-screen bg-[#F7F9FC] text-[#0B1B33] antialiased ${className}`}>
      <header className="border-b border-[#DCE3EE]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-serif text-xl font-bold tracking-tight">DeShop</span>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-[#55627A] lg:flex">
            <a href="#how-it-works" className="transition hover:text-[#0B1B33]">
              How it works
            </a>
            <a href="#why" className="transition hover:text-[#0B1B33]">
              Why decentralized
            </a>
            <a href="#chains" className="transition hover:text-[#0B1B33]">
              Supported chains
            </a>
            <a href="#faq" className="transition hover:text-[#0B1B33]">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/login'
              }}
              className="hidden rounded-full border border-[#DCE3EE] px-4 py-2 text-sm font-medium transition hover:border-[#0B6CFF] hover:text-[#0B6CFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CFF] sm:inline-flex"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = '/register'
              }}
              className="rounded-full bg-gradient-to-br from-[#0B6CFF] to-[#00AEFF] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CFF]"
            >
              Sign up free
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:py-24">
        <div>
          <h1 className="font-serif text-4xl font-bold leading-[1.1] sm:text-5xl">
            Open-source software, sold the way it&apos;s built — in the open.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#55627A]">
            Compare features, pricing, and honest trade-offs across open-source projects. Sign up
            with your email — you only connect a wallet when it&apos;s time to pay, and DeShop never
            holds your funds.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/explore'
              }}
              className="rounded-full bg-gradient-to-br from-[#0B6CFF] to-[#00AEFF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CFF]"
            >
              Browse products
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = '/create'
              }}
              className="rounded-full border border-[#DCE3EE] px-6 py-3 text-sm font-semibold transition hover:border-[#0B6CFF] hover:text-[#0B6CFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CFF]"
            >
              List your project
            </button>
          </div>
        </div>

        <LedgerCard />
      </section>

      <section id="how-it-works" className="border-t border-[#DCE3EE] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 className="font-serif text-3xl font-bold">How it works</h2>
          <p className="mt-3 max-w-xl text-[#55627A]">
            An email account gets you in. A wallet only shows up once — at checkout.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <StepTrack label="For buyers" steps={BUYER_STEPS} />
            <StepTrack label="For project owners" steps={OWNER_STEPS} />
          </div>
        </div>
      </section>

      <section id="why" className="border-t border-[#DCE3EE]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 className="font-serif text-3xl font-bold">Why decentralized</h2>
          <p className="mt-3 max-w-xl text-[#55627A]">
            DeShop never holds your funds. Here&apos;s what that actually changes.
          </p>

          <div className="mt-12 divide-y divide-[#DCE3EE] border-y border-[#DCE3EE]">
            <Principle
              title="Non-custodial"
              body="Your funds move wallet to wallet. DeShop never holds them, so there's nothing for us to lose or freeze."
            />
            <Principle
              title="One wallet, every listing"
              body="Project owners set a single payout wallet in their account. Every product they publish pays out to that same place — no per-listing setup."
            />
            <Principle
              title="Honest by design"
              body="Every listing shows real trade-offs, not just a highlight reel. That's what open source should mean."
            />
            <Principle
              title="Nothing to gatekeep"
              body="We don't approve your buyers or set your price. The chain settles the deal; we just help people find you."
            />
          </div>
        </div>
      </section>

      <section id="chains" className="border-t border-[#DCE3EE] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 className="font-serif text-3xl font-bold">Pay with what you already hold</h2>
          <p className="mt-3 max-w-xl text-[#55627A]">
            Every listing sets its own accepted chains. Chances are, one of them is already in your
            wallet.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 font-mono text-sm">
            {['EVM', 'Solana', 'TON', 'Bitcoin', 'Tron', 'XRP Ledger', 'Bitcoin Cash'].map(
              (chain) => (
                <span key={chain} className="border-l-2 border-[#0B6CFF] pl-3">
                  {chain}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-[#DCE3EE] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 className="font-serif text-3xl font-bold">Questions, answered</h2>
          <p className="mt-3 max-w-xl text-[#55627A]">
            What people usually ask before their first purchase, or their first listing.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="font-mono text-sm text-[#8592A8]">For buyers</h3>
              <div className="mt-4">
                <FaqAccordion items={BUYER_FAQS} idPrefix="buyer" />
              </div>
            </div>
            <div>
              <h3 className="font-mono text-sm text-[#8592A8]">For project owners</h3>
              <div className="mt-4">
                <FaqAccordion items={OWNER_FAQS} idPrefix="owner" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function LedgerCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[#DCE3EE] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(11,27,51,0.35)]">
      <div className="flex items-center justify-between border-b border-dashed border-[#DCE3EE] pb-4">
        <span className="font-mono text-xs tracking-wide text-[#8592A8]">Listing #0417</span>
        <span className="rounded-full bg-[#0B1B33] px-2 py-0.5 font-mono text-[10px] font-medium text-white">
          MIT
        </span>
      </div>

      <div className="mt-4">
        <h3 className="font-serif text-xl font-bold">Uptime Sentinel</h3>
        <p className="mt-1 text-sm text-[#55627A]">Self-hosted status pages &amp; alerting</p>
      </div>

      <dl className="mt-6 space-y-3 border-t border-[#DCE3EE] pt-4 font-mono text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-[#8592A8]">Price</dt>
          <dd>49 USDT</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[#8592A8]">Chain</dt>
          <dd>Solana</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[#8592A8]">Status</dt>
          <dd className="flex items-center gap-1.5 text-[#12965A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12965A]" aria-hidden="true" />
            Resolved
          </dd>
        </div>
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-[#8592A8]">
        Wallet to wallet, confirmed on-chain in 12 seconds. DeShop never touched the funds.
      </p>
    </div>
  )
}

function StepTrack({ label, steps }: { label: string; steps: Step[] }) {
  return (
    <div>
      <h3 className="font-mono text-sm text-[#8592A8]">{label}</h3>
      <ol className="relative mt-6 space-y-8 border-l border-[#DCE3EE] pl-6">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-[29px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#DCE3EE] bg-white font-mono text-xs text-[#0B6CFF]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4 className="font-semibold">{step.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#55627A]">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div className="grid gap-2 py-6 md:grid-cols-[220px_1fr] md:gap-8">
      <h3 className="font-serif text-lg font-bold">{title}</h3>
      <p className="text-[#55627A]">{body}</p>
    </div>
  )
}

function FaqAccordion({ items, idPrefix }: { items: FaqItem[]; idPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-[#DCE3EE] border-y border-[#DCE3EE]">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const panelId = `${idPrefix}-faq-panel-${i}`
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B6CFF]"
            >
              <span className="font-medium">{item.question}</span>
              <span aria-hidden="true" className="font-mono text-sm text-[#8592A8]">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <p id={panelId} className="pb-5 text-sm leading-relaxed text-[#55627A]">
                {item.answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 84 84"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="deshop-mark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B6CFF" />
          <stop offset="100%" stopColor="#00AEFF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="80" height="80" rx="20" fill="url(#deshop-mark)" />
      <text
        x="42"
        y="55"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight={700}
        fontSize={34}
        fill="#FFFFFF"
        textAnchor="middle"
      >
        D
      </text>
    </svg>
  )
}

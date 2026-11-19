import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Search,
  ShoppingBag,
  Store,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: '1. Discover products',
    description:
      'Browse trending items or search by category. Find digital goods, opensource tools, and more from creators worldwide.',
    icon: Search,
    accent: 'bg-sky-500',
  },
  {
    id: 2,
    title: '2. Choose & add to cart',
    description:
      'Select options like color or size, set the quantity, then add to cart or buy instantly. Stock updates in real time.',
    icon: ShoppingBag,
    accent: 'bg-emerald-500',
  },
  {
    id: 3,
    title: '3. Pay with crypto',
    description:
      'Checkout securely using cryptocurrency. Your payment is recorded on-chain so every transfer is transparent and verifiable.',
    icon: CreditCard,
    accent: 'bg-violet-500',
  },
  {
    id: 4,
    title: '4. Confirm & complete',
    description:
      'The order is only marked complete after the on-chain transaction is confirmed and both buyer and seller mutually confirm. This protects both sides.',
    icon: Store,
    accent: 'bg-amber-500',
  },
]

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLogin: boolean
}

export default function HowItWorksDialog({ open, onOpenChange, isLogin }: Props) {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)

  const currentStep = HOW_IT_WORKS_STEPS[stepIndex]
  const isLastStep = stepIndex === HOW_IT_WORKS_STEPS.length - 1
  const StepIcon = currentStep.icon

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setStepIndex(0)
        onOpenChange(next)
      }}
    >
      <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-0 shadow-2xl gap-0">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 px-4 sm:px-6 pt-8 pb-8 sm:pb-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-[280px]">
            <div className="rounded-2xl bg-white shadow-xl p-5 transform rotate-[-1deg]">
              <div className="flex items-start justify-between gap-3 mb-4">
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  {currentStep.title.replace(/^\d+\.\s*/, '')}
                </p>
                <div
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0',
                    currentStep.accent
                  )}
                >
                  <StepIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-9 rounded-lg bg-emerald-500/90" />
                <div className="flex-1 h-9 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="relative flex justify-center mt-4">
            {HOW_IT_WORKS_STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to step ${i + 1}`}
                onClick={() => setStepIndex(i)}
                className="px-1 py-2"
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-all',
                    i === stepIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white px-4 sm:px-6 pt-5 pb-6 flex flex-col gap-5">
          <div>
            <DialogTitle className="text-lg font-bold text-gray-900 leading-snug">
              {currentStep.title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {currentStep.description}
            </DialogDescription>
          </div>

          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <Button
                variant="outline"
                className="h-11 px-4 rounded-xl gap-1"
                onClick={() => setStepIndex((s) => s - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}

            {isLastStep ? (
              <Button
                className="flex-1 h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold"
                onClick={() => {
                  onOpenChange(false)
                  if (!isLogin) {
                    void router.push('/login')
                  }
                }}
              >
                {isLogin ? 'Got it' : 'Get started'}
              </Button>
            ) : (
              <Button
                className="flex-1 h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-1"
                onClick={() => setStepIndex((s) => s + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

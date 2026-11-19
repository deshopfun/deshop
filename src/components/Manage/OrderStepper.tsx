import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

const steps = [
  'Waiting for payment',
  'Waiting for receipt confirm',
  'Waiting for order confirm',
  'Order complete',
]

export default function OrderStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                'h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                i < activeStep
                  ? 'bg-sky-500 text-white'
                  : i === activeStep
                    ? 'bg-sky-500 text-white ring-4 ring-sky-100'
                    : 'bg-gray-100 text-gray-400'
              )}
            >
              {i < activeStep ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={cn(
                'text-xs text-center max-w-20 leading-tight',
                i <= activeStep ? 'text-sky-600 font-medium' : 'text-gray-400'
              )}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-2 mb-5 transition-colors',
                i < activeStep ? 'bg-sky-500' : 'bg-gray-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

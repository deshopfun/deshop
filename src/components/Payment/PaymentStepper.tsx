import { FAILED_STEP } from '@/hooks/queries/useOrder'

export const PAYMENT_STEPS = [
  'Choose Payment Method',
  'Waiting for Payment',
  'Transaction Confirmation',
  'Transaction Complete',
] as const

export default function PaymentStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="flex items-center gap-4">
        {PAYMENT_STEPS.map((label, index) => (
          <div key={label} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${
                  activeStep === FAILED_STEP
                    ? 'border-red-200 text-red-400'
                    : activeStep >= index
                      ? 'bg-primary border-primary text-white'
                      : 'border-muted'
                }`}
            >
              {index + 1}
            </div>
            <div className="ml-3 text-sm hidden md:block">{label}</div>
            {index < PAYMENT_STEPS.length - 1 && <div className="w-12 h-px bg-muted mx-4" />}
          </div>
        ))}
      </div>
    </div>
  )
}

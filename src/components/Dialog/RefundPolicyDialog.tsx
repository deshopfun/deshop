import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ShieldCheck, PackageX, Clock, AlertCircle, MessageCircle } from 'lucide-react'

type DialogType = {
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

const policies = [
  {
    icon: Clock,
    title: 'Return Window',
    desc: 'All return requests must be submitted within 7 days of receiving the product.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: PackageX,
    title: 'Non-Refundable Items',
    desc: 'Digital goods, downloadable content, and opened software are not eligible for refunds.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: ShieldCheck,
    title: 'Eligible Conditions',
    desc: 'Items must be unused, in original condition, and in original packaging to qualify for a return.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: AlertCircle,
    title: 'Dispute Resolution',
    desc: 'If you have an issue with your order, please contact the seller first before opening a dispute.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
]

export default function RefundPolicyDialog({ openDialog, setOpenDialog }: DialogType) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-br from-blue-600 to-sky-400 px-6 py-6 flex flex-col items-center gap-2 text-white text-center">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Refund Policy</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">
            Please read our return and refund terms carefully before making a purchase.
          </p>
        </div>

        <div className="px-6 py-5 flex flex-col gap-3">
          {policies.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
              <div
                className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 px-4 py-3 bg-sky-50 rounded-xl text-sky-700 text-xs">
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span>Have questions? Contact the seller directly for assistance with your order.</span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <Button
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold"
            onClick={() => setOpenDialog(false)}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

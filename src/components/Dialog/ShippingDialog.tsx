import { AddressType } from '@/utils/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Truck, User, Mail, Building2, Phone, MapPin } from 'lucide-react'

type DialogType = {
  alignment: 'buy' | 'sell'
  shippingConfirmed: number
  shipping: AddressType
  openDialog: boolean
  handleCloseDialog: () => Promise<void>
}

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => {
  if (!value) return null
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-dashed border-gray-100 last:border-0">
      <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <span className="text-sm font-semibold text-right">{value}</span>
    </div>
  )
}

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
    {title}
  </p>
)

export default function ShippingDialog({
  alignment,
  shippingConfirmed,
  shipping,
  openDialog,
  handleCloseDialog,
}: DialogType) {
  const isConfirmed = shippingConfirmed === 1

  const fullAddress = [
    shipping?.address_one,
    shipping?.address_two,
    shipping?.city,
    shipping?.province,
    shipping?.zip,
    shipping?.country,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-md rounded-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div
          className={`px-6 py-6 flex flex-col items-center gap-2 text-white text-center shrink-0 ${
            isConfirmed
              ? 'bg-gradient-to-br from-green-500 to-emerald-400'
              : 'bg-gradient-to-br from-blue-600 to-sky-400'
          }`}
        >
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <Truck className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Shipping Details</DialogTitle>
          </DialogHeader>
          <div
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              isConfirmed ? 'bg-white/20 text-white' : 'bg-white/20 text-white/90'
            }`}
          >
            {isConfirmed ? '✓ Shipping Confirmed' : 'Awaiting Confirmation'}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <div>
            <SectionTitle title="Recipient" />
            <InfoRow
              icon={User}
              label="Name"
              value={[shipping?.first_name, shipping?.last_name].filter(Boolean).join(' ')}
            />
            <InfoRow icon={Mail} label="Email" value={shipping?.email} />
            <InfoRow icon={Building2} label="Company" value={shipping?.company} />
            <InfoRow icon={Phone} label="Phone" value={shipping?.phone} />
          </div>

          <div>
            <SectionTitle title="Shipping Address" />
            <div className="flex items-start gap-3 px-4 py-3 bg-gray-50 rounded-xl">
              <MapPin className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">{fullAddress || '—'}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0">
          <Button variant="outline" className="w-full h-10" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

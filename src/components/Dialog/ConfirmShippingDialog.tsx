import { useSnackPresistStore } from '@/lib'
import { useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { AddressType } from '@/utils/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Truck, Loader2, AlertCircle, User, Mail, Building2, Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

type DialogType = {
  orderId: number
  confirmNumber: string
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

export default function ConfirmShippingDialog({
  orderId,
  confirmNumber,
  shipping,
  openDialog,
  handleCloseDialog,
}: DialogType) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }
  const showSuccess = (msg: string) => {
    setSnackSeverity('success')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const isMatch = text === confirmNumber
  const hasInput = text.length > 0

  const handleClose = () => {
    setText('')
    handleCloseDialog()
  }

  const onClickConfirm = async () => {
    if (!orderId) return
    if (!text || text !== confirmNumber) return showError('Incorrect confirmation text')
    setLoading(true)
    try {
      const response: any = await axios.put(Http.order_confirm_shipping, {
        order_id: orderId,
        confirm_number: text,
      })
      if (response.result) {
        await handleCloseDialog()
        showSuccess('Shipping confirmed successfully')
      } else {
        showError('Confirmation failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

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
    <Dialog open={openDialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-br from-blue-600 to-sky-400 px-6 py-6 flex flex-col items-center gap-2 text-white text-center shrink-0">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <Truck className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Confirm Shipping</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">Verify the shipping address before confirming</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Recipient
            </p>
            <InfoRow
              icon={User}
              label="Name"
              value={[shipping?.first_name, shipping?.last_name].filter(Boolean).join(' ')}
            />
            <InfoRow icon={Mail} label="Email" value={shipping?.email} />
            <InfoRow icon={Building2} label="Company" value={shipping?.company} />
            <InfoRow icon={Phone} label="Phone" value={shipping?.phone} />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Shipping Address
            </p>
            <div className="flex items-start gap-2 px-4 py-3 bg-gray-50 rounded-xl">
              <MapPin className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">{fullAddress || '—'}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-4">
            <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 rounded-xl text-amber-700">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="text-sm">
                To confirm, type{' '}
                <span className="font-bold font-mono bg-amber-100 px-1.5 py-0.5 rounded">
                  {confirmNumber}
                </span>{' '}
                below.
              </p>
            </div>

            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Type "${confirmNumber}" to confirm`}
              className={cn(
                'font-mono transition-colors',
                hasInput &&
                  (isMatch
                    ? 'border-green-400 focus-visible:ring-green-300'
                    : 'border-red-300 focus-visible:ring-red-200')
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isMatch) onClickConfirm()
              }}
              autoFocus
            />
            {hasInput && (
              <p className={cn('text-xs', isMatch ? 'text-green-500' : 'text-red-400')}>
                {isMatch ? '✓ Confirmation text matches' : '✗ Text does not match'}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0 flex flex-col gap-2">
          <Button
            className={cn(
              'w-full h-11 font-semibold gap-2 transition-all',
              isMatch
                ? 'bg-sky-500 hover:bg-sky-600 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            )}
            onClick={onClickConfirm}
            disabled={!isMatch || loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Truck className="h-4 w-4" /> Confirm Shipping
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full h-10 text-muted-foreground"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

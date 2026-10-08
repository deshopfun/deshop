import { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Check, Copy, User } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useSnackPresistStore } from '@/lib'
import { useShallow } from 'zustand/react/shallow'
import { WalletType } from '@/utils/types'
import { FindChainNamesByChainids } from '@/utils/web3'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  username?: string
  avatarUrl?: string
  wallets: WalletType[]
}

const TipDialog = ({ open, onOpenChange, username, avatarUrl, wallets }: Props) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!open) setCopiedKey(null)
  }, [open])

  const onCopy = async (key: string, address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedKey(key)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopiedKey(null), 2000)
    } catch {
      setSnackSeverity('error')
      setSnackMessage('Copy failed. Please select the address and copy it manually.')
      setSnackOpen(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader className="items-center text-center sm:text-center">
          <Avatar className="h-16 w-16 border-4 border-background shadow-md">
            <AvatarImage src={GetAbosolutePathByRelative(avatarUrl, 'avatar')} alt={username} />
            <AvatarFallback>
              <User className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <DialogTitle className="mt-2 text-xl">Tip {username}</DialogTitle>
          <DialogDescription>
            Show your appreciation by sending crypto directly to their wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {wallets.map((w, i) => {
            const key = `${w.chain_id}-${w.address}-${i}`
            const copied = copiedKey === key
            return (
              <div key={key} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {FindChainNamesByChainids(w.chain_id)}
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    variant={copied ? 'default' : 'outline'}
                    className={
                      copied
                        ? 'h-8 gap-1.5 bg-emerald-500 hover:bg-emerald-500 text-white'
                        : 'h-8 gap-1.5'
                    }
                    onClick={() => onCopy(key, w.address)}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="font-mono text-xs text-gray-800 break-all select-all leading-relaxed">
                  {w.address}
                </p>
              </div>
            )
          })}
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2.5 text-xs text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Only send assets on the matching network. On-chain transfers are final and cannot be
            reversed, so double-check the address before sending.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TipDialog

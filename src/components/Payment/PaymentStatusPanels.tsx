import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GetBlockchainTxUrlByChainIds } from '@/utils/web3'
import { OmitMiddleString } from '@/utils/strings'
import type { TransactionType } from '@/utils/types'
import { Ban, CheckCircle, Clock, ExternalLink, Share2, XCircle } from 'lucide-react'

export function PaymentClosedPanel() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
        <Ban className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">This order is no longer available for payment</h2>
      <p className="text-muted-foreground">
        The order has been cancelled or refunded. Please contact support if you believe this is a
        mistake.
      </p>
    </div>
  )
}

type TxPanelProps = {
  tx: TransactionType
  chainName: string
  onShare?: () => void
  onRetry?: () => void
  changingMethod?: boolean
}

export function PaymentConfirmingPanel({ tx, chainName, onShare }: TxPanelProps) {
  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
        <Clock className="w-10 h-10 text-blue-500" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Confirming on the blockchain</h2>
      <p className="text-muted-foreground mb-8">
        We&apos;ve detected your transaction. Please wait for network confirmations — no need to pay
        again.
      </p>

      <Card className="text-left">
        <CardContent className="p-8 space-y-5">
          {typeof tx.blockchain.confirmations === 'number' &&
            typeof tx.blockchain.required_confirmations === 'number' && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Confirmations</span>
                  <span>
                    {tx.blockchain.confirmations} / {tx.blockchain.required_confirmations}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        (tx.blockchain.confirmations / tx.blockchain.required_confirmations) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

          <Separator />

          <div className="flex justify-between text-sm">
            <span>Amount</span>
            <span>
              {tx.blockchain.crypto_amount} {tx.blockchain.token}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Blockchain</span>
            <span>{chainName}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span>Transaction Hash</span>
            <a
              href={GetBlockchainTxUrlByChainIds(tx.blockchain.chain_id, tx.blockchain.hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              {OmitMiddleString(tx.blockchain.hash)}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {onShare && (
        <Button variant="ghost" className="mt-6" onClick={onShare}>
          <Share2 className="w-4 h-4 mr-1" />
          Share this payment
        </Button>
      )}
    </div>
  )
}

export function PaymentFailedPanel({
  tx,
  chainName,
  onRetry,
  changingMethod,
}: TxPanelProps) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
        <XCircle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Payment failed</h2>
      <p className="text-muted-foreground mb-8">
        {tx.message || 'This transaction could not be completed. Please try again.'}
      </p>

      <Card className="text-left">
        <CardContent className="p-8 space-y-5">
          <div className="flex justify-between text-sm">
            <span>Amount</span>
            <span>
              {tx.blockchain?.crypto_amount} {tx.blockchain?.token}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Blockchain</span>
            <span>{chainName}</span>
          </div>
          {tx.blockchain?.hash && (
            <div className="flex justify-between text-sm items-center">
              <span>Transaction Hash</span>
              <a
                href={GetBlockchainTxUrlByChainIds(tx.blockchain.chain_id, tx.blockchain.hash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                {OmitMiddleString(tx.blockchain.hash)}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {onRetry && (
        <Button className="mt-6" onClick={onRetry} disabled={changingMethod}>
          {changingMethod ? 'Switching...' : 'Try a different payment method'}
        </Button>
      )}
    </div>
  )
}

type SuccessProps = {
  tx?: TransactionType
  chainName: string
  onShare?: () => void
}

export function PaymentSuccessPanel({ tx, chainName, onShare }: SuccessProps) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      <h2 className="text-4xl font-bold mb-4">Payment Successful</h2>
      <p className="text-muted-foreground text-lg">Thank you for your purchase!</p>

      {tx && (
        <Card className="mt-10">
          <CardContent className="p-8 space-y-4 text-left">
            <div className="flex justify-between">
              <span>Status</span>
              <Badge variant="default">Settled</Badge>
            </div>
            <div className="flex justify-between">
              <span>Blockchain</span>
              <span>{chainName}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction Hash</span>
              <a
                href={GetBlockchainTxUrlByChainIds(tx.blockchain.chain_id, tx.blockchain.hash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {OmitMiddleString(tx.blockchain.hash)}
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {onShare && (
        <Button variant="outline" className="mt-6" onClick={onShare}>
          <Share2 className="w-4 h-4 mr-1" />
          Share receipt
        </Button>
      )}
    </div>
  )
}

import { QRCodeSVG } from 'qrcode.react'
import WalletConnectButton from '@/components/Button/WalletConnectButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CHAINIDS, COINS } from '@/packages/constants'
import { GetImgSrcByCrypto } from '@/utils/qrcode'
import type { TransactionType } from '@/utils/types'
import { Copy, Wallet } from 'lucide-react'

type TokenInfo = {
  contractAddress?: string
  decimals?: number
} | undefined

type Props = {
  tx: TransactionType
  paymentLink: string
  token: TokenInfo
  pasteTxId: boolean
  txid: string
  submittingTxid: boolean
  onCopyAddress: () => void
  onTogglePaste: (open: boolean) => void
  onTxidChange: (value: string) => void
  onSubmitTxid: () => void
}

export default function PaymentPendingPanel({
  tx,
  paymentLink,
  token,
  pasteTxId,
  txid,
  submittingTxid,
  onCopyAddress,
  onTogglePaste,
  onTxidChange,
  onSubmitTxid,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-2xl shadow">
                <QRCodeSVG
                  value={paymentLink}
                  size={260}
                  imageSettings={{
                    src: GetImgSrcByCrypto(tx.blockchain.token as COINS),
                    width: 50,
                    height: 50,
                    excavate: true,
                  }}
                />
              </div>
            </div>

            <p className="text-2xl font-bold mb-2">
              {tx.blockchain.crypto_amount} {tx.blockchain.token}
            </p>
            <p className="text-muted-foreground">Send exactly this amount in one transaction</p>

            <div className="mt-8 space-y-3">
              <Button onClick={onCopyAddress} className="w-full" variant="outline">
                <Copy className="mr-2 w-4 h-4" /> Copy Address
              </Button>

              <a href={paymentLink} className="md:hidden block">
                <Button className="w-full" variant="outline">
                  <Wallet className="mr-2 w-4 h-4" /> Open in Wallet App
                </Button>
              </a>

              <WalletConnectButton
                chainIds={tx.blockchain.chain_id as CHAINIDS}
                address={tx.blockchain.address}
                contractAddress={token?.contractAddress}
                decimals={token?.decimals}
                value={tx.blockchain.crypto_amount}
                buttonSize="large"
                fullWidth
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Already Paid?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Paste your transaction hash (TxID) for manual confirmation
            </p>

            {pasteTxId ? (
              <div className="space-y-4">
                <Input
                  placeholder="Enter TxID"
                  value={txid}
                  onChange={(e) => onTxidChange(e.target.value)}
                  disabled={submittingTxid}
                />
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => onTogglePaste(false)}
                    disabled={submittingTxid}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={onSubmitTxid}
                    disabled={submittingTxid || !txid.trim()}
                  >
                    {submittingTxid ? 'Submitting...' : 'Confirm Payment'}
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" className="w-full" onClick={() => onTogglePaste(true)}>
                Paste Transaction ID
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

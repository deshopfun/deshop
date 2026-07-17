import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { BLOCKCHAIN, BLOCKCHAINNAMES, CHAINIDS, COINS } from '@/packages/constants'
import Image from 'next/image'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useRouter } from 'next/router'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'

import {
  FindChainNamesByChainids,
  FindTokenByChainIdsAndSymbol,
  GetBlockchainAddressUrlByChainIds,
  GetBlockchainTxUrlByChainIds,
} from '@/utils/web3'
import { GetImgSrcByChain, GetImgSrcByCrypto } from '@/utils/qrcode'
import { OmitMiddleString } from '@/utils/strings'

import WalletConnectButton from '@/components/Button/WalletConnectButton'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'

import { CheckCircle, ArrowLeft, Copy, QrCode, Clock, Wallet, ExternalLink } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

const steps = [
  'Choose Payment Method',
  'Waiting for Payment',
  'Transaction Confirmation',
  'Transaction Complete',
]

const PaymentDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<any>()
  const [blockchains, setBlockchains] = useState<BLOCKCHAIN[]>([])
  const [expandedChain, setExpandedChain] = useState<string | null>(null)
  const [pasteTxId, setPasteTxId] = useState<boolean>(false)
  const [txid, setTxid] = useState<string>('')

  const [activeStep, setActiveStep] = useState(0)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)
  const { getUuid } = useUserPresistStore((state) => state)

  const init = async (orderId: any) => {
    try {
      const response: any = await axios.get(Http.order_by_id, {
        params: { order_id: Number(orderId) },
      })

      if (response.result) {
        const newBlockchains: BLOCKCHAIN[] = BLOCKCHAINNAMES.reduce((acc: BLOCKCHAIN[], chain) => {
          const wallet = response.data.wallets?.find((w: any) => w.chain_id === chain.chainId)
          if (wallet?.address) {
            const coins = chain.coins.filter((coin) => !wallet.disable_coin?.includes(coin.name))
            if (coins.length > 0) {
              acc.push({ ...chain, coins })
            }
          }
          return acc
        }, [])

        setBlockchains(newBlockchains)
        setOrder(response.data)

        const status = response.data.transactions?.[0]?.transaction_status
        if (status === 1 || status === 2 || status === 4) {
          setActiveStep(3)
          setPage(3)
        } else if (status === 3) {
          setActiveStep(1)
          setPage(2)
        }
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Network error occurred')
      setSnackOpen(true)
      console.error(e)
    }
  }

  useEffect(() => {
    if (id) init(id)
  }, [id])

  useEffect(() => {
    if (!id) return
    const interval = setInterval(() => init(id), 10000)
    return () => clearInterval(interval)
  }, [id])

  const onClickBlockchain = async (chainId: number, coin: string) => {
    if (!order) return
    try {
      const res: any = await axios.post(Http.transaction, {
        order_id: order.order_id,
        chain_id: chainId,
        coin,
      })

      if (res.result) await init(id)
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Failed to select payment method')
      setSnackOpen(true)
    }
  }

  const onClickPasteTxId = async () => {
    if (!order || !txid) return
    try {
      const res: any = await axios.post(Http.transaction_paste_tx_id, {
        order_id: order.order_id,
        txid,
      })

      if (res.result) {
        setSnackSeverity('success')
        setSnackMessage('Transaction submitted')
        setSnackOpen(true)
        window.location.reload()
      } else {
        setSnackSeverity('error')
        setSnackMessage(res.message)
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Failed to submit transaction')
      setSnackOpen(true)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setSnackSeverity('success')
    setSnackMessage('Copied successfully')
    setSnackOpen(true)
  }

  if (!order) {
    return <div className="py-20 text-center">Loading payment...</div>
  }

  const currencySymbol = order.currency || '$'
  const tx = order.transactions?.[0]
  const chainName = FindChainNamesByChainids(tx.blockchain.chain_id)
  const token = FindTokenByChainIdsAndSymbol(
    tx.blockchain.chain_id as CHAINIDS,
    tx.blockchain.token as COINS
  )

  const getPaymentLink = () => {
    const base = `${chainName}:${tx.blockchain.address}`

    if (token?.isMainCoin) {
      return `${base}?amount=${tx.blockchain.crypto_amount}`
    }

    return `${base}?` + `token=${token?.contractAddress}&` + `amount=${tx.blockchain.crypto_amount}`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-4">
          {steps.map((label, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${activeStep >= index ? 'bg-primary border-primary text-white' : 'border-muted'}`}
              >
                {index + 1}
              </div>
              <div className="ml-3 text-sm hidden md:block">{label}</div>
              {index < steps.length - 1 && <div className="w-12 h-px bg-muted mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {page === 1 && (
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">Choose Payment Method</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {blockchains.map((chain) => (
                <Card key={chain.name} className="overflow-hidden">
                  <div
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      setExpandedChain(expandedChain === chain.name ? null : chain.name)
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold">{chain.name}</div>
                      <p className="text-muted-foreground">{chain.desc}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {expandedChain === chain.name ? '▲' : '▼'}
                    </div>
                  </div>

                  {expandedChain === chain.name && (
                    <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                      {chain.coins.map((coin) => (
                        <Button
                          key={coin.name}
                          variant="outline"
                          className="h-20 justify-start gap-4"
                          onClick={() => onClickBlockchain(coin.chainId, coin.name)}
                        >
                          <Image src={coin.icon} alt={coin.name} width={40} height={40} />
                          <div className="text-left">
                            <p className="font-semibold">{coin.name}</p>
                            <p className="text-xs text-muted-foreground">Network: {chain.name}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="lg:col-span-4">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <Image
                        src={GetAbosolutePathByRelative(order.user_avatar_url, 'avatar')}
                        alt=""
                        width={48}
                        height={48}
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">{order.username}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>
                        {currencySymbol}
                        {order.sub_total_price}
                      </span>
                    </div>
                    {Number(order.total_tax) > 0 && (
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>
                          {currencySymbol}
                          {order.total_tax}
                        </span>
                      </div>
                    )}
                    {Number(order.total_tip) > 0 && (
                      <div className="flex justify-between">
                        <span>Tip</span>
                        <span>
                          {currencySymbol}
                          {order.total_tip}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>
                      {currencySymbol}
                      {order.total_price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {page === 2 && tx && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Complete Payment</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white rounded-2xl shadow">
                      <QRCodeSVG
                        value={getPaymentLink()}
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
                  <p className="text-muted-foreground">
                    Send exactly this amount in one transaction
                  </p>

                  <div className="mt-8">
                    <Button
                      onClick={() => copyToClipboard(tx.blockchain.address)}
                      className="w-full mb-3"
                      variant="outline"
                    >
                      <Copy className="mr-2" /> Copy Address
                    </Button>

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
                        onChange={(e) => setTxid(e.target.value)}
                      />
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setPasteTxId(false)}
                        >
                          Cancel
                        </Button>
                        <Button className="flex-1" onClick={onClickPasteTxId}>
                          Confirm Payment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => setPasteTxId(true)}>
                      Paste Transaction ID
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {page === 3 && (
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
                    className="text-blue-600 hover:underline"
                  >
                    {OmitMiddleString(tx.blockchain.hash)}
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

export default PaymentDetails

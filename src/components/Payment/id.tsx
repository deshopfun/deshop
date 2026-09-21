import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { BLOCKCHAIN, BLOCKCHAINNAMES, CHAINIDS, COINS, CURRENCYS } from '@/packages/constants'
import Image from 'next/image'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useRouter } from 'next/router'
import { useSnackPresistStore } from '@/lib'
import {
  FindChainNamesByChainids,
  FindTokenByChainIdsAndSymbol,
  GetBlockchainTxUrlByChainIds,
} from '@/utils/web3'
import { GetImgSrcByCrypto } from '@/utils/qrcode'
import { OmitMiddleString } from '@/utils/strings'
import WalletConnectButton from '@/components/Button/WalletConnectButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  Copy,
  ExternalLink,
  RotateCw,
  Share2,
  Wallet,
  XCircle,
  Ban,
} from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'
import { useShallow } from 'zustand/react/shallow'
import { TransactionType } from '@/utils/types'

const steps = [
  'Choose Payment Method',
  'Waiting for Payment',
  'Transaction Confirmation',
  'Transaction Complete',
]

// ---- 交易状态映射：按你后端真实枚举调整这几个值 ----
// PENDING：用户还没付款 / 没有 tx hash
// CONFIRMING：链上已经检测到交易，但确认数还不够｜交易进行中，等待双边确认交易配对
// SUCCESS：确认数够了，订单完成｜双方确认交易成功，进行产品交付确认环节
// FAILED：交易失败或出错，需要和成功严格区分，不能和 success 合并映射到同一个终态
const PENDING_TX_STATUS = 'pending'
const CONFIRMING_TX_STATUS = 'pending blockchain'
const SUCCESS_TX_STATUS = 'success'
const FAILED_TX_STATUSES = new Set(['failure', 'error'])

// success failure pending error

// 需要按后端 constant.FinancialStatusToString 实际字符串取值调整
const VOIDED_STATUSES = ['voided']
const REFUNDED_STATUSES = ['refunded', 'partially_refunded']

const POLL_INTERVAL_MS = 10000

// step: 0-3 沿用原有四步；FAILED_STEP 表示"支付失败"这个独立终态，
// 不能再和 3（成功）合并，否则失败交易会被展示成"支付成功"
const FAILED_STEP = -1

function statusToStep(status: string | undefined): number {
  if (status === undefined) return 0
  if (status === SUCCESS_TX_STATUS) return 3
  if (FAILED_TX_STATUSES.has(status)) return FAILED_STEP
  if (status === CONFIRMING_TX_STATUS) return 2
  if (status === PENDING_TX_STATUS) return 1
  return 0
}

function isTerminalStep(step: number) {
  return step === 3 || step === FAILED_STEP
}

const PaymentDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const [activeStep, setActiveStep] = useState(0)
  const [order, setOrder] = useState<any>()
  const [orderClosed, setOrderClosed] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [blockchains, setBlockchains] = useState<BLOCKCHAIN[]>([])
  const [expandedChain, setExpandedChain] = useState<string | null>(null)
  const [pasteTxId, setPasteTxId] = useState<boolean>(false)
  const [txid, setTxid] = useState<string>('')
  const [submittingTxid, setSubmittingTxid] = useState(false)
  const [changingMethod, setChangingMethod] = useState(false)
  const [manualRefreshing, setManualRefreshing] = useState(false)
  const [expired, setExpired] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const activeStepRef = useRef(activeStep)
  useEffect(() => {
    activeStepRef.current = activeStep
  }, [activeStep])

  const init = async (orderId: string, signal?: AbortSignal) => {
    if (!orderId) return

    try {
      const response: any = await axios.get(Http.order_by_id, {
        params: { order_id: Number(orderId) },
        signal,
      })

      if (response.result) {
        setLoadError(false)

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

        // 订单已经被取消/退款：不管交易走到哪一步，都不应该继续展示支付流程，
        // 防止用户在一个已作废的订单上继续转账
        const closed =
          VOIDED_STATUSES.includes(response.data.financial_status) ||
          REFUNDED_STATUSES.includes(response.data.financial_status)
        setOrderClosed(closed)

        if (!closed) {
          const tx =
            response.data.transactions?.find((item: TransactionType) => item.select === 'true') ??
            response.data.transactions?.find(
              (item: TransactionType) => item.transaction_model === 'default'
            )
          setActiveStep(statusToStep(tx?.transaction_status))
        }
      } else {
        setLoadError(true)
        setSnackSeverity('error')
        setSnackMessage(response.message ?? 'Failed to load order')
        setSnackOpen(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

      setLoadError(true)
      setSnackSeverity('error')
      setSnackMessage('Network error occurred')
      setSnackOpen(true)
      console.error(e)
    }
  }

  useAbortableEffect(
    (signal) => {
      if (!router.isReady || !id) return

      init(id, signal)

      const interval = setInterval(() => {
        // 成功和失败都是终态，都要停止轮询，不能只判断 === 3
        if (isTerminalStep(activeStepRef.current)) {
          clearInterval(interval)
          return
        }
        init(id)
      }, POLL_INTERVAL_MS)

      return () => clearInterval(interval)
    },
    [router.isReady, id]
  )

  const onManualRefresh = async () => {
    setManualRefreshing(true)
    await init(id)
    setSnackSeverity('success')
    setSnackMessage('Refresh successful')
    setSnackOpen(true)
    setManualRefreshing(false)
  }

  const onClickBlockchain = async (chainId: number, coin: string) => {
    if (!order) return
    try {
      const res: any = await axios.post(Http.transaction, {
        order_id: order.order_id,
        chain_id: chainId,
        coin,
      })

      if (res.result) {
        await init(id)
      } else {
        setSnackSeverity('error')
        setSnackMessage(res.message ?? 'Failed to select payment method')
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Failed to select payment method')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const onClickPasteTxId = async () => {
    if (!order || !txid.trim() || submittingTxid) return

    setSubmittingTxid(true)
    try {
      const res: any = await axios.post(Http.transaction_paste_tx_id, {
        order_id: order.order_id,
        txid: txid.trim(),
      })

      if (res.result) {
        setSnackSeverity('success')
        setSnackMessage('Transaction submitted')
        setSnackOpen(true)
        setPasteTxId(false)
        setTxid('')
        await init(id)
      } else {
        setSnackSeverity('error')
        setSnackMessage(res.message)
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Failed to submit transaction')
      setSnackOpen(true)
      console.error(e)
    } finally {
      setSubmittingTxid(false)
    }
  }

  const onClickChangeMethod = async () => {
    const currentTx =
      order?.transactions?.find((item: TransactionType) => item.select === 'true') ??
      order?.transactions?.find((item: TransactionType) => item.transaction_model === 'default')

    if (!currentTx) {
      setActiveStep(0)
      return
    }

    setChangingMethod(true)
    try {
      // await axios.post(Http.transaction_cancel, {
      //   order_id: order.order_id,
      //   transaction_id: currentTx.transaction_id,
      // })
    } catch (e) {
      console.error('failed to cancel pending transaction', e)
    } finally {
      setChangingMethod(false)
      setExpandedChain(null)
      setActiveStep(0)
    }
  }

  const copyToClipboard = async (text: string, successMessage = 'Copied successfully') => {
    try {
      await navigator.clipboard.writeText(text)
      setSnackSeverity('success')
      setSnackMessage(successMessage)
      setSnackOpen(true)
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Copy failed, please copy manually')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const onShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareData = {
      title: 'Payment details',
      text: `Payment for order #${order?.order_id ?? ''}`,
      url: shareUrl,
    }

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (e) {
        if ((e as any)?.name !== 'AbortError') console.error(e)
      }
      return
    }

    await copyToClipboard(shareUrl, 'Payment link copied')
  }

  if (loadError && !order) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-muted-foreground">Failed to load payment details.</p>
        <Button variant="outline" onClick={() => init(id)}>
          <RotateCw className="mr-2 w-4 h-4" />
          Retry
        </Button>
      </div>
    )
  }

  if (!order) {
    return <div className="py-20 text-center">Loading payment...</div>
  }

  const currencySymbol = order.currency || 'USD'
  const currencyCode = CURRENCYS.find((c) => c.name === currencySymbol)?.code ?? ''
  const transactions: any[] = order.transactions ?? []
  const tx =
    transactions?.find((item: TransactionType) => item.select === 'true') ??
    transactions?.find((item: TransactionType) => item.transaction_model === 'default')

  const chainName = tx?.blockchain ? FindChainNamesByChainids(tx.blockchain.chain_id) : ''
  const token =
    tx?.blockchain && tx.blockchain.address
      ? FindTokenByChainIdsAndSymbol(tx.blockchain.chain_id as CHAINIDS, tx.blockchain.token as COINS)
      : undefined

  const getPaymentLink = () => {
    // 交易记录或链上地址缺失时不要生成一个残缺的支付链接
    if (!tx?.blockchain?.address) return ''
    const base = `${chainName}:${tx.blockchain.address}`

    if (token?.isMainCoin) {
      return `${base}?amount=${tx.blockchain.crypto_amount}`
    }

    return `${base}?` + `token=${token?.contractAddress}&` + `amount=${tx.blockchain.crypto_amount}`
  }

  // 订单已取消/退款：无论交易走到哪一步，都直接拦住支付流程
  if (orderClosed) {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-4">
          {steps.map((label, index) => (
            <div key={index} className="flex items-center">
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
              {index < steps.length - 1 && <div className="w-12 h-px bg-muted mx-4" />}
            </div>
          ))}
        </div>
      </div>

      {activeStep === 0 && (
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">Choose Payment Method</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {blockchains.map((chain) => {
                const isExpanded = expandedChain === chain.name
                return (
                  <Card key={chain.name} className="overflow-hidden">
                    <button
                      type="button"
                      className="w-full p-5 flex items-center justify-between cursor-pointer hover:bg-muted/50 text-left"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedChain(isExpanded ? null : chain.name)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-xl font-bold">{chain.name}</div>
                        <p className="text-muted-foreground">{chain.desc}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>

                    {isExpanded && (
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
                )
              })}
            </div>

            <div className="lg:col-span-4">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src={GetAbosolutePathByRelative(order.user_avatar_url, 'avatar')}
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">{order.username}</p>
                    </div>
                  </div>

                  <Separator />

                  {order.items?.length > 0 && (
                    <div className="space-y-3">
                      {order.items.map((item: any, idx: number) => (
                        <div key={item.product_id ?? idx} className="flex items-center gap-3">
                          {item.image && (
                            <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 bg-muted">
                              <img
                                src={GetAbosolutePathByRelative(item.image)}
                                alt={item.title}
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.option && `${item.option} · `}Qty {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm shrink-0">
                            {currencyCode}
                            {item.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>
                        {currencyCode}
                        {order.sub_total_price}
                      </span>
                    </div>
                    {Number(order.total_tax) > 0 && (
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>
                          {currencyCode}
                          {order.total_tax}
                        </span>
                      </div>
                    )}
                    {Number(order.total_tip) > 0 && (
                      <div className="flex justify-between">
                        <span>Tip</span>
                        <span>
                          {currencyCode}
                          {order.total_tip}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>
                      {currencyCode}
                      {order.total_price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && tx && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClickChangeMethod}
              disabled={changingMethod}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {changingMethod ? 'Switching...' : 'Change payment method'}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onManualRefresh}
                disabled={manualRefreshing}
                aria-label="Refresh status"
              >
                <RotateCw className={`w-4 h-4 ${manualRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="icon" onClick={onShare} aria-label="Share this payment">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">Complete Payment</h1>

          {expired ? (
            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-muted-foreground">
                  This payment session has expired. Please choose a payment method again.
                </p>
                <Button onClick={onClickChangeMethod} disabled={changingMethod}>
                  Choose again
                </Button>
              </CardContent>
            </Card>
          ) : (
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

                    <div className="mt-8 space-y-3">
                      <Button
                        onClick={() => copyToClipboard(tx.blockchain.address)}
                        className="w-full"
                        variant="outline"
                      >
                        <Copy className="mr-2 w-4 h-4" /> Copy Address
                      </Button>

                      <a href={getPaymentLink()} className="md:hidden block">
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
                          onChange={(e) => setTxid(e.target.value)}
                          disabled={submittingTxid}
                        />
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setPasteTxId(false)}
                            disabled={submittingTxid}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={onClickPasteTxId}
                            disabled={submittingTxid || !txid.trim()}
                          >
                            {submittingTxid ? 'Submitting...' : 'Confirm Payment'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setPasteTxId(true)}
                      >
                        Paste Transaction ID
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}

      {activeStep === 2 && tx && (
        <div className="max-w-2xl mx-auto text-center py-8">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Confirming on the blockchain</h2>
          <p className="text-muted-foreground mb-8">
            We&apos;ve detected your transaction. Please wait for network confirmations — no need to
            pay again.
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
                            (tx.blockchain.confirmations / tx.blockchain.required_confirmations) *
                              100
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

          <Button variant="ghost" className="mt-6" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-1" />
            Share this payment
          </Button>
        </div>
      )}

      {activeStep === FAILED_STEP && tx && (
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

          <Button className="mt-6" onClick={onClickChangeMethod} disabled={changingMethod}>
            {changingMethod ? 'Switching...' : 'Try a different payment method'}
          </Button>
        </div>
      )}

      {activeStep === 3 && (
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

          <Button variant="outline" className="mt-6" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-1" />
            Share receipt
          </Button>
        </div>
      )}
    </div>
  )
}

export default PaymentDetails
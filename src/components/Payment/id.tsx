import { useState } from 'react'
import { CURRENCYS, CHAINIDS, COINS } from '@/packages/constants'
import { useRouter } from 'next/router'
import { useSnackPresistStore } from '@/lib'
import {
  FindChainNamesByChainids,
  FindTokenByChainIdsAndSymbol,
} from '@/utils/web3'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronLeft,
  RotateCw,
  Share2,
} from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { TransactionType } from '@/utils/types'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import {
  FAILED_STEP,
  useOrderPayment,
  usePastePaymentTxId,
  useSelectPaymentMethod,
} from '@/hooks/queries/useOrder'
import PaymentStepper from './PaymentStepper'
import PaymentOrderSummary from './PaymentOrderSummary'
import PaymentMethodPicker from './PaymentMethodPicker'
import PaymentPendingPanel from './PaymentPendingPanel'
import {
  PaymentClosedPanel,
  PaymentConfirmingPanel,
  PaymentFailedPanel,
  PaymentSuccessPanel,
} from './PaymentStatusPanels'

const PaymentDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const queryClient = useQueryClient()

  const [uiActiveStep, setUiActiveStep] = useState<number | null>(null)
  const [expandedChain, setExpandedChain] = useState<string | null>(null)
  const [pasteTxId, setPasteTxId] = useState(false)
  const [txid, setTxid] = useState('')
  const [changingMethod, setChangingMethod] = useState(false)
  const [manualRefreshing, setManualRefreshing] = useState(false)
  const [expired] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const orderQuery = useOrderPayment(id, router.isReady && !!id)
  const selectMethod = useSelectPaymentMethod(id)
  const pasteTx = usePastePaymentTxId(id)
  const order = orderQuery.data?.order
  const blockchains = orderQuery.data?.blockchains ?? []
  const orderClosed = orderQuery.data?.orderClosed ?? false
  const activeStep = uiActiveStep ?? orderQuery.data?.activeStep ?? 0
  const loadError = orderQuery.isError

  const refreshOrder = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.order.detail(id) })
  }

  const onManualRefresh = async () => {
    setManualRefreshing(true)
    await refreshOrder()
    setSnackSeverity('success')
    setSnackMessage('Refresh successful')
    setSnackOpen(true)
    setManualRefreshing(false)
  }

  const onClickBlockchain = async (chainId: number, coin: string) => {
    if (!order) return
    try {
      await selectMethod.mutateAsync({
        order_id: order.order_id,
        chain_id: chainId,
        coin,
      })
      setUiActiveStep(null)
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage(e instanceof Error ? e.message : 'Failed to select payment method')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const submitTxid = async (rawTxid: string) => {
    if (!order || !rawTxid.trim() || pasteTx.isPending) return

    try {
      await pasteTx.mutateAsync({
        order_id: order.order_id,
        txid: rawTxid.trim(),
      })
      setSnackSeverity('success')
      setSnackMessage('Transaction submitted')
      setSnackOpen(true)
      setPasteTxId(false)
      setTxid('')
      setUiActiveStep(null)
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage(e instanceof Error ? e.message : 'Failed to submit transaction')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const onClickPasteTxId = async () => {
    await submitTxid(txid)
  }

  const onWalletTxHash = async (hash: string) => {
    setTxid(hash)
    await submitTxid(hash)
  }

  const onClickChangeMethod = async () => {
    const currentTx =
      order?.transactions?.find((item: TransactionType) => item.select === 'true') ??
      order?.transactions?.find((item: TransactionType) => item.transaction_model === 'default')

    if (!currentTx) {
      setUiActiveStep(0)
      return
    }

    setChangingMethod(true)
    try {
      // cancel API reserved for when backend supports it
    } catch (e) {
      console.error('failed to cancel pending transaction', e)
    } finally {
      setChangingMethod(false)
      setExpandedChain(null)
      setUiActiveStep(0)
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
        if (!(e instanceof Error && e.name === 'AbortError')) console.error(e)
      }
      return
    }

    await copyToClipboard(shareUrl, 'Payment link copied')
  }

  if (loadError && !order) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-muted-foreground">Failed to load payment details.</p>
        <Button variant="outline" onClick={() => refreshOrder()}>
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
  const transactions = order.transactions ?? []
  const tx =
    transactions?.find((item: TransactionType) => item.select === 'true') ??
    transactions?.find((item: TransactionType) => item.transaction_model === 'default')

  const chainName = tx?.blockchain ? FindChainNamesByChainids(tx.blockchain.chain_id) : ''
  const token =
    tx?.blockchain && tx.blockchain.address
      ? FindTokenByChainIdsAndSymbol(tx.blockchain.chain_id as CHAINIDS, tx.blockchain.token as COINS)
      : undefined

  const getPaymentLink = () => {
    if (!tx?.blockchain?.address) return ''
    const base = `${chainName}:${tx.blockchain.address}`

    if (token?.isMainCoin) {
      return `${base}?amount=${tx.blockchain.crypto_amount}`
    }

    return `${base}?` + `token=${token?.contractAddress}&` + `amount=${tx.blockchain.crypto_amount}`
  }

  if (orderClosed) {
    return <PaymentClosedPanel />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PaymentStepper activeStep={activeStep} />

      {activeStep === 0 && (
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">Choose Payment Method</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <PaymentMethodPicker
                blockchains={blockchains}
                expandedChain={expandedChain}
                onToggleChain={setExpandedChain}
                onSelectCoin={onClickBlockchain}
              />
            </div>
            <div className="lg:col-span-4">
              <PaymentOrderSummary order={order} currencyCode={currencyCode} />
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
            <PaymentPendingPanel
              tx={tx}
              paymentLink={getPaymentLink()}
              token={token}
              pasteTxId={pasteTxId}
              txid={txid}
              submittingTxid={pasteTx.isPending}
              onCopyAddress={() => copyToClipboard(tx.blockchain.address)}
              onTogglePaste={setPasteTxId}
              onTxidChange={setTxid}
              onSubmitTxid={onClickPasteTxId}
              onWalletTxHash={onWalletTxHash}
            />
          )}
        </div>
      )}

      {activeStep === 2 && tx && (
        <PaymentConfirmingPanel tx={tx} chainName={chainName} onShare={onShare} />
      )}

      {activeStep === FAILED_STEP && tx && (
        <PaymentFailedPanel
          tx={tx}
          chainName={chainName}
          onRetry={onClickChangeMethod}
          changingMethod={changingMethod}
        />
      )}

      {activeStep === 3 && (
        <PaymentSuccessPanel tx={tx} chainName={chainName} onShare={onShare} />
      )}
    </div>
  )
}

export default PaymentDetails

import { ReactNode, useEffect, useRef, useState } from 'react'
import { TransactionType } from '@/utils/types'
import { CURRENCYS } from '@/packages/constants/currency'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Check, Clock, Copy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  FindChainNamesByChainids,
  GetBlockchainAddressUrlByChainIds,
  GetBlockchainTxUrlByChainIds,
} from '@/utils/web3'
import { CHAINIDS } from '@/packages/constants'
import { getTransactionStatus } from '@/utils/transactionStatus'

export const getStatus = getTransactionStatus

/* ---------------- 工具函数 ---------------- */
export const short = (v: string, head = 6, tail = 4) =>
  v.length > head + tail + 3 ? `${v.slice(0, head)}…${v.slice(-tail)}` : v

// block_timestamp 是毫秒；未上链（pending）时为 0
export const formatTime = (ms?: number) =>
  ms && ms > 0
    ? new Date(ms).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : ''

export const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '—')

export const currencySymbol = (currency: string) => CURRENCYS.find((c) => c.name === currency)?.code ?? ''

const CopyButton = ({ text, onError }: { text: string; onError: () => void }) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      onError()
    }
  }

  return (
    <button
      type="button"
      aria-label="Copy"
      onClick={onCopy}
      className="h-7 w-7 shrink-0 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 flex items-center justify-center transition-colors"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  )
}

const DetailRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:gap-4">
    <span className="text-xs text-muted-foreground sm:w-32 shrink-0 sm:pt-0.5">{label}</span>
    <div className="min-w-0 flex-1 text-sm text-gray-900 break-words">{children}</div>
  </div>
)

// 哈希 / 地址：等宽字体 + 复制 + 区块浏览器链接
const HashValue = ({
  chainId,
  value,
  kind,
  onCopyError,
}: {
  chainId: CHAINIDS
  value: string
  kind: 'tx' | 'address'
  onCopyError: () => void
}) => (
  <div className="flex items-start gap-1">
    <span className="font-mono text-xs break-all flex-1 pt-1.5">{value}</span>
    <CopyButton text={value} onError={onCopyError} />
    {chainId && (
      <a
        href={
          kind === 'tx'
            ? GetBlockchainTxUrlByChainIds(chainId, value)
            : GetBlockchainAddressUrlByChainIds(chainId, value)
        }
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on block explorer"
        title="View on block explorer"
        className="h-7 w-7 shrink-0 rounded-md text-gray-400 hover:bg-gray-100 hover:text-sky-600 flex items-center justify-center transition-colors"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    )}
  </div>
)

export const FilterChip = ({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      'shrink-0 whitespace-nowrap text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-3 sm:py-1.5 rounded-full border transition-colors',
      active
        ? 'bg-sky-500 text-white border-sky-500'
        : 'bg-white text-gray-500 border-gray-200 hover:border-sky-300 hover:text-sky-600'
    )}
  >
    {children}
  </button>
)

export const TransactionDetailDialog = ({
  transaction,
  onClose,
  onCopyError,
}: {
  transaction?: TransactionType
  onClose: () => void
  onCopyError: () => void
}) => {
  const t = transaction
  const chainId = t ? t.blockchain?.chain_id : undefined
  if (!chainId) {
    return
  }
  const chainName = t ? FindChainNamesByChainids(chainId) : undefined
  const status = t ? getStatus(t.transaction_status) : undefined
  const bc = t?.blockchain
  const time = formatTime(bc?.block_timestamp)

  return (
    <Dialog open={!!t} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        {t && status && bc && chainId && (
          <>
            <DialogHeader>
              <DialogTitle>Transaction details</DialogTitle>
              <DialogDescription className="break-all">#{t.transaction_id}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-2 rounded-xl bg-gray-50 py-5 text-center">
              <div
                className={cn(
                  'h-12 w-12 rounded-full flex items-center justify-center',
                  status.iconBg
                )}
              >
                <status.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold tracking-tight tabular-nums">
                {currencySymbol(String(t.currency))}
                {t.amount}{' '}
                <span className="text-sm font-normal text-muted-foreground">
                  {String(t.currency)}
                </span>
              </p>
              <span
                className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-full border',
                  status.className
                )}
              >
                {status.label}
              </span>
            </div>

            {t.transaction_status === 'pending' && !bc.hash && (
              <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  Waiting for the on-chain payment. This status updates after the transfer is
                  confirmed on the network.
                </p>
              </div>
            )}

            <div className="divide-y rounded-xl border px-4">
              <DetailRow label="Paid amount">
                <span className="font-medium tabular-nums">
                  {bc.crypto_amount} {bc.token}
                </span>
              </DetailRow>
              <DetailRow label="Rate">
                <span className="tabular-nums">
                  1 {bc.token} ≈ {bc.rate} {String(t.currency)}
                </span>
              </DetailRow>
              <DetailRow label="Network">
                {chainName}{' '}
                <span className="text-xs text-muted-foreground">(ID {bc.chain_id})</span>
              </DetailRow>
              <DetailRow label="Time">
                {time || <span className="text-muted-foreground">Awaiting confirmation</span>}
              </DetailRow>
              {bc.hash && (
                <DetailRow label="Transaction hash">
                  <HashValue
                    chainId={chainId}
                    value={bc.hash}
                    kind="tx"
                    onCopyError={onCopyError}
                  />
                </DetailRow>
              )}
              {bc.from_address && (
                <DetailRow label="From">
                  <HashValue
                    chainId={chainId}
                    value={bc.from_address}
                    kind="address"
                    onCopyError={onCopyError}
                  />
                </DetailRow>
              )}
              {bc.to_address && (
                <DetailRow label="To">
                  <HashValue
                    chainId={chainId}
                    value={bc.to_address}
                    kind="address"
                    onCopyError={onCopyError}
                  />
                </DetailRow>
              )}
              <DetailRow label="Gateway">{capitalize(t.gateway)}</DetailRow>
              <DetailRow label="Model">{capitalize(t.transaction_model)}</DetailRow>
              <DetailRow label="Source">{capitalize(t.source_name)}</DetailRow>
              {t.message && <DetailRow label="Message">{t.message}</DetailRow>}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}


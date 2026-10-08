import { useSnackPresistStore } from '@/lib'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { TransactionType } from '@/utils/types'
import { CURRENCYS } from '@/packages/constants/currency'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  BadgeDollarSign,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  HelpCircle,
  PackageCheck,
  RefreshCw,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'
import {
  FindChainNamesByChainids,
  GetBlockchainAddressUrlByChainIds,
  GetBlockchainTxUrlByChainIds,
} from '@/utils/web3'
import { CHAINIDS } from '@/packages/constants'

type StatusStyle = { label: string; className: string; iconBg: string; icon: typeof Clock }

const statusConfig: Record<string, StatusStyle> = {
  success: {
    label: 'Success',
    className: 'bg-green-100 text-green-700 border-green-200',
    iconBg: 'bg-green-50 text-green-500',
    icon: CheckCircle2,
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-50 text-amber-500',
    icon: Clock,
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-100 text-red-700 border-red-200',
    iconBg: 'bg-red-50 text-red-500',
    icon: XCircle,
  },
}

// 未知状态也能正常显示，不会崩
const getStatus = (status: string): StatusStyle =>
  statusConfig[status] ?? {
    label: status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown',
    className: 'bg-gray-100 text-gray-600 border-gray-200',
    iconBg: 'bg-gray-100 text-gray-400',
    icon: HelpCircle,
  }

/* ---------------- 工具函数 ---------------- */
const short = (v: string, head = 6, tail = 4) =>
  v.length > head + tail + 3 ? `${v.slice(0, head)}…${v.slice(-tail)}` : v

// block_timestamp 是毫秒；未上链（pending）时为 0
const formatTime = (ms?: number) =>
  ms && ms > 0
    ? new Date(ms).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : ''

const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '—')

const currencySymbol = (currency: string) => CURRENCYS.find((c) => c.name === currency)?.code ?? ''

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

const FilterChip = ({
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

const TransactionDetailDialog = ({
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

const ManageTransaction = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [currentTransaction, setCurrentTransaction] = useState<TransactionType>()
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const init = async () => {
    setLoading(true)
    try {
      const response: any = await axios.get(Http.transaction)
      setTransactions(response.result ? response.data || [] : [])
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    init()
  }, [])

  // 最新的在前（transaction_id 是按时间递增的雪花 ID）
  const sorted = useMemo(
    () => [...transactions].sort((a, b) => Number(b.transaction_id) - Number(a.transaction_id)),
    [transactions]
  )

  // 只展示数据里实际出现过的状态
  const statusCounts = useMemo(() => {
    const map = new Map<string, number>()
    transactions.forEach((t) =>
      map.set(t.transaction_status, (map.get(t.transaction_status) ?? 0) + 1)
    )
    return Array.from(map.entries())
  }, [transactions])

  const visible = useMemo(
    () =>
      activeFilter === 'all' ? sorted : sorted.filter((t) => t.transaction_status === activeFilter),
    [sorted, activeFilter]
  )

  // 当前筛选项的数据消失后（比如刷新后）回到 All
  useEffect(() => {
    if (activeFilter !== 'all' && !statusCounts.some(([s]) => s === activeFilter)) {
      setActiveFilter('all')
    }
  }, [statusCounts, activeFilter])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
            <BadgeDollarSign className="h-4 w-4 text-sky-500" />
          </div>
          <div>
            <h3 className="font-semibold">All Transactions</h3>
            <p className="text-xs text-muted-foreground">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 gap-1.5"
          onClick={init}
          disabled={loading}
        >
          <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

      {/* 状态筛选：手机单行横向滑动，≥sm 自动换行 */}
      {statusCounts.length > 1 && (
        <div
          role="group"
          aria-label="Filter transactions by status"
          className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
        >
          <FilterChip active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
            All ({transactions.length})
          </FilterChip>
          {statusCounts.map(([status, count]) => (
            <FilterChip
              key={status}
              active={activeFilter === status}
              onClick={() => setActiveFilter(status)}
            >
              {getStatus(status).label} ({count})
            </FilterChip>
          ))}
        </div>
      )}

      {loading && transactions.length === 0 ? (
        <div className="flex flex-col gap-4" aria-busy>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : visible.length > 0 ? (
        <div className="flex flex-col gap-3 sm:gap-4">
          {visible.map((item) => {
            const status = getStatus(item.transaction_status)
            const StatusIcon = status.icon
            const chainName = FindChainNamesByChainids(item.blockchain?.chain_id)
            const time = formatTime(item.blockchain?.block_timestamp)
            const symbol = currencySymbol(String(item.currency))

            return (
              <Card
                key={item.transaction_id}
                role="button"
                tabIndex={0}
                onClick={() => setCurrentTransaction(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setCurrentTransaction(item)
                  }
                }}
                className="border-0 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                  <div
                    className={cn(
                      'h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full flex items-center justify-center',
                      status.iconBg
                    )}
                  >
                    <StatusIcon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-base sm:text-lg tabular-nums truncate">
                        {symbol}
                        {item.amount}{' '}
                        <span className="text-xs font-normal text-muted-foreground">
                          {String(item.currency)}
                        </span>
                      </p>
                      <span
                        className={cn(
                          'text-xs font-semibold px-2 py-1 rounded-full border shrink-0',
                          status.className
                        )}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-0.5 truncate">
                      {item.blockchain?.crypto_amount} {item.blockchain?.token} · {chainName}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      <span>{time || 'Awaiting confirmation'}</span>
                      {item.blockchain?.hash && (
                        <span className="font-mono">{short(item.blockchain.hash, 8, 6)}</span>
                      )}
                      <span className="hidden sm:inline truncate">#{item.transaction_id}</span>
                    </div>
                  </div>

                  <ChevronRight className="hidden sm:block h-4 w-4 shrink-0 text-gray-300" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <PackageCheck className="h-8 w-8 text-gray-300" />
          </div>
          <div>
            <p className="font-semibold text-gray-700">
              {transactions.length === 0 ? 'No transactions yet' : 'No matching transactions'}
            </p>
            {transactions.length > 0 && (
              <button
                type="button"
                className="mt-1 text-sm text-sky-600 hover:underline"
                onClick={() => setActiveFilter('all')}
              >
                Show all
              </button>
            )}
          </div>
        </div>
      )}

      <TransactionDetailDialog
        transaction={currentTransaction}
        onClose={() => setCurrentTransaction(undefined)}
        onCopyError={() => showError('Copy failed. Please copy it manually.')}
      />
    </div>
  )
}

export default ManageTransaction

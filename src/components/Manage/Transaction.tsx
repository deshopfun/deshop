import { useSnackPresistStore } from '@/lib'
import { useEffect, useMemo, useState } from 'react'
import { TransactionType } from '@/utils/types'
import { useManageTransactions } from '@/hooks/queries/useManage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BadgeDollarSign,
  ChevronRight,
  PackageCheck,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'
import { FindChainNamesByChainids } from '@/utils/web3'
import {
  FilterChip,
  TransactionDetailDialog,
  currencySymbol,
  formatTime,
  getStatus,
  short,
} from './TransactionParts'

const ManageTransaction = () => {
  const [currentTransaction, setCurrentTransaction] = useState<TransactionType>()
  const [activeFilter, setActiveFilter] = useState('all')
  const transactionsQuery = useManageTransactions()
  const transactions = useMemo(
    () => transactionsQuery.data ?? [],
    [transactionsQuery.data]
  )
  const loading = transactionsQuery.isLoading

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

  useEffect(() => {
    if (transactionsQuery.isError) {
      showError(
        (transactionsQuery.error as Error)?.message || 'Network error. Please try again later.'
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionsQuery.isError, transactionsQuery.error])

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
          onClick={() => void transactionsQuery.refetch()}
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

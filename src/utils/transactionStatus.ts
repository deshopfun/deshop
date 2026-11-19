import { Clock, CheckCircle2, HelpCircle, XCircle, type LucideIcon } from 'lucide-react'

export type TransactionStatusStyle = {
  label: string
  className: string
  iconBg: string
  icon: LucideIcon
}

const statusConfig: Record<string, TransactionStatusStyle> = {
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

/** Unknown statuses still render safely. */
export function getTransactionStatus(status: string): TransactionStatusStyle {
  return (
    statusConfig[status] ?? {
      label: status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown',
      className: 'bg-gray-100 text-gray-600 border-gray-200',
      iconBg: 'bg-gray-100 text-gray-400',
      icon: HelpCircle,
    }
  )
}

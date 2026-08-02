import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  collapsed?: boolean
}

const SidebarFooter = ({ collapsed = false }: Props) => {
  return (
    <div className={cn('p-3 border-t border-gray-100', collapsed && 'px-2')}>
      <Button
        className={cn(
          'h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2',
          collapsed ? 'w-full px-0' : 'w-full'
        )}
        title="Create Product"
        onClick={() => {
          window.location.href = '/create'
        }}
      >
        <Plus className="h-5 w-5 shrink-0" />
        {!collapsed && <span>Create Product</span>}
      </Button>
    </div>
  )
}

export default SidebarFooter

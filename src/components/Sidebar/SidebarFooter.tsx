import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const SidebarFooter = () => {
  return (
    <div className="p-4 border-t border-gray-100">
      <Button
        className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
        onClick={() => {
          window.location.href = '/create';
        }}
      >
        <Plus className="h-5 w-5" />
        Create Product
      </Button>
    </div>
  );
};

export default SidebarFooter;

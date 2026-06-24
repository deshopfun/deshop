import { Button } from '@/components/ui/button';

export function SiteLogo() {
  return (
    <Button
      variant="ghost"
      className="h-auto p-1.5 hover:bg-sky-50 rounded-xl transition-all duration-200"
      onClick={() => {
        window.location.href = '/';
      }}
    >
      <div className="flex flex-row items-center gap-2">
        <div
          className="
          w-9 h-9 rounded-lg flex items-center justify-center
          bg-gradient-to-br from-blue-600 to-sky-400
          shadow-md shadow-sky-200
          text-white text-xl font-bold
          select-none
        "
        >
          D
        </div>

        <span
          className="
          font-extrabold text-lg tracking-wide
          bg-gradient-to-r from-blue-600 to-sky-400
          bg-clip-text text-transparent
          select-none
        "
        >
          DESHOP
        </span>
      </div>
    </Button>
  );
}

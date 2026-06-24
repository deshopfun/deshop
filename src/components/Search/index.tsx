import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, X } from 'lucide-react';

const Search = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = () => {
    if (!search.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(search)}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex items-center w-full max-w-md">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for product..."
          className="h-11 pl-10 pr-9 text-base rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <Button
        onClick={handleSearch}
        className="h-11 px-6 text-base rounded-l-none bg-sky-500 hover:bg-sky-600 text-white"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;

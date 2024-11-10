// app/components/dashboard/SearchBar.tsx
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Search quotes..."
        className="pl-10 bg-white/50 dark:bg-gray-800/50 border-amber-200/20 focus:border-amber-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
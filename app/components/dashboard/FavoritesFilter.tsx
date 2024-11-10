// app/components/dashboard/FavoritesFilter.tsx
import { Button } from "@/app/components/ui/button";
import { HeartIcon } from "lucide-react";

interface FavoritesFilterProps {
  value: boolean;
  onToggle: () => void;
}

export function FavoritesFilter({ value, onToggle }: FavoritesFilterProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={`
        font-sans text-sm border-2 
        ${value 
          ? 'border-amber-500 text-amber-500 bg-amber-50/50 dark:bg-amber-500/10' 
          : 'border-amber-200/20 hover:border-amber-500/50'
        }
        transition-all duration-300 hover:scale-[1.02]
      `}
    >
      <HeartIcon className="h-4 w-4 mr-2" fill={value ? 'currentColor' : 'none'} />
      Favorites
    </Button>
  );
}
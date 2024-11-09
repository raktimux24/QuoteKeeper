// src/components/dashboard/FavoritesFilter.tsx
import { Button } from "@/app/components/ui/button";
import { Heart } from "lucide-react";

interface FavoritesFilterProps {
  value: boolean;
  onToggle: () => void;
}

export const FavoritesFilter = ({ value, onToggle }: FavoritesFilterProps) => (
  <Button
    variant="outline"
    onClick={onToggle}
    className={`border-amber-200/20 ${
      value ? 'bg-amber-100 dark:bg-amber-500/10' : ''
    }`}
  >
    <Heart 
      className={`h-4 w-4 mr-2 ${
        value ? 'text-amber-500 fill-current' : 'text-gray-400'
      }`} 
    />
    Favorites
  </Button>
);
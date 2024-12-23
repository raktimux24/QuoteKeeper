// app/components/dashboard/CategoryFilter.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFilterProps {
  value: string;
  onCategoryChange: (value: string) => void;
}

// Define categories based on PRD requirements
const CATEGORIES = [
  { value: 'motivation', label: 'Motivation' },
  { value: 'life', label: 'Life' },
  { value: 'success', label: 'Success' },
  { value: 'wisdom', label: 'Wisdom' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'happiness', label: 'Happiness' }
] as const;

export function CategoryFilter({ value, onCategoryChange }: CategoryFilterProps) {
  return (
    <Select 
      value={value} 
      onValueChange={onCategoryChange}
      defaultValue="all"
    >
      <SelectTrigger className="w-[180px] bg-white border-amber-200/20">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="all">All Categories</SelectItem>
        {CATEGORIES.map(category => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
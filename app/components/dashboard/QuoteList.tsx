// app/components/dashboard/QuoteList.tsx
import { QuoteCard } from "./QuoteCard";
import type { Quote } from '@/lib/types/quote';

interface QuoteListProps {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isLoading?: boolean;
}

export function QuoteList({ 
  quotes, 
  onEdit, 
  onDelete, 
  onToggleFavorite,
  isLoading 
}: QuoteListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading quotes...
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No quotes found. Add your first quote!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
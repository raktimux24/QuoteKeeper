// app/components/dashboard/QuoteCard.tsx
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Heart, Pencil, Trash2 } from "lucide-react";
import type { Quote } from '@/lib/types/quote';

interface QuoteCardProps {
  quote: Quote;
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function QuoteCard({ quote, onEdit, onDelete, onToggleFavorite }: QuoteCardProps) {
  return (
    <Card className="relative group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <p className="font-serif text-lg text-gray-800 dark:text-gray-200">&ldquo;{quote.text}&rdquo;</p>
            <p className="text-sm text-amber-600 dark:text-amber-400">- {quote.author}</p>
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              {quote.category}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(quote.id)}
              className={`hover:bg-amber-100 dark:hover:bg-amber-500/10 ${
                quote.favorite ? 'text-amber-500' : 'text-gray-400'
              }`}
            >
              <Heart className="h-4 w-4" fill={quote.favorite ? 'currentColor' : 'none'} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(quote)}
              className="hover:bg-amber-100 dark:hover:bg-amber-500/10 text-gray-400"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(quote.id)}
              className="hover:bg-amber-100 dark:hover:bg-amber-500/10 text-gray-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
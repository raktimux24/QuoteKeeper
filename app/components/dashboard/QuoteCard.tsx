// app/components/dashboard/QuoteCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button, ButtonProps } from "@/components/ui/button";
import { HeartIcon, PencilIcon, Trash2Icon } from "lucide-react";
import type { Quote } from '@/lib/types/quote';

interface QuoteCardProps {
  quote: Quote;
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function QuoteCard({ quote, onEdit, onDelete, onToggleFavorite }: QuoteCardProps) {
  return (
    <Card className="relative group bg-white/50 backdrop-blur-sm border-amber-200/20">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <p className="font-serif text-lg text-gray-800">&ldquo;{quote.text}&rdquo;</p>
            <p className="text-sm text-amber-600">- {quote.author}</p>
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-amber-100/50 text-amber-600">
              {quote.category}
            </span>
          </div>
          <div 
            className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Quote actions"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(quote.id)}
              className={`hover:bg-amber-100/50 ${
                quote.favorite ? 'text-amber-500' : 'text-gray-400'
              }`}
              aria-label={quote.favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon className="h-4 w-4" fill={quote.favorite ? 'currentColor' : 'none'} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(quote)}
              className="hover:bg-amber-100/50 text-gray-400"
              aria-label="Edit quote"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(quote.id)}
              className="hover:bg-amber-100/50 text-gray-400"
              aria-label="Delete quote"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
// app/components/dashboard/QuoteForm.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Quote, QuoteFormData } from '@/lib/types/quote';

interface QuoteFormProps {
  quote?: Quote | null;
  onSubmit: (data: QuoteFormData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

const CATEGORIES = [
  'Motivation',
  'Life',
  'Success',
  'Love',
  'Wisdom',
  'Other'
];

export function QuoteForm({ quote, onSubmit, onClose, isLoading }: QuoteFormProps) {
  const [text, setText] = useState(quote?.text || '');
  const [author, setAuthor] = useState(quote?.author || '');
  const [category, setCategory] = useState(quote?.category || CATEGORIES[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: QuoteFormData = {
      text,
      author,
      category,
    };

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Quote Text</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the quote text"
          required
          className="font-sans text-sm bg-white/50 dark:bg-gray-800/50 border-amber-200/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter the author's name"
          required
          className="font-sans text-sm bg-white/50 dark:bg-gray-800/50 border-amber-200/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="font-sans text-sm bg-white/50 dark:bg-gray-800/50 border-amber-200/20">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="font-sans text-sm border-amber-200/20"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-amber-500 hover:bg-amber-600 text-white font-sans text-sm"
        >
          {isLoading ? 'Saving...' : quote ? 'Update Quote' : 'Add Quote'}
        </Button>
      </div>
    </form>
  );
}
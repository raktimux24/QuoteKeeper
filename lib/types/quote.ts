// app/lib/types/quote.ts

export interface QuoteFormData {
  text: string;
  author: string;
  category: string;
}

export interface Quote extends QuoteFormData {
  id: string;
  userId: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
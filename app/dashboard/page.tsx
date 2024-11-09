// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { QuoteForm } from "@/app/components/dashboard/QuoteForm";
import { QuoteList } from "@/app/components/dashboard/QuoteList";
import { SearchBar } from "@/app/components/dashboard/SearchBar";
import { CategoryFilter } from "@/app/components/dashboard/CategoryFilter";
import { FavoritesFilter } from "@/app/components/dashboard/FavoritesFilter";
import { addQuoteToFirebase, updateQuoteInFirebase, deleteQuoteFromFirebase, toggleQuoteFavorite, getQuotesForUser, getFilteredQuotes } from '@/lib/firebase/quotes';
import type { Quote, QuoteFormData } from '@/lib/types/quote';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/providers/auth-provider';

export default function DashboardPage() {
  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    favoritesOnly: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  // Authentication check effect
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Fetch quotes effect
  useEffect(() => {
    const fetchQuotes = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const fetchedQuotes = await getFilteredQuotes(
          user.uid,
          filters.search,
          filters.category,
          filters.favoritesOnly
        );
        setQuotes(fetchedQuotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch quotes",
          variant: "destructive",
        });
        setQuotes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, [user, filters, toast]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      router.push('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const handleAddQuote = async (data: QuoteFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add quotes",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await addQuoteToFirebase(user.uid, data);
      
      // Refresh quotes list
      const updatedQuotes = await getFilteredQuotes(
        user.uid,
        filters.search,
        filters.category,
        filters.favoritesOnly
      );
      setQuotes(updatedQuotes);
      
      toast({
        title: "Success",
        description: "Quote added successfully",
      });
      setIsAddQuoteOpen(false);
    } catch (error) {
      console.error('Error adding quote:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add quote",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateQuote = async (data: QuoteFormData) => {
    if (!editingQuote) return;
    try {
      setIsSubmitting(true);
      await updateQuoteInFirebase(editingQuote.id, data);
      toast({
        title: "Success",
        description: "Quote updated successfully",
      });
      setEditingQuote(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quote",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuote = async (id: string) => {
    try {
      await deleteQuoteFromFirebase(id);
      setQuotes(prev => prev.filter(quote => quote.id !== id));
      toast({
        title: "Success",
        description: "Quote deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete quote",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const quote = quotes.find(q => q.id === id);
    if (!quote) return;

    try {
      await toggleQuoteFavorite(id, quote.favorite);
      setQuotes(prev => prev.map(q => 
        q.id === id ? { ...q, favorite: !q.favorite } : q
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 dark:border-amber-400"></div>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900">
      {/* Grid Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 128, 35, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 128, 35, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />

      <div className="relative z-10">
        {/* Header - Added sticky positioning */}
        <header className="sticky top-0 border-b-2 border-amber-200/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400">
                Quote Keeper
              </h1>
              <div className="flex items-center gap-2">
                {/* Add Quote Button */}
                <Dialog open={isAddQuoteOpen} onOpenChange={setIsAddQuoteOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Quote</DialogTitle>
                    </DialogHeader>
                    <QuoteForm
                      onSubmit={handleAddQuote}
                      onClose={() => setIsAddQuoteOpen(false)}
                      isLoading={isSubmitting}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/10"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Filters Section - Removed Add Quote button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex-1 w-full md:w-auto">
              <SearchBar 
                onSearch={(value) => setFilters(prev => ({ ...prev, search: value }))}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <CategoryFilter 
                value={filters.category}
                onCategoryChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              />
              <FavoritesFilter
                value={filters.favoritesOnly}
                onToggle={() => setFilters(prev => ({ ...prev, favoritesOnly: !prev.favoritesOnly }))}
              />
            </div>
          </div>

          {/* Quotes List */}
          <QuoteList
            quotes={quotes}
            onEdit={setEditingQuote}
            onDelete={handleDeleteQuote}
            onToggleFavorite={handleToggleFavorite}
            isLoading={isLoading}
          />
        </main>
      </div>

      {/* Edit Quote Dialog */}
      <Dialog open={editingQuote !== null} onOpenChange={() => setEditingQuote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Quote</DialogTitle>
          </DialogHeader>
          <QuoteForm
            quote={editingQuote}
            onSubmit={handleUpdateQuote}
            onClose={() => setEditingQuote(null)}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
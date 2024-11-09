// app/lib/firebase/quotes.ts

import { db } from './config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  orderBy,
  getDoc
} from 'firebase/firestore';
import type { Quote, QuoteFormData } from '@/lib/types/quote';

// Create a new quote
export const addQuoteToFirebase = async (userId: string, data: QuoteFormData): Promise<void> => {
  try {
    // First verify user exists
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    await addDoc(collection(db, 'quotes'), {
      ...data,
      userId,
      favorite: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding quote:', error);
    throw error;
  }
};

// Get all quotes for a user
export const getQuotesForUser = async (userId: string): Promise<Quote[]> => {
  try {
    const q = query(
      collection(db, 'quotes'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Quote[];
  } catch (error) {
    console.error('Error getting quotes:', error);
    throw error;
  }
};

// Update an existing quote
export const updateQuoteInFirebase = async (quoteId: string, data: QuoteFormData): Promise<void> => {
  try {
    const quoteRef = doc(db, 'quotes', quoteId);
    await updateDoc(quoteRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating quote:', error);
    throw error;
  }
};

// Delete a quote
export const deleteQuoteFromFirebase = async (quoteId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'quotes', quoteId));
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};

// Toggle favorite status
export const toggleQuoteFavorite = async (quoteId: string, currentStatus: boolean): Promise<void> => {
  try {
    const quoteRef = doc(db, 'quotes', quoteId);
    await updateDoc(quoteRef, {
      favorite: !currentStatus,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

// Get filtered quotes
export const getFilteredQuotes = async (
  userId: string,
  search: string = '',
  category: string = 'all',
  favoritesOnly: boolean = false
): Promise<Quote[]> => {
  try {
    // Start with base query for userId only
    const q = query(
      collection(db, 'quotes'),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    let quotes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Quote[];

    // Apply filters in memory
    if (category !== 'all') {
      quotes = quotes.filter(quote => quote.category === category);
    }

    if (favoritesOnly) {
      quotes = quotes.filter(quote => quote.favorite);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      quotes = quotes.filter(quote => 
        quote.text.toLowerCase().includes(searchLower) ||
        quote.author.toLowerCase().includes(searchLower)
      );
    }

    // Sort by createdAt in memory
    quotes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return quotes;
  } catch (error) {
    console.error('Error getting filtered quotes:', error);
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('You do not have permission to access these quotes');
      }
    }
    throw error;
  }
};
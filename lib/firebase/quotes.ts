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
  searchTerm: string = '',
  category: string = 'all',
  favoritesOnly: boolean = false
): Promise<Quote[]> => {
  try {
    // Basic query without ordering first
    let baseQuery = query(
      collection(db, 'quotes'),
      where('userId', '==', userId)
    );

    let quotes: Quote[] = [];
    
    try {
      // Try to get quotes with ordering
      const orderedQuery = query(
        collection(db, 'quotes'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(orderedQuery);
      quotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Quote[];
    } catch (error) {
      // If ordered query fails, fallback to unordered
      console.warn('Temporarily using unordered query while index is being created');
      const snapshot = await getDocs(baseQuery);
      quotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Quote[];
      
      // Sort manually if server ordering failed
      quotes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // Apply filters in memory
    return quotes.filter(quote => {
      // Category filter
      if (category && category !== 'all' && quote.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesText = quote.text.toLowerCase().includes(search);
        const matchesAuthor = quote.author.toLowerCase().includes(search);
        const matchesCategory = quote.category.toLowerCase().includes(search);
        return matchesText || matchesAuthor || matchesCategory;
      }

      // Favorites filter
      if (favoritesOnly && !quote.favorite) {
        return false;
      }

      return true;
    });
  } catch (error) {
    console.error('Error getting filtered quotes:', error);
    throw error;
  }
};
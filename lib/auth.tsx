import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { auth, db } from './firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface User extends FirebaseUser {
  defaultCategory?: string;
  emailNotifications?: boolean;
  updatedAt?: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        
        // Merge Firebase user with Firestore data
        setUser({
          ...firebaseUser,
          defaultCategory: userData?.defaultCategory,
          emailNotifications: userData?.emailNotifications,
          updatedAt: userData?.updatedAt?.toDate(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
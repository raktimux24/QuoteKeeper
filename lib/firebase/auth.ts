import { 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create/update user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      profilePicUrl: user.photoURL || null,
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Only set createdAt if it's a new document
      ...(user.metadata.creationTime ? {
        createdAt: new Date(user.metadata.creationTime).toISOString()
      } : {})
    }, { merge: true }); // merge: true prevents overwriting existing data

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signUpWithEmail = async (
  email: string, 
  password: string, 
  name: string
): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email: result.user.email,
      displayName: name,
      profilePicUrl: null,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Add any additional user metadata you want to store
      authProvider: 'email',
      emailVerified: result.user.emailVerified
    });

    return result.user;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp(),
      emailVerified: result.user.emailVerified // Update verification status
    }, { merge: true });

    return result.user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}; 
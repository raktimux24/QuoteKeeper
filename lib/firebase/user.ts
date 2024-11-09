import { db } from './config';
import { doc, updateDoc } from 'firebase/firestore';

interface UserProfileUpdate {
  displayName?: string;
  defaultCategory?: string;
  emailNotifications?: boolean;
}

export async function updateUserProfile(userId: string, data: UserProfileUpdate) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date(),
  });
} 
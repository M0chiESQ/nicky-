/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
        // Setup snapshot listener for real-time profile updates
        const unsubProfile = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            setProfile({ id: docSnap.id, ...docSnap.data() } as User);
          } else {
            // Create initial profile if it doesn't exist
            const initialProfile: Omit<User, 'id'> & { uid: string } = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Traveler',
              username: firebaseUser.email?.split('@')[0] || 'traveler',
              avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${firebaseUser.uid}`,
              bio: 'Setting off on a new adventure... 🪄',
              followers: 0,
              following: 0,
              adventures: 0,
              badges: []
            };
            try {
              await setDoc(userDocRef, { ...initialProfile, updatedAt: serverTimestamp() });
              // The onSnapshot will trigger again and set the profile
            } catch (error) {
              handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
            }
          }
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
          setLoading(false);
        });

        return () => unsubProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, profile, loading };
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUser({ ...user, ...userDoc.data() });
          setPoints(userDoc.data().points || 0);
        } else {
          // Create new user document
          const newUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            points: 0,
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', user.uid), newUser);
          setUser({ ...user, ...newUser });
        }
        // Load user sessions
        const sessionsQuery = query(
          collection(db, 'sessions'),
          where('userId', '==', user.uid),
          orderBy('startTime', 'desc')
        );
        const sessionsSnapshot = await getDocs(sessionsQuery);
        setSessions(sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setUser(null);
        setPoints(0);
        setSessions([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updatePoints = async (newPoints) => {
    if (!user) return;
    setPoints(newPoints);
    await updateDoc(doc(db, 'users', user.uid), { points: newPoints });
  };

  const addSession = async (sessionData) => {
    if (!user) return;
    const session = {
      userId: user.uid,
      startTime: new Date().toISOString(),
      endTime: null,
      pointsEarned: 0,
      focusPercentage: 0,
      ...sessionData
    };
    const docRef = await addDoc(collection(db, 'sessions'), session);
    setSessions(prev => [{ id: docRef.id, ...session }, ...prev]);
    return docRef.id;
  };

  const updateSession = async (sessionId, updates) => {
    if (!user) return;
    await updateDoc(doc(db, 'sessions', sessionId), updates);
    setSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, ...updates } : session
    ));
  };

  return (
    <UserContext.Provider value={{
      user,
      points,
      sessions,
      loading,
      updatePoints,
      addSession,
      updateSession
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
} 
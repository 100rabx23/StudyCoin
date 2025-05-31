import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc
} from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    console.log("Setting up onAuthStateChanged...");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("onAuthStateChanged fired:", firebaseUser);

      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setPoints(userData.points || 0);
        } else {
          await setDoc(userRef, { points: 0 });
        }
      } else {
        setUser(null);
        setPoints(0);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updatePoints = async (newPoints) => {
    if (!user) return;
    setPoints(newPoints);
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { points: newPoints });
  };

  const addSession = async (session) => {
    if (!user) return null;
    const sessionRef = await addDoc(
      collection(db, "users", user.uid, "sessions"),
      session
    );
    return sessionRef.id;
  };

  const updateSession = async (updatedSession) => {
    if (!user || !updatedSession.id) return;
    const sessionDoc = doc(db, "users", user.uid, "sessions", updatedSession.id);
    await updateDoc(sessionDoc, updatedSession);
  };

  return (
    <UserContext.Provider
      value={{ user, loading, points, updatePoints, addSession, updateSession }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

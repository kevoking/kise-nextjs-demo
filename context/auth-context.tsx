"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  configured: false,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(auth && isFirebaseConfigured));

  useEffect(() => {
    if (!auth || !isFirebaseConfigured) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading, configured: isFirebaseConfigured }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

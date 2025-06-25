"use client";

import { useUser as useClerkUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthMode = "clerk" | "local";

type AuthState = {
  userId: string | null;
  mode: AuthMode;
  name: string | null;
  localSignIn: (name: string) => void;
  localSignOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [mode, setMode] = useState<AuthMode>("clerk");
  const { user: clerkUser } = useClerkUser();
  const router = useRouter();

  useEffect(() => {
    if (clerkUser) {
      setUserId(clerkUser.id);
      setName(clerkUser.fullName ?? clerkUser.username ?? "User");
      setMode("clerk");
    } else {
      const local = localStorage.getItem("local_user");
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setUserId(parsed.id);
          setName(parsed.name);
          setMode("local");
        } catch {
          setUserId(null);
          setName(null);
          setMode("clerk");
        }
      }
    }
  }, [clerkUser]);

  const localSignIn = (username: string) => {
    const id = `local-${btoa(username).slice(0, 12)}`;
    const localUser = { name: username, id };
    localStorage.setItem("local_user", JSON.stringify(localUser));
    setUserId(id);
    setName(username);
    setMode("local");
    router.refresh(); // in case you depend on auth state in SSR
  };

  const localSignOut = () => {
    if (mode === "local") {
      localStorage.removeItem("local_user");
      setUserId(null);
      setName(null);
      setMode("clerk");
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        name,
        mode,
        localSignIn,
        localSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

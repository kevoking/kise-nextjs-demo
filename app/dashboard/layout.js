"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export default function DashboardLayout({ children }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (configured && !loading && !user) {
      router.replace("/auth");
    }
  }, [configured, loading, user, router]);

  if (!configured) {
    return (
      <main style={{ padding: "2rem" }}>
        Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values, then return to <Link href="/auth">auth</Link>.
      </main>
    );
  }

  if (loading) {
    return <main style={{ padding: "2rem" }}>Checking authentication...</main>;
  }

  if (!user) {
    return (
      <main style={{ padding: "2rem" }}>
        Redirecting to login... <Link href="/auth">Go now</Link>
      </main>
    );
  }

  return children;
}

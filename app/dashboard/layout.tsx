"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (configured && !loading && !user) {
      router.replace("/auth");
    }
  }, [configured, loading, user, router]);

  if (!configured) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-12">
        <p className="text-pretty text-lg text-slate-700">
          Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values, then return to <Link href="/auth" className="font-medium text-blue-700 underline underline-offset-4">auth</Link>.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center px-6 text-slate-700">Checking authentication...</main>
    );
  }

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center px-6 text-slate-700">
        Redirecting to login...{" "}
        <Link href="/auth" className="font-medium text-blue-700 underline underline-offset-4">
          Go now
        </Link>
      </main>
    );
  }

  return <>{children}</>;
}

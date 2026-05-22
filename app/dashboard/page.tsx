"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!auth) {
      return;
    }

    setLoading(true);

    try {
      await signOut(auth);
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_60%_98%))] px-6 py-14">
      <Card className="w-full max-w-2xl border-slate-200/80 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl tracking-tight">Dashboard</CardTitle>
          <CardDescription>This protected area is available only to authenticated users.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-slate-700">
            You are signed in as: <span className="font-semibold text-slate-900">{user?.email ?? "unknown"}</span>
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3">
          <Button variant="destructive" onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/chat">Chat</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

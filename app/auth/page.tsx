"use client";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "login" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const { user, loading: authLoading, configured } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ( !auth) {
      setError("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values in .env.local.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      router.replace("/dashboard");
    } catch (submitError: unknown) {
      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError("Unable to authenticate.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-6 py-14">
      <Card className="w-full max-w-md border-slate-200/80 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Login" : "Sign up"}</CardTitle>
          <CardDescription>
            Authenticate with your Firebase email/password account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>

            {!configured && (
              <p className="text-sm text-red-600">
                Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* values in <code>.env.local</code>.
              </p>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={loading || !configured}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </Button>

            <Button
              variant="ghost"
              type="button"
              onClick={() => setMode((currentMode) => (currentMode === "login" ? "signup" : "login"))}
            >
              {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <Link href="/" className="text-sm font-medium text-blue-700 underline underline-offset-4">
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

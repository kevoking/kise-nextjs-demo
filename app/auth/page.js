"use client";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";
import styles from "./page.module.css";

export default function AuthPage() {
  const router = useRouter();
  const { user, loading: authLoading, configured } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!configured || !auth) {
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
    } catch (submitError) {
      setError(submitError.message || "Unable to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1>{mode === "login" ? "Login" : "Sign up"}</h1>

        <label className={styles.field}>
          Email
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          Password
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>

        {!configured && (
          <p className={styles.error}>
            Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* values in <code>.env.local</code>.
          </p>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.primaryButton} type="submit" disabled={loading || !configured}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>

        <button
          className={styles.textButton}
          type="button"
          onClick={() => setMode((currentMode) => (currentMode === "login" ? "signup" : "login"))}
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>

        <Link href="/" className={styles.backLink}>
          Back to home
        </Link>
      </form>
    </main>
  );
}

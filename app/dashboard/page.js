"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";

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
    <main style={{ minHeight: "100vh", padding: "2rem", display: "grid", placeItems: "center" }}>
      <section
        style={{
          width: "min(100%, 640px)",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "2rem",
          display: "grid",
          gap: "1rem",
          background: "#fff",
        }}
      >
        <h1>Dashboard</h1>
        <p>You are signed in as: {user?.email}</p>
        <p>This is a protected area only for authenticated users.</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "0.65rem 1rem",
              background: "#dc2626",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
          <Link href="/" style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0.65rem 1rem" }}>
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}

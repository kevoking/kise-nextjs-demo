import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1>Welcome to the Kise Demo App</h1>
        <p>A simple Next.js App Router app with Firebase authentication.</p>
        <div className={styles.actions}>
          <Link href="/auth" className={styles.primaryButton}>
            Login / Sign up
          </Link>
          <Link href="/dashboard" className={styles.secondaryButton}>
            Go to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

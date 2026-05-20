import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,hsl(210_80%_88%/.5),transparent_42%),radial-gradient(circle_at_80%_0%,hsl(165_80%_85%/.45),transparent_35%),linear-gradient(180deg,hsl(0_0%_100%),hsl(215_55%_97%))]" />

      <Card className="w-full max-w-2xl border-slate-200/70 bg-white/80 shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900">
            <ShieldCheck className="size-4" />
            Firebase Auth Demo
          </div>
          <CardTitle className="text-balance text-4xl leading-tight tracking-tight text-slate-900">
            Welcome to the Kise Demo App
          </CardTitle>
          <CardDescription className="text-base text-slate-600">
            A clean App Router example using TypeScript, Tailwind CSS v4, and shadcn UI components.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed text-slate-600">
            Sign in with email and password, then access a protected dashboard route that is only available to authenticated users.
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="group">
            <Link href="/auth">
              Login / Sign up
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

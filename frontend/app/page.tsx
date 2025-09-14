"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = { k: string; title: string; meta: string; body: string };

const SLIDES: Slide[] = [
  {
    k: "match",
    title: "Match found",
    meta: "forged/matcher • now",
    body: "Alex joined prisma-express to implement pagination on /issues.",
  },
  {
    k: "issue",
    title: "Issue claimed",
    meta: "good-first-issue • 2m",
    body: "“Add CI for Node 20” picked by Priya — est. 25 mins.",
  },
  {
    k: "merge",
    title: "PR merged",
    meta: "review • 8m",
    body: "Docs navigation refactor merged after 2 checks passed.",
  },
];

function SpotlightRail() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);
  const slide = SLIDES[i];

  return (
    <aside className="md:sticky md:top-24">
      <div className="rounded-2xl border border-zinc-200 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">Live snapshot</span>
          <span className="h-2 w-2 rounded-full bg-zinc-400" />
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-zinc-500">Projects</div>
            <div className="font-medium">1,248</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500">Open issues</div>
            <div className="font-medium">9,731</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500">This week</div>
            <div className="font-medium">3,562</div>
          </div>
        </div>

        <div className="mt-6 h-px bg-zinc-200" />

        {/* Auto-cycling spotlight */}
        <div className="mt-6">
          <div className="text-xs uppercase tracking-wider text-zinc-500">
            Spotlight
          </div>
          <div
            key={slide.k}
            className="mt-3 rounded-xl border border-zinc-200 p-4 transition-all duration-500"
          >
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
              {slide.meta}
            </div>
            <h4 className="mt-2 text-sm font-semibold">{slide.title}</h4>
            <p className="mt-1.5 text-sm text-zinc-700 leading-relaxed">
              {slide.body}
            </p>
          </div>

          {/* Minimal pager dots */}
          <div className="mt-3 flex gap-1.5">
            {SLIDES.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-6 bg-zinc-800" : "w-2 bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 text-[11px] text-zinc-500">
          Activity shown is representative sample data.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="mt-6 flex items-center justify-center">
        <Link
          href="/#features"
          className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-black"
          aria-label="Scroll to features"
        >
          Explore features
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 14l-5-5h10l-5 5z" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}

export default function PublicHome() {
  return (
    <div className="min-h-screen bg-white text-black scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-semibold tracking-tight text-xl">
                Forged
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/#home" className="text-zinc-700 hover:text-black">
                  Home
                </Link>
                <Link
                  href="/#features"
                  className="text-zinc-700 hover:text-black"
                >
                  Features
                </Link>
                <Link href="/#about" className="text-zinc-700 hover:text-black">
                  About
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="px-3 py-2 text-sm font-medium text-zinc-800 hover:text-black"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-zinc-900 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Home */}
      <section
        id="home"
        className="mx-auto max-w-6xl px-4 py-24 md:py-28 scroll-mt-24"
        aria-label="Home"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-12">
          <div className="md:col-span-7">
            <p className="uppercase tracking-widest text-xs text-zinc-500 mb-3">
              Open Source, Organized
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Match maintainers and contributors—without the chaos.
            </h1>
            <p className="mt-5 text-lg text-zinc-700 max-w-2xl">
              Forged helps maintainers find the right contributors and helps
              developers discover meaningful projects—fast.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/sign-up"
                className="px-5 py-3 rounded-lg bg-black text-white font-medium hover:bg-zinc-900 transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="/sign-in"
                className="px-5 py-3 rounded-lg border border-zinc-300 text-black font-medium hover:bg-zinc-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Attention-drawing right rail */}
          <div className="md:col-span-5">
            <SpotlightRail />
          </div>
        </div>

        {/* Gentle divider & scroll nudge */}
        <div className="mt-16 md:mt-20 flex items-center justify-center">
          <div className="h-px w-full max-w-3xl bg-zinc-200" />
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-zinc-200 bg-white scroll-mt-24"
        aria-label="Features"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Why Forged?
            </h2>
            <p className="mt-3 text-zinc-700">
              Focus on building. We handle the matchmaking and coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50 transition-colors">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 14a4 4 0 10-8 0m12 4v-1a5 5 0 00-5-5H9a5 5 0 00-5 5v1m12-11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Find Contributors</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Surface contributors whose skills and interests match your
                roadmap—not just whoever comments first.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50 transition-colors">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h6M4 14h10M4 18h8"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Manage Projects</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Curate issues, tag good first tasks, and keep momentum without
                living in ten different tools.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50 transition-colors">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Build Together</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Ship faster with aligned collaborators and clear expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-zinc-200 bg-white scroll-mt-24"
        aria-label="About"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                About Forged
              </h2>
              <p className="mt-4 text-zinc-700 leading-relaxed">
                Forged is a platform that connects maintainers and contributors
                so open-source work feels coordinated, not chaotic. Set clear
                expectations, surface the right tasks, and build together.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-zinc-200 p-6">
                <h3 className="text-lg font-semibold">What we value</h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                  <li>• Clarity over noise</li>
                  <li>• Momentum over backlog</li>
                  <li>• Contributors, not just commits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Soft nudge to CTA */}
          <div className="mt-16 flex items-center justify-center">
            <Link
              href="/#cta"
              className="text-sm text-zinc-600 underline underline-offset-4 hover:text-black"
            >
              See how to get started
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Ready to get started?
          </h2>
          <p className="mt-3 text-zinc-700">
            Join developers already building the future of open-source.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/sign-up"
              className="px-5 py-3 rounded-lg bg-black text-white font-medium hover:bg-zinc-900 transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/sign-in"
              className="px-5 py-3 rounded-lg border border-zinc-300 text-black font-medium hover:bg-zinc-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between text-sm text-zinc-600">
          <span>© {new Date().getFullYear()} Forged</span>
          <div className="flex items-center gap-4">
            <Link href="/#about" className="hover:text-black">
              About
            </Link>
            <Link href="/#features" className="hover:text-black">
              Features
            </Link>
            <Link href="/#home" className="hover:text-black">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const errorMessageMap: Record<string, string> = {
  OAuthSignin: "Error connecting to the provider. Please try again.",
  OAuthCallback: "Error during callback from the provider. Please try again.",
  OAuthCreateAccount: "Could not create an account with the provider.",
  EmailCreateAccount: "Could not create an email account.",
  CallbackRouteError: "Authentication callback failed. Please try again.",
  EmailSignin: "Email sign-in failed. Please try again.",
  CredentialsSignin: "Invalid credentials.",
  OAuthAccountNotLinked:
    "This email is already linked with a different sign-in method.",
  AccessDenied: "Access denied. Please contact support if this persists.",
  Verification: "Verification failed or expired.",
  Default: "Something went wrong. Please try again.",
};

export default function SignInPage() {
  const searchParams = useSearchParams();
  const errorKey = searchParams.get("error") ?? "";
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = errorKey
    ? errorMessageMap[errorKey] ?? errorMessageMap.Default
    : "";

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("github", {
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        setIsLoading(false);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto max-w-md px-4 py-16">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Sign in to Forged
          </h1>
          <p className="text-sm text-zinc-600">
            New here?{" "}
            <Link
              href="/sign-up"
              className="underline underline-offset-4 hover:no-underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Error (accessible live region) */}
        {errorMessage ? (
          <div
            className="mt-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-sm font-medium text-red-900">Sign-in error</p>
            <p className="mt-1 text-sm text-red-800">{errorMessage}</p>
          </div>
        ) : null}

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-zinc-200 p-6">
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-black bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {isLoading ? "Signing in..." : "Continue with GitHub"}
          </button>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs uppercase tracking-wider text-zinc-500">
                  Tips
                </span>
              </div>
            </div>
          </div>

          {/* Tips / Small print */}
          <ul className="mt-6 space-y-3 text-sm text-zinc-700">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-800" />
              Use the same GitHub you contribute from to sync repos and issues.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-800" />
              We only request permissions needed for auth and project linking.
            </li>
          </ul>
        </div>

        {/* Subtle footer link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-zinc-600 underline underline-offset-4 hover:text-black"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

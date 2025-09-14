import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">OpenBoard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A platform that matches open-source maintainers with contributors. 
            Find your next project or discover talented developers to collaborate with.
          </p>
          
          {session ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Welcome back, {session.user?.name || session.user?.email}!
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/dashboard"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/organizations"
                  className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Organizations
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link
                href="/sign-in"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { auth } from "../../../lib/auth";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/home" className="text-xl font-bold text-blue-600">
              OpenBoard
            </Link>
            <div className="flex space-x-6">
              <Link
                href="/home"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/organizations"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Organizations
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/settings"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {session?.user?.name || session?.user?.email}
            </span>
            <form
              action={async () => {
                "use server";
                const { signOut } = await import("../../../lib/auth");
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

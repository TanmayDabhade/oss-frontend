import { auth } from "@/lib/auth";
import { getUserOrganizations } from "../organizations/actions";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  const organizations = await getUserOrganizations();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                OpenBoard
              </Link>
              <div className="flex space-x-6">
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
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {session?.user?.name || session?.user?.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  const { signOut } = await import("@/lib/auth");
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's an overview of your organizations and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Organizations */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Organizations</h2>
              <Link
                href="/organizations/new"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Create New
              </Link>
            </div>
            
            {organizations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No organizations yet</p>
                <Link
                  href="/organizations/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Organization
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {organizations.slice(0, 3).map((org) => (
                  <Link
                    key={org.id}
                    href={`/organizations/${org.slug}`}
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{org.name}</h3>
                        <p className="text-sm text-gray-500">
                          {org._count.members} members • {org._count.projects} projects
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatRelativeTime(org.createdAt)}
                      </span>
                    </div>
                  </Link>
                ))}
                {organizations.length > 3 && (
                  <Link
                    href="/organizations"
                    className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2"
                  >
                    View all {organizations.length} organizations
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/organizations/new"
                className="block w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Create Organization</div>
                <div className="text-sm text-gray-500">Set up a new organization</div>
              </Link>
              <Link
                href="/projects/new"
                className="block w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Create Project</div>
                <div className="text-sm text-gray-500">Start a new project</div>
              </Link>
              <Link
                href="/organizations"
                className="block w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Manage Organizations</div>
                <div className="text-sm text-gray-500">View and edit your organizations</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

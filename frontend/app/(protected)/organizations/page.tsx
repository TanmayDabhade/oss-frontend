import { getUserOrganizations } from "./actions";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import Navigation from "../_components/Navigation";

export default async function OrganizationsPage() {
  const organizations = await getUserOrganizations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600 mt-2">
            Manage your organizations and collaborate with teams
          </p>
        </div>
        <Link
          href="/organizations/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Organization
        </Link>
      </div>

      {organizations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No organizations yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first organization to start collaborating with your team
          </p>
          <Link
            href="/organizations/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Organization
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <Link
              key={org.id}
              href={`/organizations/${org.slug}`}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {org.name}
                  </h3>
                  {org.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {org.description}
                    </p>
                  )}
                </div>
                {org.ownerId === org.owner.id && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Owner
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{org._count.members} members</span>
                  <span>{org._count.projects} projects</span>
                </div>
                <span>{formatRelativeTime(org.createdAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

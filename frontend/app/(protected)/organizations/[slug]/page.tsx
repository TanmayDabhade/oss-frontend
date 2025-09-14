import { getOrganizationBySlug } from "../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import Navigation from "../../_components/Navigation";

interface OrganizationPageProps {
  params: {
    slug: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  try {
    const organization = await getOrganizationBySlug(params.slug);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{organization.name}</h1>
              {organization.description && (
                <p className="text-gray-600 mt-2">{organization.description}</p>
              )}
              {organization.website && (
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                >
                  {organization.website}
                </a>
              )}
            </div>
            <Link
              href={`/organizations/${organization.slug}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Organization
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            Created {formatRelativeTime(organization.createdAt)} by {organization.owner.name}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
              
              {organization.projects.length === 0 ? (
                <div className="text-center py-8">
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No projects yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first project to get started
                  </p>
                  <Link
                    href="/projects/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Project
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {organization.projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {project.name}
                          </h3>
                          {project.description && (
                            <p className="text-gray-600 text-sm mb-2">
                              {project.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Created {formatRelativeTime(project.createdAt)}</span>
                            <span>by {project.owner.name}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.visibility === "PUBLIC" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {project.visibility}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Members</h2>
              
              <div className="space-y-3">
                {organization.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {member.user.image ? (
                        <img
                          src={member.user.image}
                          alt={member.user.name || "User"}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">
                          {member.user.name?.charAt(0) || "?"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {member.user.name || "Unknown User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {member.role} • Joined {formatRelativeTime(member.joinedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization Info</h2>
              
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="text-sm text-gray-900">
                    {formatRelativeTime(organization.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Members</dt>
                  <dd className="text-sm text-gray-900">
                    {organization.members.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Projects</dt>
                  <dd className="text-sm text-gray-900">
                    {organization.projects.length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load organization:", error);
    notFound();
  }
}

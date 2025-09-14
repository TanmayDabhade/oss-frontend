import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "../../_components/Navigation";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // For now, this is a placeholder page
  // In a real implementation, you would fetch the project data using the ID
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
        >
          ← Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Project Details</h1>
        <p className="text-gray-600 mt-2">
          Project ID: {params.id}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
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
            Project not found
          </h3>
          <p className="text-gray-600 mb-6">
            This project doesn't exist or you don't have access to it.
          </p>
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

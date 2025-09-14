import { getOrganizationBySlug, updateOrganization } from "../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "../../../_components/Navigation";

interface EditOrganizationPageProps {
  params: {
    slug: string;
  };
}

export default async function EditOrganizationPage({ params }: EditOrganizationPageProps) {
  try {
    const organization = await getOrganizationBySlug(params.slug);
    
    async function handleSubmit(formData: FormData) {
      "use server";
      
      try {
        await updateOrganization(params.slug, formData);
      } catch (error) {
        console.error("Failed to update organization:", error);
        // In a real app, you'd want to show this error to the user
        // For now, we'll just log it
      }
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <Link
            href={`/organizations/${organization.slug}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Organization
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Organization</h1>
          <p className="text-gray-600 mt-2">
            Update your organization details
          </p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={organization.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter organization name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={organization.description || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your organization (optional)"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              defaultValue={organization.website || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com (optional)"
            />
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Link
              href={`/organizations/${organization.slug}`}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Organization
            </button>
          </div>
        </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load organization:", error);
    notFound();
  }
}
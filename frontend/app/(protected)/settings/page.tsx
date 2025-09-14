import { auth } from "@/lib/auth";
import Navigation from "../_components/Navigation";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="text-sm text-gray-900">
                {session?.user?.name || "Not provided"}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="text-sm text-gray-900">
                {session?.user?.email || "Not provided"}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub ID
              </label>
              <div className="text-sm text-gray-900">
                {session?.user?.id || "Not available"}
              </div>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Sign Out
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Sign out of your account on this device
              </p>
              <form
                action={async () => {
                  "use server";
                  const { signOut } = await import("@/lib/auth");
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About OpenBoard</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Version
              </h3>
              <div className="text-sm text-gray-900">
                0.1.0
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Description
              </h3>
              <div className="text-sm text-gray-900">
                A platform that matches open-source maintainers with contributors
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

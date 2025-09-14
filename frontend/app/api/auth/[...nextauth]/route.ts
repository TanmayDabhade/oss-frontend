import { handlers } from "../../../../lib/auth";

export const { GET, POST } = handlers;

// Add error handling for debugging
export async function OPTIONS() {
  return new Response(null, { status: 200 });
}

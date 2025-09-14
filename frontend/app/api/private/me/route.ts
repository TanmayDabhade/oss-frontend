// app/api/private/me/route.ts
import { auth } from "@/auth"; // or "@/lib/auth" if you re-exported there
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // avoid static caching

export async function GET(_req: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Return just what you need
  const { user } = session;
  return Response.json({
    ok: true,
    user: {
      name: user?.name ?? null,
      email: user?.email ?? null,
      image: user?.image ?? null,
    },
  });
}

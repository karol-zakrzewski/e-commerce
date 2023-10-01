import { authOptions } from "@/lib/auth/tools";
import { getServerSession } from "next-auth/next";
import type { NextRequest } from "next/server";

export default async function Protected(req: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-2 p-4">
      <div>
        {session !== null ? (
          <h1 className="text-accent font-extrabold leading-loose">
            Hi {session.user?.email}!
          </h1>
        ) : (
          <a className="btn btn-primary" href="/api/auth/signin">
            Sign in
          </a>
        )}
      </div>
    </div>
  );
}

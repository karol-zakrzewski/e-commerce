import { authOptions } from "@/api/auth/tools";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw Error();
    }

    return Response.json(session);
  } catch (error) {
    return Response.json(null);
  }
}

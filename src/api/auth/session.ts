import { Session } from "next-auth";
import { headers } from "next/headers";

export const getSession = async (): Promise<Session | null> => {
  try {
    const res = await fetch(`/api/session`, {
      method: "GET",
      headers: headers(),
    });

    const session = await res.json();

    if (!session) {
      throw new Error();
    }

    return session;
  } catch (error) {
    return null;
  }
};

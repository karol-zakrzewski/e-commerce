import { ResponseApi } from "@/api/types";
import { User } from "@/components/auth/types";

export const signIn = async ({
  email,
  password,
}: Pick<User, "email" | "password">): Promise<
  ResponseApi.Error | ResponseApi.Success<User & { id: string }>
> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const { data, success, error } = await res.json();
    console.log("🚀  data, success, error:", data, success, error);
    if (error || !success) {
      throw new Error(data.msg);
    }

    return { data, success: true, error: null };
  } catch (error) {
    return {
      data: null,
      success: false,
      error: "Something went wrong with sign in",
    };
  }
};

export const signUp = async (
  user: User,
): Promise<ResponseApi.Error | ResponseApi.Success<User>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
    );

    const data = await res.json();

    if (!data || !data.success) {
      throw new Error(data.msg);
    }

    return { data, success: true, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, success: false, error: error.message };
    }
    return {
      data: null,
      success: false,
      error: "Something went wrong with get cart",
    };
  }
};

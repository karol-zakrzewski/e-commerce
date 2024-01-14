import { useSearchParams } from "next/navigation";

export const useHandleQueryError = () => {
  const params = useSearchParams();
  const errorParam = params.get("error");
  const errorMessage = errorParam ? "Failed to sign in" : undefined;

  return { signIn: { message: errorMessage } };
};

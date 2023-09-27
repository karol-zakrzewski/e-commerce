import { Product } from "@/lib/products/types";

export const addToCart = async (event: any) => {
  event.preventDefault();
  const formData = event.target;
  const password = formData.password.value;
  const email = formData.email.value;

  return { name: "formdata" };
};

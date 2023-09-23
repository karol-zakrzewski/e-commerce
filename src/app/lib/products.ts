import axios from "axios";

export const getProducts = async () => {
  return await axios
    .get("https://gf-ecommerce.vercel.app/api/products")
    .then((data) => {
      return {
        success: true,
        data: data.data,
        error: null,
      };
    })
    .catch((error) => {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    });
};

import { JOINING_TYPE } from "@/api/products/const";
import { Product } from "@/api/products/types";

export const getJoiningType = (material: string) => {
  return material === "PVC-U" ? JOINING_TYPE.CEMENT : JOINING_TYPE.FUSION;
};

export const getVariantDimension = (product: Product, code: number): string => {
  return product.variants.reduce((acc, variant) => {
    if (variant.code !== code) {
      return acc;
    }

    const [mainDimensions] = variant.dimensions;

    return mainDimensions.standard + mainDimensions.nominal;
  }, "");
};

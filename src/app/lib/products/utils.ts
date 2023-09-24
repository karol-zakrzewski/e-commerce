import { JOINING_TYPE } from "@/app/lib/products/const";

export const getJoiningType = (material: string) => {
  return material === "PVC-U" ? JOINING_TYPE.CEMENT : JOINING_TYPE.FUSION;
};

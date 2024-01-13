import { colorsMap } from "@/components/shapes/consts";
import { Color } from "@/components/shapes/types";

type CircleProps = {
  color: Color;
};

export const Circle = ({ color }: CircleProps) => {
  return <div className={`h-40 w-40 rounded-full ${colorsMap[color]}`}></div>;
};

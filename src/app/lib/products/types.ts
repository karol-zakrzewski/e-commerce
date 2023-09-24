type Dimension = {
  standard: string;
  nominal: string;
};

type Seal = "FKM" | "EPDM" | "PTFE";

type Material = "PVC-U" | "PP-H" | "PE" | "PVDF";

type ProductVariant = {
  code: number;
  price: number;
  dimensions: Dimension[];
  seal?: Seal;
  actuator?: {
    typo: string;
    source: string;
  };
  stock: number;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  images: string[];
  isAvailable: boolean;
  material: Material;
  endType: "mufowe" | "króciec" | "kołnierzowe";
  variants: ProductVariant[];
};

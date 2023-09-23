import { Banner } from "@/app/components/banner/Banner";
import { ProductsList } from "@/app/components/productsList";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Banner />
      <ProductsList />
    </div>
  );
}

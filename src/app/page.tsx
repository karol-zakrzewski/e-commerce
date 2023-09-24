import { Banner } from "@/app/components/banner/Banner";
import { ProductsList } from "@/app/components/products";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Banner />

      <section className="flex flex-col gap-6 p-6">
        <h2 className="text-center text-4xl">Products</h2>
        <ProductsList />
      </section>
    </div>
  );
}

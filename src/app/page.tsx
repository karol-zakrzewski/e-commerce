import { Banner } from "@/app/components/banner/Banner";
import { ProductsList } from "@/app/components/products";

export default function Home() {
  return (
    <div>
      <Banner />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-6 p-6">
        <h2 className="text-center text-4xl">Produkty</h2>
        <ProductsList />
      </section>
    </div>
  );
}

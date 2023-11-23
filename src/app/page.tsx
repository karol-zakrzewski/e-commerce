import { Banner } from "@/components/banner/Banner";
import { ProductsList } from "@/components/products";
import Comobox from "@/components/ui/Comobox";
import { getProducts } from "@/lib/products";
import Script from "next/script";

export default async function Home() {
  const { data: products, error, success } = await getProducts();

  if (!success) {
    return <div>Error: {error} </div>;
  }

  return (
    <div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`}
      />
      <Banner />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-6 p-6">
        <h2 className="text-center text-4xl">Produkty</h2>
        <Comobox />
        <ProductsList products={products} />
      </section>
    </div>
  );
}

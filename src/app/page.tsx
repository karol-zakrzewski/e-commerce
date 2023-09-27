import { Banner } from "@/components/banner/Banner";
import { ProductsList } from "@/components/products";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const { data: products, error, success } = await getProducts();

  if (!success) {
    return <div>Error: {error} </div>;
  }

  return (
    <div>
      <Banner />
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-6 p-6">
        <h2 className="text-center text-4xl">Produkty</h2>

        <ProductsList products={products} />
      </section>
    </div>
  );
}

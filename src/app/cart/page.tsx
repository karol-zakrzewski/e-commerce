import { CartItem } from "@/components/products/CartItem";
import { getUserCart } from "@/lib/cart";
import { getVariantDimension } from "@/lib/products/utils";
import { redirect } from "next/navigation";

const GetCart = async () => {
  const { data, success } = await getUserCart();

  if (!success) {
    redirect("/");
  }

  return (
    <div>
      <h2 className="text-center text-2xl">Koszyk</h2>
      <ul>
        {data.products.map(({ product, productVariants }) => {
          return (
            <li
              key={product._id}
              className="m-4 w-fit gap-4  rounded-lg border p-4  shadow-lg"
            >
              <div>
                <h3>{product.name}</h3>
                <div className="divide-y divide-brand-orange">
                  {productVariants.map(({ code, count, price }) => {
                    const dimension = getVariantDimension(product, code);

                    return (
                      <CartItem
                        code={code}
                        count={count}
                        dimension={dimension}
                        price={price}
                        key={code}
                        productId={product._id}
                      />
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GetCart;

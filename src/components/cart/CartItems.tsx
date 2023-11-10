import { CartItem } from "@/components/cart/CartItem";
import { Cart } from "@/lib/cart/types";
import { getVariantDimension } from "@/lib/products/utils";
import { ResponseApi } from "@/lib/types";
import { redirect } from "next/navigation";

type Props = {
  getUserCart: () => Promise<ResponseApi.Error | ResponseApi.Success<Cart>>;
};

export const CartItems = async ({ getUserCart }: Props) => {
  const { data, success } = await getUserCart();

  if (!success) {
    redirect("/");
  }

  return (
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
  );
};

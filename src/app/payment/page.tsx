import { getOrder, updateOrderPayment } from "@/api/order/server";
import { Card } from "@/components/Card";
import { SuccessHeader } from "@/components/payment/SuccessHeader";
import Image from "next/image";

type PaymentProps = {
  searchParams: Record<"orderId" | "status", string>;
};

const Payment = async ({ searchParams }: PaymentProps) => {
  const orderId = searchParams.orderId;
  const paymentStatus = searchParams.status;
  const orderData = await getOrder(orderId);

  if (!orderData.success || paymentStatus === "error") {
    const alternativeErrorMessage = "Something went wrong";
    throw Error(orderData.error ?? alternativeErrorMessage);
  }

  const order = orderData.data;

  const { success, data } = await updateOrderPayment({
    orderId: order.id,
    paymentSessionId: order.payment.id,
  });

  if (!success) {
    return <div>Error</div>;
  }

  return (
    <div className="flex h-container w-full flex-col items-center justify-center gap-4 bg-slate-50">
      <SuccessHeader />
      <Card>
        {data.products.map(({ product, productVariants }) => {
          // TODO: fetch and write to file on the pre dev and build
          const categoriesMap: Record<string, string> = {
            valve: "Zawory kulowe",
            elbow: "Kolana",
          };
          return (
            <div key={product._id} className="aspect-4/3 flex gap-4 py-4">
              <Image
                width={100}
                height={100}
                src={product.images[0]}
                alt={product.name}
              />
              <div>
                <h2 className="text-lg font-bold">
                  {categoriesMap[product.category]}
                </h2>
                <h3>{product.name}</h3>
                <ul>
                  {productVariants.map(({ code, count, price }) => {
                    return (
                      <li key={code}>
                        {code} - {count} szt. - {count * price} zł
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Payment;

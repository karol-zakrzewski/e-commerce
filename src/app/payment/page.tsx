"use client";
import { getOrder } from "@/api/order";
import { Button } from "@/components/form/Button";

const Payment = ({ searchParams }: any) => {
  return (
    <div>
      Payment - {searchParams.status}
      <Button
        onClick={async () => {
          const order = await getOrder();
        }}
      >
        get order
      </Button>
    </div>
  );
};

export default Payment;

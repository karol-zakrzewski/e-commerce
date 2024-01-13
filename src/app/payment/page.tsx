"use client";
import { Button } from "@/components/form/Button";
import { handleCheckPayment } from "@/api/payment";

const Payment = ({ searchParams }: any) => {
  console.log(searchParams);

  return (
    <div>
      Payment - {searchParams.status}
      <Button
        onClick={async () => {
          const x = await handleCheckPayment();
          console.log("🚀  x:", x);
        }}
      >
        Check payment
      </Button>
    </div>
  );
};

export default Payment;

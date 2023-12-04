import React from "react";

const Payment = ({ searchParams }: any) => {
  console.log(searchParams);

  return <div>Payment - {searchParams.status}</div>;
};

export default Payment;

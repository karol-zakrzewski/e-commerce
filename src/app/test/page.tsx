"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function ClientSideRoot(): any {
  const { data: session } = useSession();
  console.log("🚀  session:", session);

  const [shown, setShown] = useState<boolean>(false);
  const clickHandler = (): void => {
    setShown(!shown);
  };

  return (
    <div className="grid grid-cols-2 p-4 ">
      <div>
        <h1 className="">Hi {session?.user?.email}!</h1>
      </div>
      <div>
        <p>Protected client page</p>
        <button className="" onClick={clickHandler}>
          Toggle
        </button>
        {shown ? <pre>{JSON.stringify(session, null, 2)}</pre> : null}
      </div>
    </div>
  );
}

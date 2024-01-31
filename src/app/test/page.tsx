import { Combobox } from "@/components/Combobox";
import React from "react";

const TestPage = () => {
  return (
    <div>
      <Combobox
        label="Ulica*"
        value={"value"}
        // error={error?.message}
        // loadOptions={async (query) => await fetchUsers(query)}
      />

      <div className="h-screen w-full bg-green-200"></div>
    </div>
  );
};

export default TestPage;

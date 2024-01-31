"use client";
import { Combobox } from "@/components/Combobox";
import React from "react";

const fetchUsers = async (query: string) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json();

  const options = data.map((user: any) => {
    return {
      label: user.name,
      value: user.address,
    };
  });

  return options;
};

const TestPage = () => {
  return (
    <div>
      <Combobox
        label="Ulica*"
        value={"value"}
        // error={error?.message}
        loadOptions={async (query) => await fetchUsers(query)}
        onChange={async (value) => {}}
      />

      <div className="h-screen w-full bg-green-200"></div>
    </div>
  );
};

export default TestPage;

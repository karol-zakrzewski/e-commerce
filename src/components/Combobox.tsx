"use client";
import { Combobox as ComboboxHeadlessUi, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, forwardRef, useState } from "react";

type Place = {
  label: string;
  value: any;
};

type Props = {
  type?: "default" | "ecommerce" | "registration";
  label: string;
  value: any | null;
  onInputChange?: () => void;
  error?: string;
  noOptionsMessage?: string;
  disabled?: boolean;
  // loadOptions: (value: string) => Promise<Place[]>;
};

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

const variantMap = {
  ecommerce: {
    border: "darkGray",
    height: "lg",
    rounded: "lg",
  },
  registration: {
    rounded: "sm",
    border: "black",
    height: "lg",
  },
  default: {
    border: "gray",
    height: "sm",
    rounded: "lg",
  },
} as const;

let filterTimeout: NodeJS.Timeout;

export const Combobox = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      type = "default",
      label,
      value,
      error,
      onInputChange,
      noOptionsMessage,
      disabled,
      // loadOptions,
    } = props;

    const [places, setPlaces] = useState<Place[]>([]);

    const variant = variantMap[type];

    const debounce = (callback: () => Promise<void>, delay = 500) => {
      clearTimeout(filterTimeout);

      filterTimeout = setTimeout(async () => {
        await callback();
      }, delay);

      return filterTimeout;
    };

    return (
      <div className="flex flex-col">
        <ComboboxHeadlessUi
          disabled={disabled}
          value={value}
          onChange={() => {}}
        >
          <ComboboxHeadlessUi.Label className="font-semibold">
            {label}
          </ComboboxHeadlessUi.Label>
          <div className="relative z-10 mt-2">
            <ComboboxHeadlessUi.Input
              ref={ref}
              autoComplete="off"
              className={"border border-red-500 bg-gray-200"}
              displayValue={(place: any) =>
                place.street
                  ? `ul. ${place.street} ${place.houseNumber}, ${place.zipCode} ${place.city}`
                  : ""
              }
              onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                if (onInputChange) {
                  onInputChange();
                }

                debounce(async () => {
                  const data = await fetchUsers(event.target.value);

                  setPlaces(data);
                });
              }}
            />

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ComboboxHeadlessUi.Options className={"bg-blue-200"}>
                {places.length === 0 ? (
                  <div className="relative select-none px-4 py-2">
                    {noOptionsMessage ? noOptionsMessage : "Brak wyników."}
                  </div>
                ) : (
                  places.map((place, index) => (
                    <ComboboxHeadlessUi.Option
                      key={place.label + index}
                      className={({ active }) =>
                        `relative cursor-default select-none px-4 py-2 ${
                          active
                            ? "bg-brand-NIEBIESKI text-white"
                            : "text-gray-900"
                        }`
                      }
                      value={place.value}
                    >
                      <span
                        className={`block truncate ${
                          value ? "font-medium" : "font-normal"
                        }`}
                      >
                        {place.label}
                      </span>
                    </ComboboxHeadlessUi.Option>
                  ))
                )}
              </ComboboxHeadlessUi.Options>
            </Transition>
          </div>
        </ComboboxHeadlessUi>
        {error && (
          <span className="nunito-normal-14 text-brand-red mt-3 block w-full">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";

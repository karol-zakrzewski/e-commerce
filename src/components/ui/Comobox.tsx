"use client";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useEffect, useRef, useState } from "react";
import { Combobox as ComboboxHeadlessUi, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, forwardRef } from "react";

type Props = {
  label: string;
  // value: any | null;
  onInputChange?: () => void;
  error?: string;
  noOptionsMessage?: string;
  disabled?: boolean;
  // loadOptions: (value: string) => Promise<Place[]>;
};

let filterTimeout: NodeJS.Timeout;

export const Combobox = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      label,
      error,
      onInputChange,
      noOptionsMessage,
      disabled,
      // loadOptions,
    } = props;

    const {
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        language: "pl",
        componentRestrictions: {
          country: "pl",
        },
        types: ["address"],
      },
    });

    const [selectedPlace, setSelectedPlace] =
      useState<google.maps.places.AutocompletePrediction | null>(null);

    const debounce = (callback: () => Promise<void>, delay = 500) => {
      clearTimeout(filterTimeout);

      filterTimeout = setTimeout(async () => {
        await callback();
      }, delay);

      return filterTimeout;
    };

    return (
      <>
        <div className="flex flex-col">
          <ComboboxHeadlessUi
            onChange={(place) => {
              setSelectedPlace(place);
              clearSuggestions();
            }}
            disabled={disabled}
            value={selectedPlace}
          >
            <ComboboxHeadlessUi.Label className="font-semibold">
              {label}
            </ComboboxHeadlessUi.Label>
            <div className="relative z-10 mt-2">
              <ComboboxHeadlessUi.Input
                ref={ref}
                autoComplete="off"
                className="left-6 w-full rounded-lg border border-gray-500 py-2 pl-3 pr-10 font-semibold focus:border-blue-400 focus:outline-none focus:ring-0 disabled:bg-gray-100 disabled:opacity-60"
                displayValue={(
                  place: google.maps.places.AutocompletePrediction,
                ) => {
                  return place ? place.description : "";
                }}
                onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                  if (onInputChange) {
                    onInputChange();
                  }

                  debounce(async () => {
                    // const data = await loadOptions(event.target.value);
                    setValue(event.target.value);
                    // setPlaces(data);
                  });
                }}
              />

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ComboboxHeadlessUi.Options className="absolute mt-3 max-h-60 w-full overflow-auto rounded-lg border-gray-500 bg-white py-1 ring-1 ring-blue-400 focus:outline-none">
                  {data.length === 0 ? (
                    <div className="relative select-none px-4 py-2">
                      {noOptionsMessage ? noOptionsMessage : "Brak wyników."}
                    </div>
                  ) : (
                    data.map((place, index) => (
                      <ComboboxHeadlessUi.Option
                        key={place.place_id + index}
                        className={({ active }) =>
                          `relative cursor-default select-none px-4 py-2 ${
                            active ? "bg-blue-400 text-white" : "text-gray-900"
                          }`
                        }
                        value={place}
                      >
                        <span
                          className={`block truncate ${
                            value ? "font-medium" : "font-normal"
                          }`}
                        >
                          {place.description}
                        </span>
                      </ComboboxHeadlessUi.Option>
                    ))
                  )}
                </ComboboxHeadlessUi.Options>
              </Transition>
            </div>
          </ComboboxHeadlessUi>
          {error && (
            <span className="nunito-normal-14 mt-3 block w-full text-red-400">
              {error}
            </span>
          )}
        </div>
      </>
    );
  },
);

Combobox.displayName = "Combobox";

// const ComboxWrapper = (props: Props) => {
//   const [isSSR, setIsSSR] = useState(false);
//   useEffect(() => {
//     setIsSSR(true);
//   }, []);

//   if (isSSR) {
//     return <Combobox {...props} />;
//   }

//   return <div>Loading...</div>;
// };

// export default ComboxWrapper;

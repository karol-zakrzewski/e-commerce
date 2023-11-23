"use client";

import usePlacesAutocomplete from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import {
  ChangeEventHandler,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
const libraries = ["places"] as ["places"];
import Script from "next/script";

const Comobox = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {}, []);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    // clearSuggestions();
  };

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  return <input type="text" onChange={handleInput} />;
};

const ComboxWrapper = () => {
  const [isSSR, setIsSSR] = useState(false);
  useEffect(() => {
    setIsSSR(true);
  }, []);

  if (isSSR) {
    return <Comobox />;
  }

  return <div>Loading...</div>;
};

export default ComboxWrapper;

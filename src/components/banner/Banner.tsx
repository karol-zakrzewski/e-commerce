import Image from "next/image";
import React from "react";

export const Banner = () => {
  return (
    <header className="relative flex w-full flex-1 flex-col bg-red-100">
      <Image
        src="/images/background/banner.jpg"
        width={1024}
        height={120}
        alt="banner image"
        className="absolute inset-0 h-full w-full bg-red-100 object-cover "
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40 bg-gradient-to-tr from-slate-900 font-bold text-white">
        <h1 className="text-4xl">Szeroki wybór asortymentu</h1>
        <p className="text-xl">Zobacz ofertę zaworów, rur oraz kształtek</p>
      </div>
    </header>
  );
};

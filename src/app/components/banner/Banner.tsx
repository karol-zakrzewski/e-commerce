import Image from "next/image";

export const Banner = () => {
  return (
    <header className="relative h-[calc(100vh-72px)] w-full">
      <Image
        src="/images/background/banner.jpg"
        width={1024}
        height={120}
        alt="banner image"
        priority={true}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40 bg-gradient-to-tr from-slate-900 font-bold text-white">
        <h1 className="text-4xl">Szeroki wybór asortymentu</h1>
        <p className="text-xl">Zobacz ofertę zaworów, rur oraz kształtek</p>
      </div>
    </header>
  );
};

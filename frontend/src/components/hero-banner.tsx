import { useEffect, useState } from "react";
import Head from "next/head";

const slides = ["/h.jpg", "/egg-plate.jpg", "/bread-cat.jpg"];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="relative w-full h-screen overflow-hidden">
        {slides.map((src, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden={index !== currentIndex}
          />
        ))}

        <div className="absolute inset-0 bg-black/50 z-20" />

        <div
          className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6 text-white"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            crack, cook, enjoy
          </h1>
          <p className="mt-4 text-lg md:text-xl font-semibold">
            Eggstraordinary flavors for any appetite
          </p>
          <button className="mt-6 px-6 py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-black transition">
            VIEW MENU
          </button>
        </div>
      </main>
    </>
  );
};

export default HeroBanner;

"use client";

import { useRef } from "react";

export default function PopularDestinations() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative my-20">
      <h1 className="text-3xl font-bold mx-10 mb-10">
        Popular Destinations to Visit
      </h1>

      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white py-5 rounded hover:bg-orange-600">
        <img src="/left.svg" alt="" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white rounded py-5 hover:bg-orange-600">
        <img src="/right.svg" alt="" />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-6 px-20 overflow-hidden scroll-smooth">
        {[
  { img: "c1", title: "Paris, France", desc: "City of Love & Lights - Eiffel Tower, Louvre & more" },
  { img: "c2", title: "New York, USA", desc: "Tropical Paradise Experience NYC - Times Square, Central Park" },
  { img: "c3", title: "Tokyo, Japan", desc: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples" },
  { img: "c4", title: "Rome, Italy", desc: "Walk through History – Colosseum, Vatican, Roman Forum" },
  { img: "c5", title: "Dubai, UAE", desc: "Luxury and Innovation – Burj Khalifa, Desert Safari" },
  { img: "c6", title: "Agra, India", desc: "Harbour Views – Opera House, Bondi Beach & Wildlife" },
].map((item, i) => (
  <div
    key={i}
    className="relative min-w-[380px] h-[650px] rounded-3xl overflow-hidden group"
  >
    {/* IMAGE */}
    <img
      src={`/images/${item.img}.jpg`}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      alt={item.title}
    />

    {/* DARK GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

    {/* TEXT */}
    <div className="absolute top-6 left-6 right-6 text-white">
      <h2 className="text-lg font-medium">{item.title}</h2>
      <p className="text-3xl font-bold text-white/80 mt-1">{item.desc}</p>
    </div>
  </div>
))}

      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
];

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      {/* optional overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";

export default function YourPage() {

  const tourData = [
    {
      title: "Jaipur Tour",
      duration: "Royal Pink City Escape 👑",
      rating: "4.5",
      images: ["/images/F1.jpg", "/images/F2.jpg", "/images/F3.jpg"]
    },
    {
      title: "Varanasi Tour",
      duration: "Spiritual Ganga Vibes 🕉️",
      rating: "5.0",
      images: ["/images/F4.jpg", "/images/F5.jpg", "/images/F6.jpg"]
    },
    {
      title: "Delhi Tour",
      duration: "Capital City Hustle 🏛️",
      rating: "4.2",
      images: ["/images/F7.jpg", "/images/F8.jpg", "/images/F9.jpg"]
    },
    {
      title: "Tokyo Tour",
      duration: "Neon Nights & Dreams 🌸",
      rating: "4.6",
      images: ["/images/F10.jpg", "/images/F11.jpg", "/images/F12.jpg"]
    },
    {
      title: "Dubai Tour",
      duration: "Luxury Skyline Life 🏜️",
      rating: "4.4",
      images: ["/images/F13.jpg", "/images/F14.jpg", "/images/F15.jpg"]
    },
    {
      title: "Switzerland Tour",
      duration: "Alpine Fairytale Escape🏔️",
      rating: "5.0",
      images: ["/images/F16.jpg", "/images/F17.jpg", "/images/F18.jpg"]
    }
  ];

  return (
    <div className="px-4 md:px-10">

      <section>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-5">

          {tourData.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}

        </div>

      </section>

    </div>
  );
}


// Card Component
function TourCard({ tour }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {

    if (!isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % tour.images.length
      );
    }, 1000);

    return () => clearInterval(interval);

  }, [isHovered, tour.images.length]);


  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };


  return (

    <div
      className="w-full max-w-[320px] border-gray-300 rounded-sm overflow-hidden cursor-pointer hover:scale-105 transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >

      <img
        src={tour.images[currentImageIndex]}
        alt={tour.title}
        className="w-full h-56 md:h-64 object-cover rounded-3xl transition-opacity duration-500"
      />

      <div className="p-3">

        <div className="flex justify-between">

          <p className="font-semibold text-lg">
            {tour.duration}
          </p>

          <p className="bg-blue-500 flex p-0.5 px-3 rounded-xl gap-2 text-white text-md">
            <img className="mt-0.5 w-4 h-4" src="/star.png" alt="" />
            {tour.rating}
          </p>

        </div>

        <div className="flex items-center gap-2 mt-3">

          <img className="w-5 h-5" src="/location.png" alt="time" />

          <p className="text-gray-600">
            {tour.title}
          </p>

        </div>

      </div>

    </div>

  );
}
import { useState, useEffect } from 'react';

export default function YourPage() {
  // Different image sets for each card
  const tourData = [
    {
      title: 'Jaipur Tour',
      duration: '2 Days - 3 Nights',
      images: ['/images/F1.jpg', '/images/F2.jpg', '/images/F3.jpg']
    },
    {
      title: 'Vanarasi Tour',
      duration: '3 Days - 4 Nights',
      images: ['/images/F4.jpg', '/images/F5.jpg', '/images/F6.jpg']
    },
    {
      title: 'Delhi Tour',
      duration: '1 Day - 2 Nights',
      images: ['/images/F7.jpg', '/images/F8.jpg', '/images/F9.jpg']
    },
    {
      title: 'Tokyo Tour',
      duration: '2 Days - 3 Nights',
      images: ['/images/F10.jpg', '/images/F11.jpg', '/images/F12.jpg']
    },
    {
      title: 'Dubai Tour',
      duration: '2 Days - 3 Nights',
      images: ['/images/F13.jpg', '/images/F14.jpg', '/images/F15.jpg']
    },
    {
      title: 'Switzerland Tour',
      duration: '5 Days - 6 Nights',
      images: ['/images/F16.jpg', '/images/F17.jpg', '/images/F18.jpg']
    }
  ];

  return (
    <div>
      <section>
        <div className="grid grid-cols-3 ml-30 mt-5 gap-5">
          {tourData.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Separate component for each card with its own image rotation
function TourCard({ tour }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return; // Only run interval when hovered

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tour.images.length);
    }, 1000); // Change every 1 second on hover

    return () => clearInterval(interval);
  }, [isHovered, tour.images.length]);

  // Reset to first image when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <div 
      className="h-100 w-80 bg-white border border-gray-300 rounded-sm overflow-hidden items-center cursor-pointer hover:scale-105 transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={tour.images[currentImageIndex]} 
        alt={tour.title}
        className="w-full h-65 object-cover transition-opacity duration-500"
      />
      <div className="p-3">
        <p className="font-semibold text-lg">{tour.title}</p>
        <div className="flex items-center gap-2 mt-3">
          <img className="w-5 h-5" src="/time.svg" alt="time" />
          <p className="text-gray-600">{tour.duration}</p>
        </div>
        <button className="mt-4 ml-20 border-2 border-emerald-600 rounded-full px-4 py-0.5 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
          view details
        </button>
      </div>
    </div>
  );
}
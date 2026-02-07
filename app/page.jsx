"use client";
import Image from "next/image";
import BackgroundSlider from "@/components/BackgroundSlider";
import Featured from "@/components/Featured"
import Cards from "@/components/Cards";

export default function Home() {
  return (
    <>
    <BackgroundSlider/>
    <div className="bg-black/20 font-sans text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex justify-center pt-20">
        <div>

          <h1 className="font-bold text-5xl flex">
            Hey, I'm your personal
            <span className="text-orange-600 ml-3">Trip Planner</span>
          </h1>

          <h2 className="mt-5 text-lg font-normal ml-8 text-white/80 whitespace-nowrap">
  Tell me what you want, and I'll handle the rest: Flights, Hotels, trip Planner – all in seconds
</h2>

          {/* TEXTAREA */}
          <div className="relative p-4 w-[780px]">
            <textarea
              className="mt-10 w-full h-40 px-5 pt-5 pr-14 pb-14 border border-amber-50 rounded-2xl resize-none backdrop-blur-xs text-white placeholder-white/50"
              placeholder="Create a trip from Paris to New York"
            ></textarea>

            <button className="absolute bottom-8 right-6 bg-orange-600 p-2 rounded-lg cursor-pointer hover:scale-105 transition">
              <img src="/x.svg" alt="send" />
            </button>
          </div>

          {/* QUICK ACTIONS */}
          <div className="flex gap-5 mt-4 flex-wrap">
            <div className="p-2 rounded-3xl bg-black/40 hover:bg-orange-600 transition text-white flex gap-2 cursor-pointer">
              <img src="/globe.svg" /> Create new trip
            </div>
            <div className="p-2 rounded-3xl bg-black/40 hover:bg-orange-600 transition text-white flex gap-2 cursor-pointer">
              <img src="/plane.svg" /> Inspire a location
            </div>
            <div className="p-2 rounded-3xl bg-black/40 hover:bg-orange-600 transition text-white flex gap-2 cursor-pointer">
              <img src="/gem.svg" /> Discover Hidden gems
            </div>
            <div className="p-2 rounded-3xl bg-black/40 hover:bg-orange-600 transition text-white flex gap-2 cursor-pointer">
              <img src="/globe.svg" /> Adventure Destination
            </div>
          </div>

        </div>
      </section>

      {/* ================= ADVENTURE HEADING ================= */}
      <section className="text-center mt-[-280px] py-1">
        <h1 className="text-4xl font-extrabold font-serif">
          Adventure Activities
        </h1>
        <div className="w-32 h-1 bg-blue-500 mx-auto mt-3 rounded-full mb-2"></div>
        <h3>It’s the rush of adrenaline, the beauty of the unknown, and <br />the thrill of conquering your fears. Each experience is a reminder that life <br /> is meant to be explored, not just observed.</h3>
        
      </section>

      {/* ================= MOVING IMAGES ================= */}
     <>
  <style>{`
    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `}</style>

  <section className="relative w-full overflow-hidden pt-10">
    <div
      className="flex w-max gap-6"
      style={{
        animation: "marquee 20s linear infinite",
      }}
    >
      {/* SET 1 */}
      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act1.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Hiking</p>
        </div>
      </div>

      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act2.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">River Rafting</p>
        </div>
      </div>

      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act3.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Gliding</p>
        </div>
      </div>

      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act4.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Scuba Diving</p>
        </div>
      </div>
      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act5.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Climbing</p>
        </div>
      </div>
      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act6.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Camping</p>
        </div>
      </div>

      {/* SET 2 (DUPLICATE) */}
      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act1.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Hiking</p>
        </div>
      </div>

      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act2.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">River Rafting</p>
        </div>
      </div>

      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act3.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Gliding</p>
        </div>
      </div>

      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act4.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Scuba Diving</p>
        </div>
      </div>
      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act5.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Climbing</p>
        </div>
      </div>
      <div className="relative h-90 w-64 shrink-0">
        <img src="/images/act6.jpg" className="h-full w-full rounded-xl object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <p className="text-white text-sm font-medium">Camping</p>
        </div>
      </div>
    </div>
  </section>
</>



    </div>
<section className="text-center py-1 mt-12">
        <h1 className="text-4xl font-extrabold font-serif">
          Featured Trips
        </h1>
        <div className="w-32 h-1 bg-sky-400 mx-auto mt-3 rounded-full mb-2"></div>
        <h3>Discover journeys that combine adventure, comfort, <br />and local experiences. Our featured trips are designed to give you more than <br /> a vacation — they give you stories to tell.</h3>
      </section>

      <Featured/>
      <Cards/>
    </>
  );
}

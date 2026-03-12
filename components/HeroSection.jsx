"use client";
import { useRouter } from "next/navigation";

const activities = [
  { img: "/images/act1.jpg", label: "Hiking" },
  { img: "/images/act2.jpg", label: "River Rafting" },
  { img: "/images/act3.jpg", label: "Gliding" },
  { img: "/images/act4.jpg", label: "Scuba Diving" },
  { img: "/images/act5.jpg", label: "Climbing" },
  { img: "/images/act6.jpg", label: "Camping" },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="bg-black/20 font-sans text-white min-h-[718px]">

        {/* ================= HERO SECTION ================= */}
        <section className=" flex justify-center pt-20  sm:px-8">
          <div className="w-full max-w-[800px] h-full">

            {/* Heading — desktop: unchanged 5xl flex row | mobile: wraps + smaller */}
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl flex flex-wrap gap-x-3 leading-tight ml-8 sm:ml-0 md:ml-0">
              Hey, I'm your personal
              <span className="text-orange-600">Trip Planner</span>
            </h1>

            {/* Subheading — desktop: unchanged | mobile: wraps naturally */}
            <h2 className="mt-5 text-sm sm:text-base md:text-lg font-normal md:ml-8 text-white/80 leading-relaxed ml-8">
              Tell me what you want, and I'll handle the rest: Flights, Hotels, trip Planner – all in seconds
            </h2>

            {/* Textarea */}
            <div className="relative p-4 w-full md:w-[780px]">
              <textarea
                onClick={() => router.push("/navix")}
                className="mt-10 w-full h-32 sm:h-40 px-5 pt-5 pr-14 pb-14 border border-amber-50 rounded-2xl resize-none backdrop-blur-xs text-white placeholder-white/50"
                placeholder="Create a trip from Paris to New York"
                readOnly
              />
              <button className="absolute bottom-8 right-6 bg-orange-600 p-2 rounded-lg cursor-pointer hover:scale-105 transition">
                <img src="/x.svg" alt="send" />
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex gap-3 sm:gap-5 mt-4 flex-wrap">
              {[
                { icon: "/globe.svg", label: "Create new trip" },
                { icon: "/plane.svg", label: "Inspire a location" },
                { icon: "/gem.svg",   label: "Discover Hidden gems" },
                { icon: "/globe.svg", label: "Adventure Destination" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  onClick={() => router.push("/navix")}
                  className="p-2 rounded-3xl bg-black/40 hover:bg-orange-600 transition text-white flex gap-2 cursor-pointer text-sm sm:text-base items-center"
                >
                  <img src={icon} alt="" className="w-4 h-4 sm:w-auto sm:h-auto" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>

        {/* ================= ADVENTURE HEADING ================= */}
        <section className="text-center sm:mt-[-100px] md:mt-[-280px] py-1 px-4 mt-[-80px] text-black pt-30 sm:text-white md:text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif">
            Adventure Activities
          </h1>
          <div className="w-32 h-1 bg-blue-500 mx-auto mt-3 rounded-full mb-2" />
          {/* desktop: original with <br> | mobile: hidden <br>, text wraps */}
          <h3 className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            <span className="hidden md:inline">
              It's the rush of adrenaline, the beauty of the unknown, and <br />
              the thrill of conquering your fears. Each experience is a reminder that life <br />
              is meant to be explored, not just observed.
            </span>
            <span className="md:hidden">
              It's the rush of adrenaline, the beauty of the unknown, and the thrill of conquering your fears. Each experience is a reminder that life is meant to be explored, not just observed.
            </span>
          </h3>
        </section>

        {/* ================= MOVING IMAGES ================= */}
        <>
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <section className="relative w-full overflow-hidden pt-10">
            <div
              className="flex w-max gap-4 sm:gap-6"
              style={{ animation: "marquee 20s linear infinite" }}
            >
              {/* Render both sets using map to avoid duplication */}
              {[...activities, ...activities].map((act, i) => (
  <div
    key={i}
    className="relative shrink-0 h-48 w-36 sm:h-64 sm:w-48 md:h-[360px] md:w-64"
  >
    <img src={act.img} className="h-full w-full rounded-xl object-cover" alt={act.label} />
    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
      <p className="text-white text-xs sm:text-sm font-medium">{act.label}</p>
    </div>
  </div>
))}
            </div>
          </section>
          </>
      

      {/* ================= FEATURED TRIPS HEADING ================= */}
      <section className="text-center py-1 mt-8 sm:mt-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif">
          Featured Trips
        </h1>
        <div className="w-32 h-1 bg-sky-400 mx-auto mt-3 rounded-full mb-2" />
        <h3 className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          <span className="hidden md:inline">
            Discover journeys that combine adventure, comfort, <br />
            and local experiences. Our featured trips are designed to give you more than <br />
            a vacation — they give you stories to tell.
          </span>
          <span className="md:hidden">
            Discover journeys that combine adventure, comfort, and local experiences. Our featured trips are designed to give you more than a vacation — they give you stories to tell.
          </span>
        </h3>
      </section>
    </>
  );
}
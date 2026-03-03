"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import GroupSizeUI from "@/components/GroupSizeUI";
import BudgetUI from "@/components/budgetUI";
import DaysUI from "@/components/DaysUI";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

// ── Helpers ──────────────────────────────────────────────────────────────────
const Star = ({ n }) => {
  const filled = Math.min(5, Math.max(0, Math.round(parseFloat(n) || 0)));
  return <span style={{ color: "#f59e0b" }}>{"★".repeat(filled)}{"☆".repeat(5 - filled)}</span>;
};

const Pill = ({ children, color = "#6366f1" }) => (
  <span
    className="text-xs font-semibold px-2 py-0.5 rounded-full border"
    style={{ background: color + "22", color, borderColor: color + "44" }}
  >
    {children}
  </span>
);

// ── Extract all markers from a tripPlan ───────────────────────────────────────
function extractMarkers(tripPlan) {
  if (!tripPlan) return [];
  const markers = [];

  // Hotel markers (blue)
  tripPlan.hotels?.forEach((h) => {
    const lat = h.geo_coordinates?.latitude;
    const lng = h.geo_coordinates?.longitude;
    if (lat && lng) {
      markers.push({ lat, lng, label: h.hotel_name, color: "#3b82f6", emoji: "🏨" });
    }
  });

  // Activity markers (orange)
  tripPlan.itinerary?.forEach((day) => {
    day.activities?.forEach((a) => {
      const lat = a.geo_coordinates?.latitude;
      const lng = a.geo_coordinates?.longitude;
      if (lat && lng) {
        markers.push({ lat, lng, label: a.place_name, color: "#f97316", emoji: "📍" });
      }
    });
  });

  return markers;
}

// ── Trip Result Cards ─────────────────────────────────────────────────────────
function TripResult({ tripPlan, onReset, onDayChange }) {
  const [activeTab, setActiveTab] = useState("hotels");
  const [activeDay, setActiveDay] = useState(0);

  // When day changes, tell parent so map can focus on that day's markers
  function selectDay(i) {
    setActiveDay(i);
    onDayChange?.(i);
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-full pr-1">
      {/* Header */}
      <div className="bg-slate-800 text-white rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3 flex-shrink-0">
        <div>
          <h2 className="text-xl font-black">
            {tripPlan.origin} → {tripPlan.destination}
          </h2>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Pill color="#818cf8">📅 {tripPlan.duration}</Pill>
            <Pill color="#38bdf8">💰 {tripPlan.budget}</Pill>
            <Pill color="#34d399">👥 {tripPlan.group_size}</Pill>
          </div>
        </div>
        <button
          onClick={onReset}
          className="bg-slate-600 hover:bg-slate-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition"
        >
          Plan New Trip
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-shrink-0">
        {["hotels", "itinerary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-bold text-sm capitalize transition ${
              activeTab === tab
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {tab === "hotels" ? "🏨 Hotels" : "🗺 Itinerary"}
          </button>
        ))}
      </div>

      {/* Hotels */}
      {activeTab === "hotels" && (
        <div className="flex flex-col gap-4">
          {tripPlan.hotels?.map((h, i) => (
            <div key={i} className="border rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row bg-white">
              <img
                src={h.hotel_image_url}
                alt={h.hotel_name}
                className="w-full sm:w-40 h-40 object-cover flex-shrink-0"
                onError={(e) => { e.target.src = `https://picsum.photos/seed/hotel${i}/300/200`; }}
              />
              <div className="p-4 flex flex-col gap-1 flex-1">
                <div className="font-black text-base">{h.hotel_name}</div>
                <Star n={h.rating} />
                <p className="text-gray-400 text-xs">{h.hotel_address}</p>
                <p className="text-gray-600 text-sm">{h.description}</p>
                <div className="mt-2">
                  <span className="font-bold text-orange-500">{h.price_per_night}/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Itinerary */}
      {activeTab === "itinerary" && (
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex sm:flex-col gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
            {tripPlan.itinerary?.map((d, i) => (
              <button
                key={i}
                onClick={() => selectDay(i)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition whitespace-nowrap ${
                  activeDay === i
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {tripPlan.itinerary?.[activeDay] && (() => {
              const day = tripPlan.itinerary[activeDay];
              return (
                <>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                    <div className="font-bold text-indigo-600 mb-1">📋 Day Plan</div>
                    <p className="text-gray-700 text-sm">{day.day_plan}</p>
                    <div className="mt-2">
                      <Pill color="#10b981">⏰ Best time: {day.best_time_to_visit_day}</Pill>
                    </div>
                  </div>
                  {day.activities?.map((a, j) => (
                    <div key={j} className="border rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col sm:flex-row">
                      <img
                        src={a.place_image_url}
                        alt={a.place_name}
                        className="w-full sm:w-32 h-32 object-cover flex-shrink-0"
                        onError={(e) => { e.target.src = `https://picsum.photos/seed/place${j}/300/200`; }}
                      />
                      <div className="p-4 flex flex-col gap-1 flex-1">
                        <div className="font-black text-base">{a.place_name}</div>
                        <p className="text-gray-500 text-sm">{a.place_details}</p>
                        <div className="flex gap-2 flex-wrap my-1">
                          <Pill color="#f59e0b">🎟 {a.ticket_pricing}</Pill>
                          <Pill color="#8b5cf6">⏱ {a.time_travel_each_location}</Pill>
                          <Pill color="#10b981">🌅 {a.best_time_to_visit}</Pill>
                        </div>
                        <div className="text-xs text-gray-400">📍 {a.place_address}</div>
                      </div>
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function NavixPage() {
  const [chatMode, setChatMode] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUI, setActiveUI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [currentField, setCurrentField] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]); // ✅ markers passed to map
  const [tripData, setTripData] = useState({
    from: "", to: "", group: "", budget: "", days: "",
  });

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, activeUI]);

  function handleReset() {
    setChatMode(false);
    setInput("");
    setMessages([]);
    setActiveUI(null);
    setLoading(false);
    setTripPlan(null);
    setCurrentField(null);
    setMapMarkers([]);
    setTripData({ from: "", to: "", group: "", budget: "", days: "" });
  }

  // ✅ When user switches day tab, show only that day's markers on the map
  function handleDayChange(dayIndex) {
    if (!tripPlan) return;
    const day = tripPlan.itinerary?.[dayIndex];
    if (!day) return;

    const dayMarkers = day.activities
      ?.map((a) => ({
        lat: a.geo_coordinates?.latitude,
        lng: a.geo_coordinates?.longitude,
        label: a.place_name,
        color: "#f97316",
        emoji: "📍",
      }))
      .filter((m) => m.lat && m.lng) || [];

    setMapMarkers(dayMarkers);
  }

  async function callAPI(latestTripData, userText) {
    setLoading(true);
    setActiveUI(null);
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setInput("");

    try {
      const res = await fetch("/api/aimodel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripData: latestTripData }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: "❌ " + data.error }]);
        return;
      }

      if (data.done && data.tripPlan) {
        const plan = data.tripPlan.trip_plan;
        setTripPlan(plan);
        // ✅ Show ALL markers when trip first loads
        setMapMarkers(extractMarkers(plan));
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setActiveUI(data.ui || null);
      setCurrentField(data.field || null);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!input.trim() || loading) return;
    setChatMode(true);

    let latestTripData = tripData;
    if (currentField === "from" || currentField === "to") {
      latestTripData = { ...tripData, [currentField]: input.trim() };
      setTripData(latestTripData);
    }

    await callAPI(latestTripData, input.trim());
  }

  async function handleQuickStart(text) {
    setChatMode(true);
    await callAPI(tripData, text);
  }

  async function handleChoice(field, value) {
    const latestTripData = { ...tripData, [field]: value };
    setTripData(latestTripData);
    await callAPI(latestTripData, value.toString());
  }

  const isChoiceWidget = ["groupSize", "budget", "days"].includes(activeUI);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[70%] h-full">

        {!chatMode ? (
          <div className="m-5 mt-10 w-[90%] border rounded-xl border-gray-300">
            <h1 className="text-3xl font-bold flex justify-center mt-10">
              Start Planning new Trip using AI
            </h1>
            <h2 className="text-gray-400 m-5 text-center">
              Discover personalized travel itineraries, find the best destinations,
              and plan your dream vacation effortlessly with the power of AI.
            </h2>
            {[
              { icon: "/globe.svg", label: "Create New Trip" },
              { icon: "/plane.svg", label: "Inspire me where to go" },
              { icon: "/gem.svg",   label: "Discover Hidden gems" },
              { icon: "/globe.svg", label: "Adventure Destination" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                onClick={() => handleQuickStart(label)}
                className="p-3.5 border border-gray-300 m-5 rounded-2xl font-normal flex gap-2.5 hover:border-amber-600 hover:text-orange-700 cursor-pointer"
              >
                <img src={icon} alt="" />{label}
              </div>
            ))}
            <div className="relative p-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                className="border w-full h-36 px-5 pt-5 pr-14 pb-14 rounded-2xl"
                placeholder="Start typing here..."
              />
              <button onClick={handleSend} className="absolute bottom-8 right-6 bg-orange-600 p-2 rounded-lg">
                <img src="/x.svg" alt="send" />
              </button>
            </div>
          </div>

        ) : (
          <div className="h-[95%] flex flex-col border rounded-xl border-gray-300 p-5 mt-4 ml-8">
            {tripPlan ? (
              <TripResult
                tripPlan={tripPlan}
                onReset={handleReset}
                onDayChange={handleDayChange}
              />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 pb-2 min-h-0">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 mx-2 rounded-xl max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-orange-500 text-white ml-auto"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}

                  {loading && (
                    <div className="bg-gray-200 text-black p-3 mx-2 rounded-xl w-fit">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-150" />
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-300" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {!loading && isChoiceWidget && (
                  <div className="mt-3 flex-shrink-0">
                    {activeUI === "groupSize" && <GroupSizeUI onSelect={(v) => handleChoice("group", v)} />}
                    {activeUI === "budget"    && <BudgetUI    onSelect={(v) => handleChoice("budget", v)} />}
                    {activeUI === "days"      && <DaysUI      onSelect={(v) => handleChoice("days", v)} />}
                  </div>
                )}

                {!isChoiceWidget && (
                  <div className="relative mt-4 flex-shrink-0">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                      className="border w-full h-20 px-4 pt-3 pr-12 pb-3 rounded-xl resize-none"
                      placeholder="Reply here..."
                    />
                    <button onClick={handleSend} className="absolute bottom-3 right-3 bg-orange-600 p-2 rounded-lg">
                      <img src="/x.svg" alt="send" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* ✅ Map receives live markers */}
      <div className="w-full h-full px-5 pt-10">
        <MapComponent markers={mapMarkers} />
      </div>
    </div>
  );
}
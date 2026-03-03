"use client";

export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "✈️",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventurers",
    icon: "🏡",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "⛵",
  },
];

const GroupSizeUI = ({ onSelect }) => {
  return (
    <div className="grid gap-4 mt-4 grid-cols-4">
      {SelectTravelesList.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.title)}
          className="p-4 border rounded-2xl bg-white hover:border-orange-500 cursor-pointer transition"
        >
          <div className="text-2xl">{item.icon}</div>
          <div className="font-semibold">{item.title}</div>
          <div className="text-gray-400 text-sm">{item.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default GroupSizeUI;
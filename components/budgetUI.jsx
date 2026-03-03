"use client";
import React from "react";

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don’t worry about cost",
    icon: "💸",
    color: "bg-purple-100 text-purple-600",
  },
];

const BudgetUI = ({ onSelect }) => {
  return (
    <div className="grid gap-3 mt-4 grid-cols-3">
      {SelectBudgetOptions.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.title + ": " + item.desc)}
          className="p-4 border rounded-2xl bg-white hover:border-orange-500 cursor-pointer transition"
        >
          <div className="text-2xl">{item.icon}</div>
          <div className="font-semibold">{item.title}</div>
          <div className="text-sm text-gray-500">{item.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default BudgetUI;
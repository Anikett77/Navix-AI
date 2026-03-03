"use client";
import { useState } from "react";

const DaysUI = ({ onSelect }) => {
  const [days, setDays] = useState(3);

  const increase = () => {
    setDays(prev => prev + 1);
  };

  const decrease = () => {
    if (days > 1) {
      setDays(prev => prev - 1);
    }
  };

  return (
    <div className="mt-4 p-6 border rounded-2xl bg-white w-fit">

      <h2 className="text-lg font-semibold mb-4">
        Select Number of Days
      </h2>

      <div className="flex items-center gap-6">

        {/* Minus Button */}
        <button
          onClick={decrease}
          className="px-4 py-2 bg-gray-200 rounded-xl text-xl"
        >
          −
        </button>

        {/* Days Display */}
        <span className="text-2xl font-bold">
          {days}
        </span>

        {/* Plus Button */}
        <button
          onClick={increase}
          className="px-4 py-2 bg-gray-200 rounded-xl text-xl"
        >
          +
        </button>

      </div>

      {/* Confirm Button */}
      <button
        onClick={() => onSelect(days)}
        className="mt-6 w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-700 transition"
      >
        Confirm
      </button>

    </div>
  );
};

export default DaysUI;
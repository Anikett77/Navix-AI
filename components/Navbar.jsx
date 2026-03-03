"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ── User Avatar + Popup ───────────────────────────────────────────────────────
function UserAvatar({ user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  return (
    <div className="relative" ref={popupRef}>
      {/* Circle avatar */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold text-lg flex items-center justify-center shadow-md hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {initial}
      </button>

      {/* Popup card */}
      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-100">
            <div className="w-11 h-11 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center flex-shrink-0 shadow">
              {initial}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-gray-800 text-sm truncate leading-tight">
                {user?.name || "User"}
              </p>
              <p className="text-gray-400 text-xs truncate mt-0.5">
                {user?.email || ""}
              </p>
            </div>
          </div>

          {/* Sign out */}
          <button
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ Read user from localStorage on mount (set this after login)
  useEffect(() => {
    const stored = localStorage.getItem("navix_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("navix_user");
      }
    }
  }, []);

  function handleSignOut() {
    localStorage.removeItem("navix_user");
    setUser(null);
    router.push("/");
  }

  return (
    <div className="text-black bg-white/20 justify-between flex items-center backdrop-blur-sm border-b border-b-gray-500 px-4">
      {/* Logo */}
      <ul className="justify-start flex items-center">
        <img src="https://www.planaitrip.site/logo.svg" alt="logo" />
        <li className="my-5 ml-3 font-bold text-xl">Navix AI</li>
      </ul>

      {/* Nav links */}
      <ul className="justify-center gap-8 flex">
        <a href="/">
          <h2 className="hover:text-orange-600 hover:scale-105 text-lg transition-all">Home</h2>
        </a>
        <a href="/navix">
          <h2 className="hover:text-orange-600 hover:scale-105 text-lg transition-all">Navix</h2>
        </a>
        <a href="/contact">
          <h2 className="hover:text-orange-600 hover:scale-105 text-lg transition-all">Contact</h2>
        </a>
      </ul>

      {/* Right side — avatar if logged in, button if not */}
      <div className="flex items-center gap-3 my-2 mr-2">
        {user ? (
          <UserAvatar user={user} onSignOut={handleSignOut} />
        ) : (
          <a
            className="p-2 rounded-lg bg-orange-600 text-white px-4 cursor-pointer hover:bg-orange-700 transition"
            href="/login"
          >
            Create New Trip
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
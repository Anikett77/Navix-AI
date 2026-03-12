"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ── User Avatar ─────────────────────────────
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
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white border rounded-xl shadow-xl">
          <div className="px-4 py-4 border-b">
            <p className="font-semibold text-sm">{user?.name || "User"}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
            className="w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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
    <nav className="bg-white/20 backdrop-blur-sm border-b border-gray-300 px-4">
      <div className="flex items-center justify-between h-16">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://www.planaitrip.site/logo.svg"
            alt="logo"
            className="h-8"
          />
          <span className="font-bold text-xl">Navix AI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg">
          <a href="/" className="hover:text-orange-600 transition">
            Home
          </a>
          <a href="/navix" className="hover:text-orange-600 transition">
            Navix
          </a>
          <a href="/contact" className="hover:text-orange-600 transition">
            Contact
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {user ? (
            <UserAvatar user={user} onSignOut={handleSignOut} />
          ) : (
            <a
              href="/login"
              className="hidden md:block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            >
              Create New Trip
            </a>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 pb-4">

          <a href="/" className="hover:text-orange-600">
            Home
          </a>

          <a href="/navix" className="hover:text-orange-600">
            Navix
          </a>

          <a href="/contact" className="hover:text-orange-600">
            Contact
          </a>

          {!user && (
            <a
              href="/login"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg w-fit"
            >
              Create New Trip
            </a>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
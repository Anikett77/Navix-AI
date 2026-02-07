"use client";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[400px] bg-white/10 backdrop-blur-md p-8 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 rounded bg-black/40 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-black/40 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-black/40 outline-none"
        />

        <button className="w-full bg-orange-600 p-3 rounded font-semibold">
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center text-white/70">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

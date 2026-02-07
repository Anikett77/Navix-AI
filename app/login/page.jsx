"use client";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[400px] bg-white/10 backdrop-blur-md p-8 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

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
          Login
        </button>

        <p className="text-sm mt-4 text-center text-white/70">
          Don’t have an account?{" "}
          <a href="/signup" className="text-orange-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

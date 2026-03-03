"use client";
import { useState, useRef, useEffect } from "react";

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email us",
    value: "hello@navixai.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Based in",
    value: "Bhopal, India 🇮🇳",
    sub: "Building for the world",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Support hours",
    value: "Mon – Fri, 9am – 6pm IST",
    sub: "Weekend replies may be delayed",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const canvasRef = useRef(null);

  // Animated background grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated dots grid
      const spacing = 40;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const dist = Math.hypot(x - canvas.width / 2, y - canvas.height / 2);
          const wave = Math.sin(dist * 0.015 - t) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, wave * 1.5 + 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251,146,60,${wave * 0.15})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending — wire up your email API here
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("sent");
  }

  return (
    <div className="relative min-h-screen bg-[#0c0c0f] text-white overflow-hidden">
      {/* Animated canvas bg */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Get in touch
          </div>
          <h1
            className="text-5xl md:text-6xl font-black mb-4 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Let's talk{" "}
            <span className="text-orange-400">travel</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a question, feedback, or partnership idea? We'd love to hear from you.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left — info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0 group-hover:bg-orange-500/20 transition">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">
                    {info.label}
                  </p>
                  <p className="text-white font-semibold text-sm">{info.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{info.sub}</p>
                </div>
              </div>
            ))}

            {/* Decorative plane card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-br from-orange-500/20 to-orange-900/10 p-6 mt-2">
              <div className="text-4xl mb-3">✈️</div>
              <p className="text-white font-bold text-lg leading-snug">
                Planning something big?
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Tell us your dream destination and we'll help you build the perfect itinerary.
              </p>
              <a
                href="/navix"
                className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 transition text-white text-sm font-bold px-4 py-2 rounded-xl"
              >
                Start Planning →
              </a>
              {/* decorative circle */}
              <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-orange-500/20 pointer-events-none" />
              <div className="absolute -right-2 -top-2 w-14 h-14 rounded-full border border-orange-500/20 pointer-events-none" />
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-white/3 border border-white/8 rounded-3xl p-8 backdrop-blur-sm">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-white">Message sent!</h3>
                  <p className="text-gray-400 text-sm">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus(null); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-2 text-orange-400 text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        Your name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        Email address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@email.com"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us everything..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 transition text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 group overflow-hidden"
                  >
                    {/* Shine effect */}
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
                    {status === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
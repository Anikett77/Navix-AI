// components/ConditionalFooter.jsx
"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/navix") return null;
  return <Footer />;
}
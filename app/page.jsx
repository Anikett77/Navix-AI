"use client";
import Image from "next/image";
import BackgroundSlider from "@/components/BackgroundSlider";
import Featured from "@/components/Featured"
import Cards from "@/components/Cards";
import { useRouter } from "next/navigation";
import HeroSection from '@/components/HeroSection'

export default function Home() {
  const router = useRouter();
  return (
    <>
    <BackgroundSlider/>
    <HeroSection/>

      <Featured/>
      <Cards/>
    </>
  );
}

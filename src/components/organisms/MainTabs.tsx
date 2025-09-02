"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import Loading from "@/components/organisms/Loading";
import {
  Leaf,
  Waves,
  HeartPulse,
  Sun,
  Building2,
  LucideIcon,
} from "lucide-react";

const tabsData: {
  image: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
    {
      image:
        "https://cews.bmkg.go.id/robiganstatic/PRODUK_UPDATE/ACH_BLN/ach_bln.png",
      title: "Pertanian dan Kehutanan",
      description: "Informasi iklim untuk sektor pertanian dan kehutanan.",
      href: "pertanian/daftar",
      icon: Leaf,
    },
    {
      image:
        "https://cews.bmkg.go.id/robiganstatic/PRODUK_UPDATE/ACH_BLN/ash_bln.png",
      title: "Sumber Daya Air & Bencana",
      description: "Informasi iklim untuk sektor sumber daya air dan bencana.",
      href: "air-bencana/daftar",
      icon: Waves,
    },
    {
      image:
        "https://cews.bmkg.go.id/robiganstatic/PRODUK_UPDATE/MUSIM/permus_poster.png",
      title: "Kesehatan",
      description: "Informasi iklim untuk sektor kesehatan.",
      href: "kesehatan/daftar",
      icon: HeartPulse,
    },
    {
      image:
        "https://cews.bmkg.go.id/robiganstatic/PRODUK_UPDATE/ANSPI/anspi1.png",
      title: "Energi",
      description: "Informasi iklim untuk sektor energi.",
      href: "energi/daftar",
      icon: Sun,
    },
    {
      image:
        "https://cews.bmkg.go.id/robiganstatic/PRODUK_UPDATE/ANSPI/anspi6.png",
      title: "Perencanaan & Pembangunan",
      description: "Informasi iklim untuk sektor pembangunan dan tata ruang.",
      href: "pembangunan/daftar",
      icon: Building2,
    },
  ];

export function MainTabs() {
  return (
    <Tabs defaultValue="tab0" className="w-full mx-auto mt-6">
      {/* Tab Triggers */}
      <div className="flex justify-center">
        <TabsList className="flex flex-wrap justify-center bg-gray-50 shadow-md rounded-lg p-1 gap-2 w-full h-full ">
          {tabsData.map((tab, i) => (
            <TabsTrigger
              key={tab.href}
              value={`tab${i}`}
              className="text-sm md:text-base whitespace-nowrap px-4 py-2 rounded-md transition-colors
            data-[state=active]:bg-cyan-600 data-[state=active]:text-white
            hover:bg-cyan-100 "
            >
              <span className="lg:hidden">
                <tab.icon />
              </span>
              <span className="hidden lg:inline">
                {tab.title}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Tab Contents */}
      {tabsData.map((tab, i) => (
        <TabsContent
          key={tab.href}
          value={`tab${i}`}
          className="p-4 mt-4 rounded-lg shadow-xl flex flex-col gap-4 bg-white"
        >
          {/* Gambar */}
          <div className="w-full">
            <Suspense fallback={<Loading />}>
              <Image
                src={tab.image}
                alt={tab.title}
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg pointer-events-none"
                sizes="100vw"
                priority
              />
            </Suspense>
          </div>

          {/* Teks & Link */}
          <div>
            <h3 className="text-xl font-semibold mb-2">{tab.title}</h3>
            <p className="text-gray-600 mb-4">{tab.description}</p>
            <Link
              href={tab.href}
              className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
            >
              Selengkapnya →
            </Link>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

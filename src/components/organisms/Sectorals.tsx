"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Leaf,
  Waves,
  HeartPulse,
  Sun,
  Building2,
  LucideIcon,
} from "lucide-react";

type Sectoral = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

const sectorals: Sectoral[] = [
  {
    title: "Pertanian dan Kehutanan",
    description: "Informasi iklim untuk sektor pertanian dan kehutanan.",
    icon: Leaf,
    href: "pertanian/daftar",
  },
  {
    title: "Sumber Daya Air & Bencana",
    description: "Informasi iklim untuk sektor sumber daya air dan bencana.",
    icon: Waves,
    href: "air-bencana/daftar",
  },
  {
    title: "Kesehatan",
    description: "Informasi iklim untuk sektor kesehatan.",
    icon: HeartPulse,
    href: "kesehatan/daftar",
  },
  {
    title: "Energi",
    description: "Informasi iklim untuk sektor energi.",
    icon: Sun,
    href: "energi/daftar",
  },
  {
    title: "Perencanaan & Pembangunan",
    description: "Informasi iklim untuk sektor pembangunan dan tata ruang.",
    icon: Building2,
    href: "pembangunan/daftar",
  },
];

export function Sectorals() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleClick = (index: number, href: string) => {
    setActiveIndex(index);
    setTimeout(() => {
      router.push(href);
    }, 150); // kasih delay 150ms biar animasi klik kelihatan
  };

  return (
    <div className="container mx-auto m-0 py-8">
      {/* Layanan Informasi Sektoral */}
      <h2 className="font-semibold text-center text-2xl mb-4 text-[var(--bmkggreen1)]">Layanan Informasi Sektoral</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {sectorals.map((sector, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              onClick={() => handleClick(index, sector.href)}
              className={`flex flex-col w-full text-center rounded-xl p-6 shadow-xl transition-all duration-300 ${
                isActive
                  ? "bg-[var(--bmkggreen1)] text-white"
                  : "bg-[var(--bmkggreen3)] text-gray-700 hover:bg-[var(--bmkgblue5)]"
              }`}
            >
              <sector.icon
                className={`mx-auto mb-4 h-8 w-8 transition-colors ${
                  isActive ? "text-white" : "text-[var(--bmkggreen1)]"
                }`}
              />
              <h3 className="font-semibold text-lg text-center">
                {sector.title}
              </h3>
              <p
                className={`text-sm mt-1 text-center ${
                  isActive ? "text-white/90" : "text-gray-600"
                }`}
              >
                {sector.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

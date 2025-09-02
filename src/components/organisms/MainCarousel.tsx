"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // 1. Impor komponen Link
import { Suspense } from "react";
import { useState, useEffect } from "react";
import Loading from "@/components/organisms/Loading";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// 2. Impor data dari file JSON
import carouselData from "@/../public/data/carousel.json";

interface Data {
  id: number;
  url: string;
  alt: string;
  slug: string;
  description: string;
}

export function MainCarousel() {
  const datas: Data[] = carouselData; // Gunakan data dari file JSON
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    // bagi dua layarnya
    <div className="container mx-auto flex flex-col-reverse xl:flex-row w-full px-0 py-8">
      <div className="w-full xl:w-1/2 flex flex-col justify-center p-6 text-center md:text-start xl:text-start">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl mb-2 text-[var(--bmkggreen1)]">
          {datas[current].alt}
        </h1>
        <p className="text-muted-foreground">{datas[current].description}</p>
      </div>
      <div className="w-full xl:w-1/2">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="relative w-full mx-auto mt-4 mb-4 overflow-hidden rounded-xl shadow-xl"
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {datas.map((img, index) => {
              const isAnimatedGif = img.url.endsWith(".gif");
              return (
                // 3. Bungkus CarouselItem dengan komponen Link
                <CarouselItem key={img.id} className="h-full">
                  <Link href={`/${img.slug}/detail`} passHref>
                    <Card className="h-full cursor-pointer transition-transform duration-300 hover:scale-105">
                      <CardContent className="p-0 relative h-[300px] sm:h-[400px] md:h-[500px]">
                        <Suspense fallback={<Loading />}>
                          <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            className="object-contain" // Hapus pointer-events-none
                            sizes="(max-width: 768px) 100vw, 70vh"
                            priority={index === 0}
                            {...(isAnimatedGif && { unoptimized: true })}
                          />
                        </Suspense>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full p-2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full p-2" />
        </Carousel>
      </div>
    </div>
  );
}

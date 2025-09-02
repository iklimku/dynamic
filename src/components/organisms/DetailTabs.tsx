import { Suspense } from "react";
import Loading from "@/components/organisms/Loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface Tab {
  title: string;
  imageUrl: string;
  descriptionUrl: string;
  description: string;
}

interface Item {
  slug: string;
  title: string;
  imageUrl: string;
  descriptionUrl: string | null;
  description: string;
  tabs: Tab[] | null;
}

export default async function DetailTabs(item: Item) {
  // Ambil semua deskripsi dulu
  const resolvedTabs = await Promise.all(
    (item.tabs ?? []).map(async (tab) => {
      let description = tab.description;
      if (tab.descriptionUrl) {
        try {
          const res = await fetch(tab.descriptionUrl);
          if (!res.ok) throw new Error("Gagal fetch");
          description = await res.text();

          // replace ; to <br/>
          description = description.replace(/;/g, ".<br/>");

          // replace enter to <br/>
          description = description.replace(/\n/g, "<br/>");
        } catch (error) {
          description = "Deskripsi tidak tersedia.";
          console.error(error);
        }
      }
      return { ...tab, description };
    })
  );

  const isAnimatedGif = item.imageUrl.endsWith(".gif");

  return (
    <main className="container mx-auto px-4 mt-20 mb-20">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        {item.title}
      </h2>

      <Tabs defaultValue="tab0" className="w-full max-w-screen-xl mx-auto mt-6">
        {/* Tab Triggers */}
        <div className="flex justify-center">
          <TabsList className="flex flex-wrap justify-center bg-gray-50 shadow-md rounded-lg p-1 gap-2 w-full h-full">
            {resolvedTabs.map((tab, i) => (
              <TabsTrigger
                key={tab.title}
                value={`tab${i}`}
                className="text-sm md:text-base whitespace-nowrap px-4 py-2 rounded-md transition-colors
                  data-[state=active]:bg-cyan-600 data-[state=active]:text-white
                  hover:bg-cyan-100"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Contents */}
        {resolvedTabs.map((tab, i) => (
          <TabsContent
            key={tab.title}
            value={`tab${i}`}
            className="p-4 mt-4 rounded-lg shadow-xl flex flex-col gap-4 bg-white"
          >
            <div className="w-full">
              <Suspense fallback={<Loading />}>
                <Image
                  src={tab.imageUrl}
                  alt={tab.title}
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-lg pointer-events-none"
                  sizes="100vw"
                  priority
                  {...(isAnimatedGif && { unoptimized: true })}
                />
              </Suspense>
            </div>

            {(tab.description || tab.descriptionUrl) && (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-10 text-center bg-cyan-500 text-white hover:bg-indigo-600 mt-8 mb-8">
                    Deskripsi dan Analisis
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-justify text-gray-700">
                    <div
                      dangerouslySetInnerHTML={{ __html: tab.description }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

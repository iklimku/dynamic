import { Suspense } from "react";
import Loading from "@/components/organisms/Loading";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Tab {
  title: string;
  imageUrl: string;
  descriptionUrl: string | null;
  description: string;
}

interface Item {
  slug: string;
  title: string;
  imageUrl: string;
  descriptionUrl: string;
  description: string;
  tabs: Tab[] | null;
}

export default async function DetailWithoutTabs(item: Item) {
  // get descripsi from descripsiUlr (.txt) convert to string
  let description = item.description;
  if (item.descriptionUrl != "") {
    const res = await fetch(item.descriptionUrl);
    description = await res.text();

    // replace ; to <br/>
    description = description.replace(/;/g, ".<br/>");

    // replace enter to <br/>
    description = description.replace(/\n/g, "<br/>");
  }
  const isAnimatedGif = item.imageUrl.endsWith(".gif");
  return (
    <>
      <main className="container mx-auto px-4 mt-20 mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {item.title}
        </h2>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <Suspense fallback={<Loading />}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover rounded-md pointer-events-none"
                  {...(isAnimatedGif && { unoptimized: true })}
                />
              </Suspense>
            </div>

            {(item.description || item.descriptionUrl) && (
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
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

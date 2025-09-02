import { MainCarousel } from "@/components/organisms/MainCarousel";
import { Sectorals } from "@/components/organisms/Sectorals";
// import { MainTabs } from "@/components/organisms/MainTabs";

export default function Home() {
  return (
    <>
      <main className="mx-auto">
        {/* Carousel */}
        <div className="w-auto h-auto mx-4">
          <MainCarousel />
        </div>

        {/* Daftar Sectoral */}
        <div className="w-auto h-auto mt-9">
          <Sectorals />
        </div>
        {/* <div className="w-auto h-auto mt-9 mx-4">
          <MainTabs />
        </div> */}
      </main>
    </>
  );
}

"use client";

import { useState } from "react";
import GoogleDocViewer from "@/components/organisms/PDFView";
import pdfData from "@/../public/data/pdfs.json";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { usePagination, DOTS } from "@/hooks/use-pagination";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const itemsPerPage = 3;

  const categories = ["Semua", ...new Set(pdfData.map((pdf) => pdf.category))];

  const filteredItems =
    activeCategory === "Semua"
      ? pdfData
      : pdfData.filter((pdf) => pdf.category === activeCategory);

  const paginationRange = usePagination({
    currentPage,
    totalCount: filteredItems.length,
    pageSize: itemsPerPage,
  });

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      {/* Judul */}
      <h1 className="text-3xl font-bold tracking-tight text-center mb-2">
        Galeri Dokumen
      </h1>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {/* Tombol Filter*/}
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant="outline"
            className={
              activeCategory === category
                ? "bg-[var(--bmkggreen1)] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-[var(--bmkggreen3)]"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid Galeri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 min-h-[480px]">
        {currentItems.length > 0 ? (
          currentItems.map((pdf) => {
            // Cek jika URL adalah lokal (diawali dengan '/')
            // Jika ya, gabungkan dengan domain utama aplikasi. Jika tidak, gunakan URL aslinya.
            const fullUrl = pdf.url.startsWith("/")
              ? `${window.location.origin}${pdf.url}`
              : pdf.url;

            return (
              <div
                key={pdf.id}
                className="border rounded-lg shadow-sm p-4 h-[450px] flex flex-col"
              >
                <h3 className="font-semibold text-lg truncate mb-2 text-center">
                  {pdf.title}
                </h3>
                <div className="flex-1">
                  {/* Berikan fullUrl yang sudah absolut ke viewer */}
                  <GoogleDocViewer fileUrl={fullUrl} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="md:col-span-2 lg:col-span-3 flex items-center justify-center">
            <p className="text-center text-muted-foreground">
              Tidak ada dokumen yang ditemukan untuk kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Tombol "Sebelumnya" */}
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Nomor Halaman & Elipsis */}
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return <PaginationEllipsis key={`${pageNumber}-${index}`} />;
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={currentPage === pageNumber}
                    onClick={() => handlePageChange(pageNumber as number)}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Tombol "Berikutnya" */}
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}

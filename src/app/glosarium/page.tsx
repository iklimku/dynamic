"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import glossaryJson from "@/../public/data/glosarium.json";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const filteredGlossary = glossaryJson.filter(({ term }) => {
    const matchesSearch = term.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter
      ? term.startsWith(selectedLetter)
      : true;
    return matchesSearch && matchesLetter;
  });

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">Glosarium</h1>

      <Input
        placeholder="Cari istilah..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() =>
              setSelectedLetter(letter === selectedLetter ? "" : letter)
            }
            className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
              selectedLetter === letter
                ? "bg-[var(--bmkggreen1)] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-[var(--bmkggreen3)]"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {filteredGlossary.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada istilah ditemukan.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredGlossary.map(({ term, definition }) => (
            <Card key={term} className="shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-[var(--bmkgcyan)] mb-2">
                  {term}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {definition}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

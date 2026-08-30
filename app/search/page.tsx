"use client"

import { useEffect, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { CardsComponent } from "@/components/CardsComponent";
import { bookObject, booksArrayType } from "@/types/dataTypes";
import { Button } from "@/components/ui/button";

const getSearchResults = async (term: string): Promise<booksArrayType> => {
  const searchTerm = term.trim() || "fiction";

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year,description`
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  return (data?.docs || []).map((book: any) => ({
    ...book,
    id: book.key,
  })) as booksArrayType;
};

export default function SearchPage() {
  const [query, setQuery] = useState("fiction");
  const [searchValue, setSearchValue] = useState("fiction");
  const [books, setBooks] = useState<booksArrayType>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialBooks = async () => {
      setLoading(true);
      const results = await getSearchResults("fiction");
      setBooks(results);
      setLoading(false);
    };

    loadInitialBooks();
  }, []);

  const handleSearch = async () => {
    const trimmed = searchValue.trim();
    const activeQuery = trimmed || "fiction";

    setQuery(activeQuery);
    setLoading(true);
    const results = await getSearchResults(activeQuery);
    setBooks(results);
    setLoading(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 py-10 sm:px-6 lg:px-0">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-[28px] border border-[oklch(0.82_0.16_82)]/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,245,226,0.8))] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:bg-[linear-gradient(135deg,rgba(24,24,27,0.96),rgba(39,39,42,0.9))] sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[oklch(0.82_0.16_82)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.82_0.16_82)]">
              <Sparkles className="h-3.5 w-3.5" />
              Search library
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Find your next great read
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              Explore fiction, fantasy, history, romance, and more from one clean, searchable library.
            </p>
          </div>

          <div className="w-full max-w-xl">
            <div className="flex h-[54px] items-center overflow-hidden rounded-[16px] border border-[oklch(0.82_0.16_82)]/40 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:bg-[#1d1d1d]">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search for books, authors, genres..."
                className="h-full w-full border-0 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground sm:text-base"
              />
              <Button
                onClick={handleSearch}
                className="m-1 h-[42px] rounded-[12px] bg-[oklch(0.82_0.16_82)] px-5 text-white hover:bg-[oklch(0.74_0.16_82)]"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[oklch(0.82_0.16_82)]">
              Results
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {query ? `Showing results for “${query}”` : "All books"}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-[22px] border border-border bg-muted/40"
              />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.filter((item) => item.cover_i || item.title).map((item, index) => (
              <CardsComponent
                key={`${item.id}-${index}`}
                id={item.id?.split("/").pop() || item.id || String(index)}
                author_name={item.author_name || ["Unknown author"]}
                cover_i={item.cover_i}
                first_publish_year={item.first_publish_year || 0}
                title={item.title || "Untitled Book"}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-border bg-muted/20 p-10 text-center">
            <p className="text-lg font-semibold">No books found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword such as fiction, history, romance, or mystery.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
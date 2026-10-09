
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Card, Input, Chip, Button } from "@heroui/react";

import tiles from "@/data/tiles.json";

export default function AllTiles() {
  const [search, setSearch] = useState("");

  const filteredTiles = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return tiles;
    }

    return tiles.filter((tile) =>
      tile.title.toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Explore Collection
          </p>

          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            All Tiles
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Browse our complete collection and find the perfect tile
            for your space.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search tiles"
              placeholder="Search by tile title..."
              variant="bordered"
              size="lg"
              aria-label="Search tiles by title"
              classNames={{
                inputWrapper:
                  "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700",
                label:
                  "text-gray-700 dark:text-gray-300",
                input:
                  "text-gray-900 dark:text-white",
              }}
            />

            {/* Custom Clear Button */}
            {search && (
              <button
                type="button"
                onClick={() => setSearch()}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredTiles.length}
            </span>{" "}
            {filteredTiles.length === 1 ? "tile" : "tiles"}
          </p>

          {search && (
            <Button
              size="sm"
              variant="flat"
              onPress={() => setSearch("")}
              className="text-violet-600 dark:text-violet-400"
            >
              Clear Search
            </Button>
          )}
        </div>

        {/* Tiles */}
        {filteredTiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTiles.map((tile) => (
              <Card
                key={tile.id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3">
                    <Chip
                      size="sm"
                      color="secondary"
                      variant="solid"
                    >
                      {tile.category}
                    </Chip>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                    {tile.title}
                  </h2>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                      ${tile.price}
                    </span>

                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ⭐ {tile.rating}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-3 mb-5">
                    {tile.description}
                  </p>

                  <Link
                    href={`/tile/${tile.id}`}
                    className="block w-full"
                  >
                    <Button className="w-full bg-violet-600 text-white hover:bg-violet-700">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">
                🔍
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No tiles found
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try searching with a different tile title.
              </p>

              <Button
                onPress={() => setSearch("")}
                className="mt-6 bg-violet-600 text-white hover:bg-violet-700"
              >
                Show All Tiles
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

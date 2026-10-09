
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, Input, Chip, Button } from "@heroui/react";
import tiles from "@/data/tiles.json";

export default function AllTiles() {
  const [search, setSearch] = useState("");

  const filteredTiles = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return tiles;

    return tiles.filter((tile) =>
      tile.title.toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 transition-colors dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4">
        {/* Page Header */}
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Explore Collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            All Tiles
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Browse our complete collection and find the perfect tile
            for your space.
          </p>
        </header>

        {/* Search Input */}
        <div className="mx-auto mb-12 max-w-xl">
          <Input
            label="Search tiles"
            placeholder="Search by tile title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            variant="bordered"
            size="lg"
            aria-label="Search tiles by title"
          />

          {search && (
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              className="mt-3"
              onPress={() => setSearch("")}
            >
              Clear Search
            </Button>
          )}
        </div>

        {/* Result Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredTiles.length}
            </span>{" "}
            {filteredTiles.length === 1 ? "tile" : "tiles"}
          </p>
        </div>

        {/* Tiles Gallery */}
        {filteredTiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTiles.map((tile) => (
              <Card
                key={tile.id}
                className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Tile Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    width={500}
                    height={350}
                    className="h-56 w-full object-cover"
                  />
                </div>

                {/* Tile Details */}
                <div className="w-full p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
                    {tile.title}
                  </h2>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                      ${tile.price}
                    </span>

                    {tile.rating != null && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ⭐ {tile.rating}
                      </span>
                    )}
                  </div>

                  <p className="mb-5 mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {tile.description}
                  </p>

                  <Button
                    as={Link}
                    href={`/ tile / ${tile.id} `}
                    color="secondary"
                    className="w-full font-semibold"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty Search Results */
          <div className="flex min-h-75 items-center justify-center">
            <div className="text-center">
              <div className="mb-4 text-6xl">🔍</div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No tiles found
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try searching with a different tile title.
              </p>

              <Button
                color="secondary"
                className="mt-6"
                onPress={() => setSearch("")}
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


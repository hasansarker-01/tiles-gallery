"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, Input, Button } from "@heroui/react";
import tiles from "@/data/tiles.json";

export default function AllTiles() {
  const [search, setSearch] = useState("");
  const router = useRouter();


  const filteredTiles = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return tiles;

    return tiles.filter(
      (tile) =>
        tile.title?.toLowerCase().includes(value) ||
        tile.category?.toLowerCase().includes(value) ||
        tile.material?.toLowerCase().includes(value)
    );
  }, [search]);

  const openTile = (id) => {
    router.push(`/tile/${encodeURIComponent(String(id))}`);
  };

  return (
    <main className="min-h-screen bg-pink-100 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Explore Collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            All Tiles
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Browse our complete collection and find the perfect
            tile for your space.
          </p>
        </header>

        <div className="mx-auto mb-8 max-w-xl">
          <Input
            className={"w-full border-2 border-blue-500"}
            label="Search tiles"
            placeholder="Search by title, material..."
            value={search}
            onChange={(event) =>
              setSearch(
                typeof event === "string"
                  ? event
                  : event?.target?.value ?? ""
              )
            }
            variant="bordered"
            size="lg"
            aria-label="Search tiles"
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

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTiles.length}{" "}
          {filteredTiles.length === 1 ? "tile" : "tiles"}
        </p>

        {filteredTiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTiles.map((tile) => (
              <Card
                key={tile.id}
                className="group overflow-hidden border border-gray-200 bg-pink-300 shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                <button
                  type="button"
                  onClick={() => openTile(tile.id)}
                  className="relative block h-56 w-full overflow-hidden text-left"
                  aria-label={`View ${tile.title} details`}
                >
                  <Image
                    src={tile.image}
                    alt={tile.title || "Tile"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>

                <div className="w-full p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
                    {tile.title}
                  </h2>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                      {tile.currency || "USD"}{" "}
                      {Number(tile.price ?? 0).toFixed(2)}
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
                    type="button"
                    onPress={() => openTile(tile.id)}
                    className="w-full bg-violet-600 text-white hover:bg-violet-700"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 items-center justify-center">
            <div className="text-center">
              <div className="mb-4 text-6xl">🔍</div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No Tiles Found
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try a different title, category, or material.
              </p>

              <Button
                className="mt-5 bg-violet-600 text-white"
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

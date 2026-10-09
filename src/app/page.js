
"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Button,
  Card,
  Chip,
} from "@heroui/react";

import { ArrowRight } from "@gravity-ui/icons";

import tiles from "@/data/tiles.json";

export default function Home() {
  const featuredTiles = [...tiles]
    .sort((a, b) => {
      const ratingA = Number(a.rating || 0);
      const ratingB = Number(b.rating || 0);

      return ratingB - ratingA;
    })
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950" />

        {/* Decorative Shapes */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-violet-300/30 dark:bg-violet-600/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-300/30 dark:bg-purple-600/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-28 md:py-36">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

            {/* Hero Content */}
            <div className="text-center lg:text-left">

              <Chip
                color="secondary"
                variant="flat"
                className="mb-5"
              >
                ✦ Premium Tile Collection
              </Chip>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                Discover Your
                <span className="block text-violet-600 dark:text-violet-400">
                  Perfect Aesthetic
                </span>
              </h1>

              <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl leading-8 text-gray-600 dark:text-gray-400">
                Explore a curated collection of modern tiles designed
                to transform your home, office, and creative spaces.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

                <Link href="/all-tiles">
                  <Button
                    size="lg"
                    color="secondary"
                    endContent={<ArrowRight />}
                    className="w-full sm:w-auto px-8"
                  >
                    Browse Now
                  </Button>
                </Link>

                <Link href="#featured">
                  <Button
                    size="lg"
                    variant="bordered"
                    className="w-full sm:w-auto px-8 border-violet-400 text-violet-600 dark:text-violet-400"
                  >
                    Featured Tiles
                  </Button>
                </Link>

              </div>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-8">

                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tiles.length}+
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tile Designs
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    4.9
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Average Rating
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    100%
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quality
                  </p>
                </div>

              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">

              <div className="relative mx-auto max-w-lg">

                <div className="absolute -inset-4 rounded-[2rem] bg-violet-500/20 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/50 dark:border-gray-700 shadow-2xl">
                  <img
                    src={
                      featuredTiles[0]?.image ||
                      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={
                      featuredTiles[0]?.title ||
                      "Premium tile collection"
                    }
                    className="w-full h-[420px] md:h-[520px] object-cover"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">

                    <p className="text-sm text-white/70">
                      Featured Design
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-white">
                      {featuredTiles[0]?.title ||
                        "Modern Tile Design"}
                    </h2>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section className="overflow-hidden bg-violet-600 dark:bg-violet-700 py-4">

        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite]">

          <div className="inline-flex items-center gap-10 text-white font-semibold text-sm md:text-base">

            <span>✦ PREMIUM TILE COLLECTION</span>
            <span>✦ MODERN DESIGNS</span>
            <span>✦ ELEVATE YOUR SPACE</span>
            <span>✦ DISCOVER YOUR PERFECT AESTHETIC</span>
            <span>✦ PREMIUM TILE COLLECTION</span>
            <span>✦ MODERN DESIGNS</span>
            <span>✦ ELEVATE YOUR SPACE</span>
            <span>✦ DISCOVER YOUR PERFECT AESTHETIC</span>

          </div>

        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section
        id="featured"
        className="max-w-7xl mx-auto px-4 py-20"
      >

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Curated For You
            </p>

            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Featured Tiles
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              Discover our highest-rated designs selected from
              the Tiles Gallery collection.
            </p>
          </div>

          <Link href="/all-tiles">
            <Button
              variant="flat"
              color="secondary"
              endContent={<ArrowRight />}
            >
              View All
            </Button>
          </Link>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {featuredTiles.map((tile) => (
            <Card
              key={tile.id}
              className="group overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category */}
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

                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                  {tile.title}
                </h3>

                <div className="mt-2 flex items-center justify-between">

                  <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                    ${tile.price}
                  </span>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ⭐ {tile.rating || "4.8"}
                  </span>

                </div>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {tile.description}
                </p>

                <Link
                  href={`/tile/${tile.id}`}
                  className="block mt-5"
                >
                  <Button
                    color="secondary"
                    className="w-full"
                  >
                    View Details
                  </Button>
                </Link>

              </div>

            </Card>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-4 pb-20">

        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-r from-violet-600 to-purple-700 dark:from-violet-800 dark:to-purple-900">

          <div className="px-6 py-16 md:px-12 md:py-20 text-center">

            <p className="text-white/70 font-semibold uppercase tracking-widest text-sm">
              Find Your Style
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
              Ready to Transform Your Space?
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
              Browse our complete collection and discover tiles
              that perfectly match your vision.
            </p>

            <Link href="/all-tiles">
              <Button
                size="lg"
                className="mt-8 bg-white text-violet-700 font-semibold hover:bg-gray-100"
                endContent={<ArrowRight />}
              >
                Explore All Tiles
              </Button>
            </Link>

          </div>
        </div>

      </section>

    </main>
  );
}


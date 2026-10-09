"use client";

import Link from "next/link";

import {
    Card,
    Chip,
    Button,
} from "@heroui/react";

import tiles from "@/data/tiles.json";

export default function FeaturedTiles() {
    const featuredTiles = tiles.slice(0, 4);

    return (
        <section className="bg-white dark:bg-gray-950 transition-colors duration-300 py-16">
            <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                        Featured Collection
                    </p>

                    <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Featured Tiles
                    </h2>

                    <p className="mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                        Explore our top tile selections and discover a style
                        that matches your space.
                    </p>
                </div>

                {/* Tiles Grid */}
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
                                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
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
                                    <Button
                                        className="w-full bg-violet-600 text-white hover:bg-violet-700"
                                    >
                                        View Details
                                    </Button>
                                </Link>

                            </div>
                        </Card>
                    ))}

                </div>

                {/* View All */}
                <div className="flex justify-center mt-10">
                    <Link href="/all-tiles">
                        <Button
                            variant="bordered"
                            className="border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400 px-8"
                        >
                            View All Tiles
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function Banner() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-100 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full bg-violet-100 dark:bg-violet-900/40 px-4 py-2 mb-6">
                        <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                            ✨ Beautiful Tiles Collection
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                        Discover Your
                        <span className="block text-violet-600 dark:text-violet-400">
                            Perfect Aesthetic
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Explore our curated collection of beautiful tiles and
                        find the perfect style to transform your space.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                        <Link href="/all-tiles">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-violet-600 text-white hover:bg-violet-700 px-8"
                            >
                                Browse Now
                            </Button>
                        </Link>

                        <Link href="/register">
                            <Button
                                size="lg"
                                variant="bordered"
                                className="w-full sm:w-auto border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400 px-8"
                            >
                                Get Started
                            </Button>
                        </Link>

                    </div>

                </div>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-300/30 dark:bg-violet-700/20 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-300/30 dark:bg-purple-700/20 blur-3xl" />
        </section>
    );
}
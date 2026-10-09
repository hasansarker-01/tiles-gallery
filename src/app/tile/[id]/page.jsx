"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button, Chip, Spinner } from "@heroui/react";
import { ArrowLeft, Check, Xmark } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import tiles from "@/data/tiles.json";

export default function TileDetailsClient({ id }) {
    const router = useRouter();

    const [tile, setTile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Check authentication
    useEffect(() => {
        let cancelled = false;

        async function checkUser() {
            try {
                const session = await authClient.getSession();

                if (cancelled) return;

                if (!session?.data?.user) {
                    router.replace("/login");
                    return;
                }

                setCheckingAuth(false);
            } catch (error) {
                console.error("Authentication error:", error);

                if (!cancelled) {
                    router.replace("/login");
                }
            }
        }

        checkUser();

        return () => {
            cancelled = true;
        };
    }, [router]);

    // Find tile by route ID
    useEffect(() => {
        if (checkingAuth) return;

        const foundTile = tiles.find(
            (item) => String(item.id) === String(id)
        );

        setTile(foundTile || null);
        setLoading(false);
    }, [id, checkingAuth]);

    // Loading screen
    if (checkingAuth || loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" color="secondary" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Loading tile details...
                    </p>
                </div>
            </main>
        );
    }

    // Tile not found
    if (!tile) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
                <div className="text-center">
                    <div className="mb-5 text-7xl">🔍</div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Tile Not Found
                    </h1>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        The tile you are looking for does not exist.
                    </p>

                    <Button
                        as={Link}
                        href="/all-tiles"
                        className="mt-6 bg-violet-600 text-white hover:bg-violet-700"
                        startContent={<ArrowLeft />}
                    >
                        Back to All Tiles
                    </Button>
                </div>
            </main>
        );
    }

    // Tile details
    return (
        <main className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
                <div className="mb-8">
                    <Button
                        as={Link}
                        href="/all-tiles"
                        variant="flat"
                        startContent={<ArrowLeft />}
                        className="text-violet-600 dark:text-violet-400"
                    >
                        Back to All Tiles
                    </Button>
                </div>

                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Tile image */}
                        <div className="relative min-h-[350px] overflow-hidden lg:min-h-[650px]">
                            <img
                                src={tile.image}
                                alt={tile.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute left-5 top-5">
                                <Chip color="secondary" variant="solid" size="lg">
                                    {tile.category}
                                </Chip>
                            </div>

                            <div className="absolute right-5 top-5">
                                {tile.inStock ? (
                                    <Chip
                                        color="success"
                                        variant="solid"
                                        startContent={<Check />}
                                    >
                                        In Stock
                                    </Chip>
                                ) : (
                                    <Chip
                                        color="danger"
                                        variant="solid"
                                        startContent={<Xmark />}
                                    >
                                        Out of Stock
                                    </Chip>
                                )}
                            </div>
                        </div>

                        {/* Tile information */}
                        <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                                Tile Details
                            </p>

                            <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
                                {tile.title}
                            </h1>

                            <div className="mt-6 flex flex-wrap items-center gap-5">
                                <span className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                                    {tile.currency || "USD"}{" "}
                                    {Number(tile.price).toFixed(2)}
                                </span>

                                <span className="text-lg text-gray-600 dark:text-gray-400">
                                    ⭐ {tile.rating || "4.8"}
                                </span>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Description
                                </h2>

                                <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    {tile.description}
                                </p>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Creator
                                </h2>

                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {tile.creator || "Tiles Gallery Studio"}
                                </p>
                            </div>

                            <div className="mt-8">
                                <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                                    Style & Tags
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    <Chip variant="flat" color="secondary">
                                        {tile.category}
                                    </Chip>

                                    {tile.material && (
                                        <Chip variant="flat">
                                            {tile.material}
                                        </Chip>
                                    )}

                                    <Chip variant="flat">Premium</Chip>
                                    <Chip variant="flat">Modern</Chip>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Material
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        {tile.material || "Ceramic"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Dimensions
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        {tile.dimensions || "60 × 60 cm"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Currency
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        {tile.currency || "USD"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Availability
                                    </p>
                                    <p
                                        className={`mt-1 font-semibold ${tile.inStock
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {tile.inStock
                                            ? "Available"
                                            : "Unavailable"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Button
                                    as={Link}
                                    href="/all-tiles"
                                    size="lg"
                                    className="w-full bg-violet-600 text-white hover:bg-violet-700"
                                    startContent={<ArrowLeft />}
                                >
                                    Explore More Tiles
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
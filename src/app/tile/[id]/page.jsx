"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Button, Chip, Spinner } from "@heroui/react";
import { ArrowLeft, Check, Xmark } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import tiles from "@/data/tiles.json";

export default function TileDetails() {
    const params = useParams();
    const router = useRouter();

    const [tile, setTile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const session = await authClient.getSession();

                if (!session?.data?.user) {
                    router.replace("/login");
                    return;
                }

                setCheckingAuth(false);
            } catch (error) {
                console.error("Auth check error:", error);
                router.replace("/login");
            }
        };

        checkUser();
    }, [router]);

    useEffect(() => {
        if (checkingAuth) return;

        const foundTile = tiles.find(
            (item) => String(item.id) === String(params.id)
        );

        setTile(foundTile || null);
        setLoading(false);
    }, [params.id, checkingAuth]);

    if (checkingAuth || loading) {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" color="secondary" />

                    <p className="text-gray-600 dark:text-gray-400">
                        Loading tile details...
                    </p>
                </div>
            </main>
        );
    }

    if (!tile) {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-7xl mb-5">🔍</div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Tile Not Found
                    </h1>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        The tile you are looking for does not exist.
                    </p>

                    <Link href="/all-tiles">
                        <Button
                            className="mt-6 bg-violet-600 text-white hover:bg-violet-700"
                            startContent={<ArrowLeft />}
                        >
                            Back to All Tiles
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">

                {/* Back Button */}
                <div className="mb-8">
                    <Link href="/all-tiles">
                        <Button
                            variant="flat"
                            startContent={<ArrowLeft />}
                            className="text-violet-600 dark:text-violet-400"
                        >
                            Back to All Tiles
                        </Button>
                    </Link>
                </div>

                {/* Details Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Image */}
                        <div className="relative min-h-[350px] lg:min-h-[650px] overflow-hidden">
                            <img
                                src={tile.image}
                                alt={tile.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Category */}
                            <div className="absolute top-5 left-5">
                                <Chip
                                    color="secondary"
                                    variant="solid"
                                    size="lg"
                                >
                                    {tile.category}
                                </Chip>
                            </div>

                            {/* Stock */}
                            <div className="absolute top-5 right-5">
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

                        {/* Content */}
                        <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">

                            {/* Small Heading */}
                            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                                Tile Details
                            </p>

                            {/* Title */}
                            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                {tile.title}
                            </h1>

                            {/* Rating + Price */}
                            <div className="mt-6 flex flex-wrap items-center gap-5">
                                <span className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                                    ${tile.price}
                                </span>

                                <span className="text-lg text-gray-600 dark:text-gray-400">
                                    ⭐ {tile.rating || "4.8"}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Description
                                </h2>

                                <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    {tile.description}
                                </p>
                            </div>

                            {/* Creator */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Creator
                                </h2>

                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {tile.creator || "Tiles Gallery Studio"}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Style & Tags
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    <Chip
                                        variant="flat"
                                        color="secondary"
                                    >
                                        {tile.category}
                                    </Chip>

                                    {tile.material && (
                                        <Chip variant="flat">
                                            {tile.material}
                                        </Chip>
                                    )}

                                    <Chip variant="flat">
                                        Premium
                                    </Chip>

                                    <Chip variant="flat">
                                        Modern
                                    </Chip>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Material */}
                                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Material
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        {tile.material || "Ceramic"}
                                    </p>
                                </div>

                                {/* Dimensions */}
                                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Dimensions
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        {tile.dimensions || "60 × 60 cm"}
                                    </p>
                                </div>

                                {/* Currency */}
                                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Currency
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                        {tile.currency || "USD"}
                                    </p>
                                </div>

                                {/* Availability */}
                                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Availability
                                    </p>

                                    <p
                                        className={`mt-1 font-semibold ${tile.inStock
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {tile.inStock ? "Available" : "Unavailable"}
                                    </p>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-10">
                                <Link href="/all-tiles">
                                    <Button
                                        size="lg"
                                        className="w-full bg-violet-600 text-white hover:bg-violet-700"
                                        startContent={<ArrowLeft />}
                                    >
                                        Explore More Tiles
                                    </Button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
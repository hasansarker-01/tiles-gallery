
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, Button, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import tiles from "@/data/tiles.json";

function TileDetailsContent() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

                setIsAuthenticated(true);
            } catch (error) {
                console.error("Authentication error:", error);

                if (!cancelled) {
                    router.replace("/login");
                }
            } finally {
                if (!cancelled) {
                    setCheckingAuth(false);
                }
            }
        }

        checkUser();

        return () => {
            cancelled = true;
        };
    }, [router]);

    const tile = tiles.find(
        (item) => String(item.id) === String(id)
    );

    if (checkingAuth || !isAuthenticated) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="flex flex-col items-center gap-3">
                    <Spinner size="lg" color="secondary" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Checking authentication...
                    </p>
                </div>
            </main>
        );
    }

    if (!tile) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Tile Not Found
                    </h1>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        The tile you are looking for does not exist.
                    </p>

                    <Button
                        className="mt-6 bg-violet-600 text-white"
                        onPress={() => router.push("/all-tiles")}
                    >
                        Back to All Tiles
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl px-4">
                <Button
                    variant="flat"
                    onPress={() => router.push("/all-tiles")}
                    className="mb-8"
                >
                    ← Back to All Tiles
                </Button>

                <Card className="overflow-hidden border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative min-h-72 md:min-h-500px">
                            <Image
                                src={tile.image}
                                alt={tile.title || "Tile"}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="p-6 md:p-10">
                            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                                Tile Details
                            </p>

                            <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                                {tile.title}
                            </h1>

                            <p className="mt-5 text-2xl font-bold text-violet-600 dark:text-violet-400">
                                {tile.currency || "USD"}{" "}
                                {Number(tile.price ?? 0).toFixed(2)}
                            </p>

                            {tile.rating != null && (
                                <p className="mt-3 text-gray-700 dark:text-gray-300">
                                    ⭐ Rating: {tile.rating}
                                </p>
                            )}

                            <div className="mt-6 space-y-4">
                                {tile.category && (
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">
                                            Category:
                                        </span>{" "}
                                        {tile.category}
                                    </p>
                                )}

                                {tile.material && (
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">
                                            Material:
                                        </span>{" "}
                                        {tile.material}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Description
                                </h2>

                                <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                                    {tile.description ||
                                        "No description available for this tile."}
                                </p>
                            </div>

                            <Button
                                className="mt-8 w-full bg-violet-600 text-white hover:bg-violet-700"
                                onPress={() => router.push("/all-tiles")}
                            >
                                Explore More Tiles
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}

export default function TileDetailsPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                    <p className="text-gray-600 dark:text-gray-300">
                        Loading tile details...
                    </p>
                </main>
            }
        >
            <TileDetailsContent />
        </Suspense>
    );
}
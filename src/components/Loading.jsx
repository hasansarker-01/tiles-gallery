"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div className="flex flex-col items-center justify-center gap-4">

                <Spinner
                    size="lg"
                    color="secondary"
                    aria-label="Loading"
                />

                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Loading...
                </p>

            </div>
        </main>
    );
}
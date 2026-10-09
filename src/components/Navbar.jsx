
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
    Avatar,
    Button,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";



export default function Header() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadSession = async () => {
        try {
            const { data } = await authClient.getSession();

            setUser(data?.user || null);
        } catch (error) {
            console.error("Session error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSession();
    }, []);

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            setUser(null);

            window.location.href = "/login";
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">

            <nav className="max-w-7xl mx-auto px-4">

                <div className="min-h-20 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 shrink-0"
                    >
                        {/* <Image
                            src={""}
                            alt="Tiles Gallery"
                            width={55}
                            height={55}
                            className="w-12 h-12 object-contain"
                        /> */}

                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Tiles Gallery
                            </h1>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Discover Your Perfect Aesthetic
                            </p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-2">

                        <Link href="/">
                            <Button
                                variant="light"
                                className="text-gray-700 dark:text-gray-200"
                            >
                                Home
                            </Button>
                        </Link>

                        <Link href="/all-tiles">
                            <Button
                                variant="light"
                                className="text-gray-700 dark:text-gray-200"
                            >
                                All Tiles
                            </Button>
                        </Link>

                        {user && (
                            <Link href="/my-profile">
                                <Button
                                    variant="light"
                                    className="text-gray-700 dark:text-gray-200"
                                >
                                    My Profile
                                </Button>
                            </Link>
                        )}

                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">

                        {!loading && !user && (
                            <Link href="/login">
                                <Button
                                    color="secondary"
                                    variant="solid"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}

                        {!loading && user && (
                            <>
                                <Link href="/my-profile">
                                    <Avatar
                                        src={user.image || undefined}
                                        name={user.name || "User"}
                                        isBordered
                                        color="secondary"
                                        className="w-9 h-9 cursor-pointer"
                                    />
                                </Link>

                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={handleLogout}
                                    className="hidden sm:flex"
                                >
                                    Logout
                                </Button>
                            </>
                        )}

                    </div>

                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden pb-3 flex items-center justify-center gap-1 overflow-x-auto">

                    <Link href="/">
                        <Button
                            size="sm"
                            variant="light"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            Home
                        </Button>
                    </Link>

                    <Link href="/all-tiles">
                        <Button
                            size="sm"
                            variant="light"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            All Tiles
                        </Button>
                    </Link>

                    {user && (
                        <Link href="/my-profile">
                            <Button
                                size="sm"
                                variant="light"
                                className="text-gray-700 dark:text-gray-200"
                            >
                                Profile
                            </Button>
                        </Link>
                    )}

                    {user && (
                        <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            onPress={handleLogout}
                        >
                            Logout
                        </Button>
                    )}

                </div>

            </nav>
        </header>
    );
}


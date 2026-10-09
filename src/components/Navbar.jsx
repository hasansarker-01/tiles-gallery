
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Logo = "/images/tials/Lgog.jpg";

export default function Header() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    const loadSession = useCallback(async () => {
        try {
            const { data } = await authClient.getSession();
            setUser(data?.user ?? null);
        } catch (error) {
            console.error("Session error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSession();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                loadSession();
            }
        };

        window.addEventListener("focus", loadSession);
        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {
            window.removeEventListener("focus", loadSession);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [loadSession]);

    const openLogoutModal = () => {
        setLogoutError("");
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        if (logoutLoading) return;
        setShowLogoutModal(false);
        setLogoutError("");
    };

    const handleLogout = async () => {
        setLogoutLoading(true);
        setLogoutError("");

        try {
            const result = await authClient.signOut();

            if (result?.error) {
                throw new Error(
                    result.error.message || "Logout failed."
                );
            }

            setShowLogoutModal(false);
            setUser(null);
            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            setLogoutError(
                error?.message || "Logout failed. Please try again."
            );
        } finally {
            setLogoutLoading(false);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-teal-400/30 `bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-black shadow-lg">
                <nav className="mx-auto max-w-7xl px-4">
                    <div className="flex min-h-20 items-center justify-between gap-3">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex shrink-0 items-center gap-3"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-400 p-2 text-slate-950 shadow-md">
                                <Image
                                    src={Logo}
                                    alt="Tiles Gallery Logo"
                                    width={50}
                                    height={50}
                                    priority
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            </div>

                            <div>
                                <h1 className="text-lg font-extrabold tracking-tight text-violet-700 sm:text-xl">
                                    Tiles Gallery
                                </h1>
                                <p className="hidden text-xs text-teal-700 sm:block">
                                    Discover Your Perfect Aesthetic
                                </p>
                            </div>
                        </Link>

                        {/* Desktop navigation */}
                        <div className="hidden items-center gap-2 md:flex">
                            <Link
                                href="/"
                                className="rounded-lg px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-teal-200"
                            >
                                Home
                            </Link>

                            <Link
                                href="/all-tiles"
                                className="rounded-lg px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-teal-200"
                            >
                                All Tiles
                            </Link>

                            {user && (
                                <Link
                                    href="/my-profile"
                                    className="rounded-lg px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-teal-200"
                                >
                                    My Profile
                                </Link>
                            )}
                        </div>

                        {/* Authentication actions */}
                        <div className="flex items-center gap-2">
                            {!loading && !user && (
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center rounded-xl bg-teal-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
                                >
                                    Login
                                </Link>
                            )}

                            {user && (
                                <>
                                    <Link
                                        href="/my-profile"
                                        aria-label="My profile"
                                    >
                                        <Avatar
                                            src={user.image || undefined}
                                            name={user.name || user.email || "User"}
                                            color="success"
                                            className="h-9 w-9 cursor-pointer"
                                        />
                                    </Link>

                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="flat"
                                        onPress={openLogoutModal}
                                        className="font-semibold"
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </div>


                    </div>

                    {/* Mobile navigation */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-3 md:hidden">
                        <Link
                            href="/"
                            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                        >
                            Home
                        </Link>

                        <Link
                            href="/all-tiles"
                            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                        >
                            All Tiles
                        </Link>

                        {user && (
                            <Link
                                href="/my-profile"
                                className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                            >
                                Profile
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            {/* Logout confirmation modal */}
            {showLogoutModal && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeLogoutModal();
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="logout-title"
                        aria-describedby="logout-description"
                        className="w-full max-w-md rounded-2xl border border-slate-200/15 bg-slate-950 p-6 text-white shadow-2xl"
                    >
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-red-400"
                                aria-hidden="true"
                            >
                                <path d="M10 17l5-5-5-5" />
                                <path d="M15 12H3" />
                                <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                            </svg>
                        </div>

                        <h2
                            id="logout-title"
                            className="text-center text-2xl font-bold"
                        >
                            Confirm Logout
                        </h2>

                        <p
                            id="logout-description"
                            className="mt-3 text-center text-sm leading-6 text-slate-300"
                        >
                            Are you sure you want to log out of your account?
                            You will need to log in again to access your profile.
                        </p>

                        {logoutError && (
                            <div
                                role="alert"
                                className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
                            >
                                {logoutError}
                            </div>
                        )}

                        <div className="mt-6 flex gap-3">
                            <Button
                                variant="bordered"
                                onPress={closeLogoutModal}
                                isDisabled={logoutLoading}
                                className="flex-1 border-slate-600 text-white hover:bg-white/10"
                            >
                                Cancel
                            </Button>

                            <Button
                                color="danger"
                                onPress={handleLogout}
                                isLoading={logoutLoading}
                                isDisabled={logoutLoading}
                                className="flex-1 font-semibold"
                            >
                                {logoutLoading
                                    ? "Logging out..."
                                    : "Confirm Logout"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
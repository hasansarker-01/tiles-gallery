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

    const navLinkClass =
        "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600";

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-teal-200 bg-green-200 from-teal-100 via-cyan-100 to-blue-100 text-black shadow-lg">
                <nav className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
                    {/* Main navigation */}
                    <div className="flex min-h-20 items-center justify-between gap-3">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-white p-1.5 shadow-sm sm:h-14 sm:w-14 sm:p-2">
                                <Image
                                    src={Logo}
                                    alt="Tiles Gallery Logo"
                                    width={50}
                                    height={50}
                                    priority
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            </div>

                            <div className="min-w-0">
                                <h1 className="truncate text-base font-extrabold tracking-tight text-black sm:text-xl">
                                    Tiles Gallery
                                </h1>

                                <p className="hidden text-xs text-black/70 sm:block">
                                    Discover Your Perfect Aesthetic
                                </p>
                            </div>
                        </Link>

                        {/* Desktop navigation */}
                        <div className="hidden items-center gap-1 md:flex lg:gap-2">
                            <Link
                                href="/"
                                className={navLinkClass}
                            >
                                Home
                            </Link>

                            <Link
                                href="/all-tiles"
                                className={navLinkClass}
                            >
                                All Tiles
                            </Link>

                            {user && (
                                <Link
                                    href="/my-profile"
                                    className={navLinkClass}
                                >
                                    My Profile
                                </Link>
                            )}
                        </div>

                        {/* Authentication actions */}
                        <div className="flex shrink-0 items-center gap-2">
                            {!loading && !user && (
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center rounded-xl border border-teal-600 bg-teal-500 px-3 py-2 text-sm font-bold text-black shadow-sm transition hover:bg-teal-400 sm:px-5"
                                >
                                    Login
                                </Link>
                            )}

                            {user && (
                                <>
                                    <Link
                                        href="/my-profile"
                                        aria-label="My profile"
                                        className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                                    >
                                        <Avatar
                                            src={user.image || undefined}
                                            name={
                                                user.name ||
                                                user.email ||
                                                "User"
                                            }
                                            color="success"
                                            className="h-9 w-9 cursor-pointer border-2 border-white shadow-sm"
                                        />
                                    </Link>

                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="flat"
                                        onPress={openLogoutModal}
                                        className="bg-red-100 font-semibold text-red-800 hover:bg-red-200"
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile navigation */}
                    <div className="-mx-3 flex w-[calc(100%+1.5rem)] items-center gap-2 overflow-x-auto border-t border-teal-200 bg-teal-200/80 px-3 py-2 md:hidden">
                        <Link
                            href="/"
                            className={navLinkClass}
                        >
                            Home
                        </Link>

                        <Link
                            href="/all-tiles"
                            className={navLinkClass}
                        >
                            All Tiles
                        </Link>

                        {user && (
                            <Link
                                href="/my-profile"
                                className={navLinkClass}
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

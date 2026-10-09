
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Avatar,
    Button,
    Card,
    Spinner,
} from "@heroui/react";

import { Pencil, ArrowLeft } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

export default function MyProfile() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await authClient.getSession();

                if (error || !data?.user) {
                    router.replace("/login");
                    return;
                }

                setUser(data.user);
            } catch (error) {
                console.error("Profile error:", error);
                router.replace("/login");
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" color="secondary" />

                    <p className="text-gray-600 dark:text-gray-400">
                        Loading profile...
                    </p>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10 md:py-16 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">

                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/">
                        <Button
                            variant="flat"
                            startContent={<ArrowLeft />}
                            className="text-violet-600 dark:text-violet-400"
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Profile Card */}
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
                    <div className="p-6 md:p-10">

                        {/* Profile Header */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                            {/* Avatar */}
                            <Avatar
                                src={user.image || undefined}
                                name={user.name || "User"}
                                
                                color="secondary"
                                className="w-28 h-28 text-3xl"
                            />

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-sm uppercase tracking-widest font-semibold text-violet-600 dark:text-violet-400">
                                    My Profile
                                </p>

                                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    {user.name || "User"}
                                </h1>

                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>

                            {/* Edit */}
                            <Link href="/my-profile/update">
                                <Button
                                    color="secondary"
                                    startContent={<Pencil />}
                                >
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

                        {/* Account Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Account Information
                            </h2>

                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Your account details are shown below.
                            </p>
                        </div>

                        {/* Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                            {/* Name */}
                            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Full Name
                                </p>

                                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.name || "Not available"}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Email Address
                                </p>

                                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white break-all">
                                    {user.email || "Not available"}
                                </p>
                            </div>

                            {/* Photo */}
                            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Profile Photo
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white break-all">
                                    {user.image || "No photo URL"}
                                </p>
                            </div>

                            {/* User ID */}
                            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    User ID
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white break-all">
                                    {user.id || "Not available"}
                                </p>
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="mt-8 flex justify-center md:justify-end">
                            <Link href="/all-tiles">
                                <Button
                                    variant="bordered"
                                    color="secondary"
                                >
                                    Browse Tiles
                                </Button>
                            </Link>
                        </div>

                    </div>
                </Card>
            </div>
        </main>
    );
}


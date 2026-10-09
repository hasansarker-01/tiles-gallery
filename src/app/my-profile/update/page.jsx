
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Avatar,
    Button,
    Card,
    Form,
    Input,
    Label,
    Spinner,
    TextField,
    FieldError,
} from "@heroui/react";

import { ArrowLeft, Check } from "@gravity-ui/icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name")?.toString().trim();
        const image = formData.get("image")?.toString().trim();

        if (!name) {
            toast.error("Please enter your name");
            return;
        }

        if (!image) {
            toast.error("Please enter your photo URL");
            return;
        }

        try {
            setSaving(true);

            const { data, error } = await authClient.updateUser({
                name,
                image,
            });

            if (error) {
                console.error("Update profile error:", error);

                toast.error(
                    error.message || "Failed to update profile"
                );

                return;
            }

            setUser((previousUser) => ({
                ...previousUser,
                ...data?.user,
                name,
                image,
            }));

            toast.success("Profile updated successfully!");

            await new Promise((resolve) => setTimeout(resolve, 1000));

            router.replace("/my-profile");
            router.refresh();
        } catch (error) {
            console.error("Unexpected error:", error);

            toast.error("Something went wrong. Please try again.");
        } finally {
            setSaving(false);
        }
    };

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
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10 md:py-16 transition-colors duration-300">
                <div className="max-w-2xl mx-auto">

                    {/* Back */}
                    <div className="mb-6">
                        <Link href="/my-profile">
                            <Button
                                variant="flat"
                                startContent={<ArrowLeft />}
                                className="text-violet-600 dark:text-violet-400"
                            >
                                Back to Profile
                            </Button>
                        </Link>
                    </div>

                    {/* Card */}
                    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
                        <div className="p-6 md:p-10">

                            {/* Header */}
                            <div className="text-center mb-8">
                                <Avatar
                                    src={user.image || undefined}
                                    name={user.name || "User"}
                                    isBordered
                                    color="secondary"
                                    className="w-24 h-24 mx-auto text-2xl"
                                />

                                <h1 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                                    Update Profile
                                </h1>

                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Update your name and profile photo.
                                </p>
                            </div>

                            {/* Form */}
                            <Form
                                className="flex flex-col gap-6"
                                onSubmit={handleSubmit}
                            >

                                {/* Name */}
                                <TextField
                                    isRequired
                                    name="name"
                                    defaultValue={user.name || `""`}
                                    validate={(value) => {
                                        if (!value?.trim()) {
                                            return "Name is required";
                                        }

                                        return null;
                                    }}
                                    className="w-full"
                                >
                                    <Label className="text-gray-700 dark:text-gray-300">
                                        Name
                                    </Label>

                                    <Input
                                        aria-label="Name"
                                        placeholder="Enter your name"
                                    />

                                    <FieldError />
                                </TextField>

                                {/* Email - Read Only */}
                                <TextField
                                    name="email"
                                    defaultValue={user.email || ""}
                                    className="w-full"
                                >
                                    <Label className="text-gray-700 dark:text-gray-300">
                                        Email
                                    </Label>

                                    <Input
                                        aria-label="Email"
                                        readOnly
                                        className="opacity-70"
                                    />
                                </TextField>

                                {/* Photo URL */}
                                <TextField
                                    isRequired
                                    name="image"
                                    type="url"
                                    defaultValue={user.image || ""}
                                    validate={(value) => {
                                        if (!value?.trim()) {
                                            return "Photo URL is required";
                                        }

                                        try {
                                            new URL(value);
                                            return null;
                                        } catch {
                                            return "Please enter a valid photo URL";
                                        }
                                    }}
                                    className="w-full"
                                >
                                    <Label className="text-gray-700 dark:text-gray-300">
                                        Photo URL
                                    </Label>

                                    <Input
                                        aria-label="Photo URL"
                                        placeholder="https://example.com/photo.jpg"
                                    />

                                    <FieldError />
                                </TextField>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    color="secondary"
                                    isDisabled={saving}
                                    startContent={<Check />}
                                    className="w-full"
                                >
                                    {saving
                                        ? "Updating Profile..."
                                        : "Update Profile"}
                                </Button>
                            </Form>

                        </div>
                    </Card>
                </div>
            </main>

            <ToastContainer position="top-right" />
        </>
    );
}


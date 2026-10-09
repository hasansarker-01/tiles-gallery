
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Button,
    Form,
    Input,
    Label,
    TextField,
    FieldError,
} from "@heroui/react";

import { Check } from "@gravity-ui/icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authClient } from "@/lib/auth-client";

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const image = formData.get("image");
        const password = formData.get("password");

        if (!name?.trim()) {
            toast.error("Please enter your name");
            return;
        }

        if (!email?.trim()) {
            toast.error("Please enter your email");
            return;
        }

        if (!image?.trim()) {
            toast.error("Please enter your photo URL");
            return;
        }

        if (!password) {
            toast.error("Please enter your password");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
                image: image.trim(),
            });

            if (error) {
                console.error("Registration error:", error);

                toast.error(
                    error.message || "Registration failed. Please try again."
                );

                return;
            }

            console.log("Registration successful:", data);

            toast.success("Account created successfully!");

            await new Promise((resolve) => setTimeout(resolve, 1000));

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error("Unexpected registration error:", error);

            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950 flex items-center justify-center px-4 py-10 transition-colors duration-300">
                <div className="w-full max-w-md">

                    {/* Register Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-violet-100 dark:border-gray-800 p-8">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-4">
                                <span className="text-3xl">✨</span>
                            </div>

                            <h1 className="text-4xl font-bold text-violet-700 dark:text-violet-400">
                                Create Account
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Join Tiles Gallery today
                            </p>
                        </div>

                        {/* Form */}
                        <Form
                            className="flex flex-col gap-5"
                            onSubmit={onSubmit}
                        >

                            {/* Name */}
                            <TextField
                                isRequired
                                name="name"
                                validate={(value) => {
                                    if (!value?.trim()) {
                                        return "Name is required";
                                    }

                                    return null;
                                }}
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

                            {/* Email */}
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            value
                                        )
                                    ) {
                                        return "Please enter a valid email address";
                                    }

                                    return null;
                                }}
                            >
                                <Label className="text-gray-700 dark:text-gray-300">
                                    Email
                                </Label>

                                <Input
                                    aria-label="Email"
                                    placeholder="john@example.com"
                                />

                                <FieldError />
                            </TextField>

                            {/* Photo URL */}
                            <TextField
                                isRequired
                                name="image"
                                type="url"
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

                            {/* Password */}
                            <TextField
                                isRequired
                                name="password"
                                type="password"
                                validate={(value) => {
                                    if (!value) {
                                        return "Password is required";
                                    }

                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }

                                    return null;
                                }}
                            >
                                <Label className="text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>

                                <Input
                                    aria-label="Password"
                                    placeholder="Minimum 8 characters"
                                />

                                <FieldError />
                            </TextField>

                            {/* Submit */}
                            <Button
                                type="submit"
                                isDisabled={loading}
                                className="w-full bg-violet-600 text-white hover:bg-violet-700 mt-2"
                            >
                                <Check />

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </Button>
                        </Form>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}

                                <Link
                                    href="/login"
                                    className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </main>

            <ToastContainer position="top-right" />
        </>
    );
}


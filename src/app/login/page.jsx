"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    Button,
    Card,
    Form,
    Input,
    Label,
    TextField,
    FieldError,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: email.trim(),
                password,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password.");
                return;
            }

            if (data) {
                toast.success("Login successful!");
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Google login failed.");
            }
        } catch (error) {
            toast.error(error.message || "Google login failed.");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12 transition-colors duration-300">
            <Card className="w-full max-w-md p-6 md:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="text-center mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                        Welcome Back
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        Login to Tiles Gallery
                    </h1>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Sign in to explore your personalized tile collection.
                    </p>
                </div>

                <Form onSubmit={handleLogin} className="w-full space-y-5">
                    <TextField
                        name="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        isRequired
                        className="w-full"
                    >
                        <Label className="text-gray-700 dark:text-gray-300">
                            Email
                        </Label>

                        <Input
                            placeholder="Enter your email"
                            className="text-gray-900 dark:text-white"
                        />

                        <FieldError className="text-red-500" />
                    </TextField>

                    <TextField
                        name="password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        isRequired
                        className="w-full"
                    >
                        <Label className="text-gray-700 dark:text-gray-300">
                            Password
                        </Label>

                        <Input
                            placeholder="Enter your password"
                            className="text-gray-900 dark:text-white"
                        />

                        <FieldError className="text-red-500" />
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="w-full bg-violet-600 text-white hover:bg-violet-700"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Form>

                <div className="flex items-center gap-3 my-6">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                </div>

                <Button
                    type="button"
                    variant="bordered"
                    isDisabled={googleLoading}
                    onPress={handleGoogleLogin}
                    className="w-full border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                >
                    {googleLoading ? "Connecting..." : "Continue with Google"}
                </Button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                    >
                        Register
                    </Link>
                </p>

                <Link
                    href="/"
                    className="text-center text-sm text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 mt-4"
                >
                    ← Back to Home
                </Link>
            </Card>
        </main>
    );
}
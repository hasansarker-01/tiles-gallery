"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        const isDark = savedTheme === "dark";

        document.documentElement.classList.toggle("dark", isDark);
        setDark(isDark);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newDark = !dark;

        document.documentElement.classList.toggle("dark", newDark);
        localStorage.setItem("theme", newDark ? "dark" : "light");

        setDark(newDark);
    };

    if (!mounted) {
        return (
            <Button
                isIconOnly
                variant="flat"
                aria-label="Toggle theme"
                className="w-10 h-10"
            >
                🌙
            </Button>
        );
    }

    return (
        <Button
            isIconOnly
            variant="flat"
            onPress={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-10 h-10 text-xl"
        >
            {dark ? "☀️" : "🌙"}
        </Button>
    );
}
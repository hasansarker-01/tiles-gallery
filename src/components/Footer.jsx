
"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-violet-200 dark:bg-gray-900 border-t border-blue-700 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-violet-700"
                        >
                            Tiles Gallery
                        </Link>

                        <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                            Discover beautiful tiles and find the perfect
                            style for your home and creative spaces.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-400">
                            <li><Link href="/" className="hover:text-violet-600">Home</Link></li>
                            <li><Link href="/all-tiles" className="hover:text-violet-600">All Tiles</Link></li>
                            <li><Link href="/login" className="hover:text-violet-600">Login</Link></li>
                            <li><Link href="/register" className="hover:text-violet-600">Register</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Explore
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li>Modern Tiles</li>
                            <li>Minimalist Designs</li>
                            <li>Interior Inspiration</li>
                            <li>Premium Collection</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Contact Us
                        </h3>

                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Have questions about our tile collection?
                            Get in touch with us.
                        </p>

                        <a
                            href="mailto:hello@tilesgallery.com"
                            className="inline-block mt-3 text-sm font-medium text-violet-600 hover:underline"
                        >
                            Send us an email
                        </a>

                        <div className="flex gap-4 mt-5 text-sm font-medium">
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-violet-600">Facebook</a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-violet-600">Instagram</a>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                    <p>© 2026 Tiles Gallery. All rights reserved.</p>
                    <p>Designed with care for beautiful spaces.</p>
                </div>
            </div>
        </footer>
    );
}


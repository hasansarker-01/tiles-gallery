"use client";

export default function Marquee() {
    return (
        <section className="overflow-hidden bg-violet-600 dark:bg-violet-700 py-3">
            <div className="whitespace-nowrap animate-marquee">
                <span className="mx-8 text-sm md:text-base font-semibold text-white">
                    ✨ Discover Your Perfect Aesthetic
                </span>

                <span className="mx-8 text-sm md:text-base font-semibold text-white">
                    🏠 Beautiful Tiles for Every Space
                </span>

                <span className="mx-8 text-sm md:text-base font-semibold text-white">
                    ✨ Modern • Minimal • Classic • Luxury
                </span>

                <span className="mx-8 text-sm md:text-base font-semibold text-white">
                    🏠 Transform Your Space Today
                </span>

                <span className="mx-8 text-sm md:text-base font-semibold text-white">
                    ✨ Discover Your Perfect Aesthetic
                </span>
            </div>
        </section>
    );
}
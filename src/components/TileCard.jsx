import Image from "next/image";
import Link from "next/link";

export default function TileCard({ tile }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-default-200 bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <Link href={`/tile/${tile.id}`}>
                <div className="relative h-64 w-full overflow-hidden bg-default-100">
                    <Image
                        src={tile.image}
                        alt={tile.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Category */}
                    <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold capitalize backdrop-blur-sm">
                        {tile.category}
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col gap-4 p-5">
                <div>
                    <h2 className="line-clamp-1 text-lg font-bold">
                        {tile.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-default-500">
                        {tile.description}
                    </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 border-y border-default-200 py-3 text-xs">
                    <div>
                        <p className="text-default-400">Material</p>
                        <p className="mt-1 font-medium">{tile.material}</p>
                    </div>

                    <div>
                        <p className="text-default-400">Size</p>
                        <p className="mt-1 font-medium">{tile.dimensions}</p>
                    </div>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-default-400">Price</p>
                        <p className="text-xl font-bold text-primary">
                            ${tile.price}
                        </p>
                    </div>

                    <Link
                        href={`/tile/${tile.id}`}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        View Details
                        <span className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
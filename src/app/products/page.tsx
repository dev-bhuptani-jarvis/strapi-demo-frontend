import Link from "next/link";
import PageHero from "components/site/PageHero";
import SiteShell from "components/site/SiteShell";
import { getProducts } from "services/product.service";
import Image from "next/image";
import { Product, ProductsResponse } from "types/product.types";

export default async function ProductsPage() {
    const response: ProductsResponse = await getProducts();

    const products: Product[] = response.data;

    return (
        <SiteShell>
            <PageHero
                eyebrow="Products"
                title="A catalog layout that feels curated instead of crowded"
                description="Each product card now supports browsing with stronger hierarchy, calmer spacing, and clearer category and pricing cues."
                stats={[
                    {
                        label: "Available products",
                        value: String(products.length),
                    },
                    {
                        label: "Collections represented",
                        value: "3",
                    },
                    {
                        label: "Visual direction",
                        value: "Premium",
                    },
                ]}
            />

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                    {products.map((product: Product) => (
                        <Link
                            href={`/products/${product.slug}`}
                            key={product.id}
                            className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_18px_40px_rgba(28,25,23,0.08)]"
                        >
                            <div className="relative h-72 overflow-hidden bg-stone-100">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.images.url}`}
                                    alt={product.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                        {product.products.name}
                                    </span>

                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                                        Featured
                                    </span>
                                </div>

                                <h2 className="mt-5 text-2xl font-semibold text-stone-950">
                                    {product.title}
                                </h2>

                                <p className="mt-3 text-sm leading-7 text-stone-600">
                                    {product.shortDescription}
                                </p>

                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-2xl font-bold text-stone-950">
                                        Rs {product.price.toLocaleString("en-IN")}
                                    </p>

                                    <span className="text-sm font-semibold text-orange-600">
                                        View details
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </SiteShell>
    );
}

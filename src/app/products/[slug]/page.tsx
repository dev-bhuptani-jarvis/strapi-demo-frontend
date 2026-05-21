import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "components/site/PageHero";
import SiteShell from "components/site/SiteShell";
import {
    getProductBySlug,
    getProducts,
} from "services/product.service";
import { Product, ProductsResponse } from "types/product.types";

interface ProductDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const response: ProductsResponse = await getProducts();

    return response.data.map((product: Product) => ({
        slug: product.slug,
    }));
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const { slug } = await params;

    const product: Product | null = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const fullDescription =
        product.description
            ?.map((block) =>
                block.children?.map((child) => child.text).join("")
            )
            .join("\n") || "";

    return (
        <SiteShell>
            <PageHero
                eyebrow={product.products.name}
                title={product.title}
                description={fullDescription}
                stats={[
                    {
                        label: "Price",
                        value: `Rs ${product.price.toLocaleString("en-IN")}`,
                    },
                    {
                        label: "Category",
                        value: product.products.name,
                    },
                    {
                        label: "Visual direction",
                        value: "Premium",
                    },
                ]}
            />

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images.url}`}
                            alt={product.title}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>

                    <div className="grid gap-8">
                        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                                Product overview
                            </p>

                            <p className="mt-5 text-sm leading-8 text-stone-600">
                                {product.shortDescription}
                            </p>

                            <div className="mt-8 rounded-3xl bg-stone-50 p-6">
                                <p className="text-sm leading-7 text-stone-700">
                                    {fullDescription}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-stone-200 bg-stone-950 p-8 text-white shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
                                Continue browsing
                            </p>

                            <div className="mt-6 space-y-4">
                                <Link
                                    href="/products"
                                    className="block rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold transition hover:border-orange-300 hover:bg-white/10"
                                >
                                    Back to all products
                                </Link>

                                <Link
                                    href={`/category/${product.products.slug}`}
                                    className="block rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold transition hover:border-orange-300 hover:bg-white/10"
                                >
                                    Explore {product.products.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
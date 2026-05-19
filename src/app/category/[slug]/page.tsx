import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "components/site/PageHero";
import SiteShell from "components/site/SiteShell";
import {
    getCategories,
    getCategoryBySlug,
} from "services/category.service";
import {
    CategoriesResponse,
} from "types/category.types";

interface CategoryDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

interface CategoryProduct {
    id: number;
    title: string;
    slug: string;
    price?: number;
    shortDescription?: string;
}

interface CategoryPageData {
    categories?: CategoryProduct[];
}

export async function generateStaticParams() {
    const response: CategoriesResponse =
        await getCategories();

    return response.data.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryDetailPage({
    params,
}: CategoryDetailPageProps) {
    const { slug } = await params;

    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const categoryData =
        category as CategoryPageData;
    const products =
        categoryData.categories ?? [];

    return (
        <SiteShell>
            <PageHero
                eyebrow="Category"
                title={products[0]?.title || "Category collection"}
                description={`Explore premium ${products[0]?.title || "category"} products curated for modern shopping experiences.`}
                stats={[
                    {
                        label: "Products inside",
                        value: String(products.length),
                    },
                    {
                        label: "Merchandising style",
                        value: "Curated",
                    },
                    {
                        label: "Category intent",
                        value: "Focused",
                    },
                ]}
            />

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                                Inside this collection
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-stone-950">
                                Featured products
                            </h2>
                        </div>

                        <Link
                            href="/products"
                            className="text-sm font-semibold text-stone-600 transition hover:text-orange-600"
                        >
                            View full catalog
                        </Link>
                    </div>

                    {products.length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                            <h3 className="text-2xl font-bold text-stone-900">
                                No products found
                            </h3>

                            <p className="mt-3 max-w-md text-sm leading-7 text-stone-600">
                                This category does not have any products yet.
                            </p>

                            <Link
                                href="/products"
                                className="mt-6 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                            >
                                Browse all products
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {products.map(
                                (product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        className="rounded-3xl border border-stone-200 bg-stone-50 p-6 transition hover:border-orange-300 hover:bg-white"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                                            {
                                                product.title
                                            }
                                        </p>

                                        <h3 className="mt-4 text-2xl font-semibold text-stone-950">
                                            {product.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-stone-600">
                                            {
                                                product.shortDescription
                                            }
                                        </p>

                                        <div className="mt-6 text-sm font-semibold text-orange-600">
                                            Rs{" "}
                                            {product.price?.toLocaleString(
                                                "en-IN"
                                            )}
                                        </div>
                                    </Link>
                                )
                            )}
                        </div>
                    )}
                </div>
            </section>
        </SiteShell>
    );
}

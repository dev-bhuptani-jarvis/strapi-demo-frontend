import Link from "next/link";
import PageHero from "components/site/PageHero";
import SiteShell from "components/site/SiteShell";
import { getCategories } from "services/category.service";
import { CategoriesResponse, Category } from "types/category.types";

export default async function CategoryPage() {
    const response: CategoriesResponse = await getCategories();

    const categories: Category[] = response.data;
    
    return (
        <SiteShell>
            <PageHero
                eyebrow="Categories"
                title="Organize discovery around moods, spaces, and shopping intent"
                description="Categories are where browsing becomes clearer. Each collection now gets enough presentation to feel curated instead of looking like a plain list."
                stats={[
                    {
                        label: "Available collections",
                        value: String(categories.length),
                    },
                    {
                        label: "Catalog tone",
                        value: "Curated",
                    },
                    {
                        label: "Navigation style",
                        value: "Guided",
                    },
                ]}
            />

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {categories.map((category: Category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="group rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_18px_40px_rgba(28,25,23,0.08)]"
                        >
                            <h2 className="text-3xl font-bold text-stone-950">
                                {category.name}
                            </h2>

                            <p className="mt-4 text-sm leading-8 text-stone-600">
                                Browse premium {category.name?.toLowerCase()} products curated for modern shopping experiences.
                            </p>

                            <div className="mt-6 text-sm font-semibold text-orange-600">
                                Explore collection →
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </SiteShell>
    );
}

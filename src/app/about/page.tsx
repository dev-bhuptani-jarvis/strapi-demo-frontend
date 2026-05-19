import PageHero from "components/site/PageHero";
import SiteShell from "components/site/SiteShell";
import {
    PanelsTopLeft,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

export default function AboutPage() {
    return (
        <SiteShell>
            <PageHero
                eyebrow="About"
                title="A cleaner ecommerce foundation built for content and confidence"
                description="This storefront pairs a design-led frontend with Strapi-ready structure, giving you a strong base for products, storytelling, and account-driven experiences."
            />

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
                        <h2 className="text-3xl font-bold text-stone-950">
                            What this frontend is designed to do well
                        </h2>
                        <p className="mt-5 text-sm leading-8 text-stone-600">
                            The goal here is not just to show pages, but to make
                            the product feel coherent from the first visit.
                            Navigation, category discovery, product presentation,
                            editorial content, and authentication now share one
                            visual rhythm instead of feeling stitched together.
                        </p>
                        <p className="mt-5 text-sm leading-8 text-stone-600">
                            That makes the app easier to grow into a fuller
                            Strapi-powered commerce experience without redesigning
                            the basics later.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                            <div className="w-fit rounded-2xl bg-orange-100 p-3 text-orange-600">
                                <PanelsTopLeft className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-2xl font-semibold text-stone-950">
                                Better structure
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                Shared navigation, page heroes, and catalog patterns
                                make the experience easier to scan and more pleasant
                                to extend.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                            <div className="w-fit rounded-2xl bg-amber-100 p-3 text-amber-700">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-2xl font-semibold text-stone-950">
                                Better trust
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                Auth flows and protected pages are now presented as
                                part of the same product, which improves perceived
                                quality and reliability.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-stone-200 bg-stone-950 p-8 text-white shadow-sm">
                            <div className="w-fit rounded-2xl bg-white/10 p-3 text-orange-300">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-2xl font-semibold">
                                Better momentum
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-stone-300">
                                With the UI system in place, the next step is mainly
                                plugging richer Strapi data into a frontend that now
                                already feels intentional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}

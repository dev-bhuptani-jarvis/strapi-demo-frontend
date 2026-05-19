import PageHero from "components/site/PageHero";
import SiteShell from "components/site/SiteShell";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <SiteShell>
            <PageHero
                eyebrow="Contact"
                title="Let customers reach a real team, not a dead-end page"
                description="A contact experience should reassure people that help is nearby. This page now presents support, location, and collaboration details in a more credible format."
            />

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="grid gap-6">
                        {[
                            {
                                icon: Mail,
                                title: "Email support",
                                value: "hello@strapicommerce.example",
                            },
                            {
                                icon: Phone,
                                title: "Call the studio",
                                value: "+91 98765 43210",
                            },
                            {
                                icon: MapPin,
                                title: "Visit by appointment",
                                value: "Ahmedabad, Gujarat, India",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm"
                            >
                                <div className="w-fit rounded-2xl bg-orange-100 p-3 text-orange-600">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h2 className="mt-5 text-2xl font-semibold text-stone-950">
                                    {item.title}
                                </h2>
                                <p className="mt-3 text-sm leading-7 text-stone-600">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                            What this page should communicate
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-stone-950">
                            Fast responses, thoughtful support, and a premium tone
                        </h2>
                        <div className="mt-6 space-y-5 text-sm leading-8 text-stone-600">
                            <p>
                                For a commerce product, contact pages matter because
                                they reduce hesitation. People buy more comfortably
                                when they know who is behind the brand and how to get
                                help if something goes wrong.
                            </p>
                            <p>
                                This version is designed to feel warmer and more
                                deliberate than a plain placeholder, while still
                                staying simple enough to wire to a form or CMS later.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}

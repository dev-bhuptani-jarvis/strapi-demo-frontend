interface PageHeroProps {
    eyebrow: string;
    title: string;
    description: string;
    stats?: Array<{
        label: string;
        value: string;
    }>;
}

export default function PageHero({
    eyebrow,
    title,
    description,
    stats = [],
}: PageHeroProps) {
    return (
        <section className="relative overflow-hidden border-b border-stone-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.88)_0%,_rgba(247,241,231,0.62)_100%)]">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
                        {eyebrow}
                    </p>
                    <h1 className="mt-5 text-5xl font-bold leading-[0.95] text-stone-950 sm:text-6xl">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                        {description}
                    </p>
                </div>

                {stats.length > 0 && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-3xl border border-stone-200 bg-white/85 p-5 shadow-sm"
                            >
                                <p className="text-3xl font-bold text-stone-950">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-sm text-stone-500">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

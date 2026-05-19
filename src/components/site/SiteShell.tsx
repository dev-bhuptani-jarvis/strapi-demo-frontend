import Link from "next/link";
import SiteAccountActions from "./SiteAccountActions";

interface SiteShellProps {
    children: React.ReactNode;
}

const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/category", label: "Categories" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function SiteShell({
    children,
}: SiteShellProps) {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,_#f7f1e7_0%,_#fffdf9_40%,_#f4efe7_100%)] text-stone-900">
            <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="rounded-2xl bg-stone-950 px-3 py-2 text-sm font-bold uppercase tracking-[0.25em] text-white">
                            SC
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                                Strapi Commerce
                            </p>
                            <p className="text-xs text-stone-500">
                                Storefront UI system
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-6 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <SiteAccountActions />
                </div>
            </header>

            {children}

            <footer className="border-t border-stone-200 bg-white/80">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                            Strapi Commerce
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-stone-950">
                            Better storefront foundations for content-rich ecommerce.
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
                            A cleaner frontend experience across landing pages,
                            catalog browsing, category discovery, and account access.
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
                            Explore
                        </p>
                        <div className="mt-5 space-y-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block text-sm text-stone-600 transition hover:text-orange-600"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
                            Account
                        </p>
                        <SiteAccountActions variant="footer" />
                    </div>
                </div>
            </footer>
        </div>
    );
}

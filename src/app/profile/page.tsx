"use client";

import ProtectedRoute from "components/auth/ProtectedRoute";
import SiteShell from "components/site/SiteShell";
import { removeToken } from "utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CurrentUser, getCurrentUser } from "services/auth.service";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await getCurrentUser();
                setUser(response);
            } catch {
                removeToken();
                setError("Your session has expired. Please login again.");
                router.replace("/login");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [router]);

    const handleLogout = () => {
        removeToken();
        router.push("/login");
    };

    return (
        <ProtectedRoute>
            <SiteShell>
                <section className="border-b border-stone-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.88)_0%,_rgba(247,241,231,0.62)_100%)]">
                    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-3xl">
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
                                    Protected profile
                                </p>
                                <h1 className="mt-5 text-5xl font-bold leading-[0.95] text-stone-950 sm:text-6xl">
                                    Your account space
                                </h1>
                                <p className="mt-6 text-base leading-8 text-stone-600">
                                    This area is part of the same storefront
                                    experience now, with protected access and a more
                                    polished account summary.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-2xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20">
                    {loading ? (
                        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 text-sm text-stone-500 shadow-sm">
                            Loading your profile...
                        </div>
                    ) : error ? (
                        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-sm text-red-700 shadow-sm">
                            {error}
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                                    Account details
                                </p>
                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-stone-50 p-5">
                                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                                            Username
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-stone-900">
                                            {user?.username}
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-stone-50 p-5">
                                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                                            Email
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-stone-900">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-stone-50 p-5">
                                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                                            Confirmed
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-stone-900">
                                            {user?.confirmed ? "Yes" : "No"}
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-stone-50 p-5">
                                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                                            Blocked
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-stone-900">
                                            {user?.blocked ? "Yes" : "No"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <aside className="grid gap-6">
                                <div className="rounded-[2rem] border border-stone-200 bg-stone-950 p-8 text-white shadow-sm">
                                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
                                        Quick links
                                    </p>
                                    <div className="mt-6 space-y-4">
                                        <Link
                                            href="/"
                                            className="block rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold transition hover:border-orange-300 hover:bg-white/10"
                                        >
                                            Back to home
                                        </Link>
                                        <Link
                                            href="/products"
                                            className="block rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold transition hover:border-orange-300 hover:bg-white/10"
                                        >
                                            Browse products
                                        </Link>
                                    </div>
                                </div>

                                <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                                        Session status
                                    </p>
                                    <p className="mt-4 text-sm leading-7 text-stone-600">
                                        Your profile page is protected by the route
                                        guard and proxy layer, so only authenticated
                                        visitors can reach it.
                                    </p>
                                </div>
                            </aside>
                        </div>
                    )}
                </section>
            </SiteShell>
        </ProtectedRoute>
    );
}

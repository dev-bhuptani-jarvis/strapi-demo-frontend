"use client";

import PublicRoute from "components/auth/PublicRoute";
import { saveToken } from "../../utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { loginUser } from "services/auth.service";

const getAuthErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
        return (
            error.response?.data?.error?.message ||
            "Unable to login with those credentials."
        );
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unable to login with those credentials.";
};

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });

        setApiError("");
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.identifier.trim()) {
            newErrors.identifier =
                "Email or username is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            if (!validateForm()) {
                return;
            }

            setLoading(true);
            setApiError("");

            const response = await loginUser(
                formData.identifier,
                formData.password
            );

            saveToken(response.jwt);

            router.push("/profile");
        } catch (error: unknown) {
            setApiError(getAuthErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <PublicRoute>
            <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.14),_transparent_28%),linear-gradient(180deg,_#f5f1e8_0%,_#fffdf9_100%)] px-4 py-10">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_30px_80px_rgba(28,25,23,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="hidden bg-stone-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
                                Welcome back
                            </p>
                            <h1 className="mt-6 max-w-sm text-6xl font-bold leading-none">
                                Continue your storefront journey.
                            </h1>
                            <p className="mt-6 max-w-md text-sm leading-7 text-stone-300">
                                Sign in to manage your account, explore protected pages,
                                and keep your Strapi-powered storefront connected.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                            <p className="text-sm text-stone-300">
                                Protected routes are now enforced for <span className="font-semibold text-white">/profile</span>, and authenticated users are redirected away from public auth pages automatically.
                            </p>
                        </div>
                    </section>

                    <section className="px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                                    Login
                                </p>
                                <h2 className="mt-3 text-4xl font-semibold text-stone-900">
                                    Access your account
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-stone-500">
                                    Use your Strapi email or username and password to continue.
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleLogin}>
                                <div>
                                    <label
                                        htmlFor="identifier"
                                        className="mb-2 block text-sm font-semibold text-stone-700"
                                    >
                                        Email or username
                                    </label>

                                    <input
                                        id="identifier"
                                        type="text"
                                        name="identifier"
                                        placeholder="you@example.com"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3.5 text-stone-900 outline-none transition focus:border-orange-500 focus:bg-white"
                                    />

                                    {errors.identifier && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.identifier}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-semibold text-stone-700"
                                    >
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3.5 text-stone-900 outline-none transition focus:border-orange-500 focus:bg-white"
                                    />

                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {apiError && (
                                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {apiError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-2xl bg-stone-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-stone-400"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-stone-500">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-stone-950 transition hover:text-orange-600"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </PublicRoute>
    );
}

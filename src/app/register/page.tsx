"use client";

import PublicRoute from "components/auth/PublicRoute";
import { saveToken } from "../../utils/auth";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { registerUser } from "services/auth.service";

const getAuthErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
        return (
            error.response?.data?.error?.message ||
            "Unable to create your account right now."
        );
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unable to create your account right now.";
};

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        if (formData.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            if (!validateForm()) {
                return;
            }

            setLoading(true);
            setApiError("");

            const response = await registerUser(
                formData.username,
                formData.email,
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
            <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_bottom_right,_rgba(120,53,15,0.14),_transparent_32%),linear-gradient(180deg,_#f5f1e8_0%,_#fffdf9_100%)] px-4 py-10">
                <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_30px_80px_rgba(28,25,23,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
                    <section className="px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                                    Register
                                </p>
                                <h1 className="mt-3 text-4xl font-semibold text-stone-900">
                                    Create your account
                                </h1>
                                <p className="mt-3 text-sm leading-6 text-stone-500">
                                    Sign up with Strapi auth and start using protected pages immediately.
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleRegister}>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="mb-2 block text-sm font-semibold text-stone-700"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3.5 text-stone-900 outline-none transition focus:border-orange-500 focus:bg-white"
                                    />
                                    {errors.username && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.username}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-stone-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3.5 text-stone-900 outline-none transition focus:border-orange-500 focus:bg-white"
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.email}
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
                                        placeholder="Create a secure password"
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

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-semibold text-stone-700"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Repeat your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3.5 text-stone-900 outline-none transition focus:border-orange-500 focus:bg-white"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.confirmPassword}
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
                                    {loading ? "Creating account..." : "Register"}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-stone-500">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-stone-950 transition hover:text-orange-600"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </section>

                    <section className="hidden bg-[linear-gradient(180deg,_#171717_0%,_#292524_100%)] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
                                Strapi auth
                            </p>
                            <h2 className="mt-6 max-w-sm text-6xl font-bold leading-none">
                                Launch with a protected user flow.
                            </h2>
                            <p className="mt-6 max-w-md text-sm leading-7 text-stone-300">
                                Registration stores the JWT for API access and mirrors it into a cookie so route protection survives refreshes and direct visits.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                <p className="text-xs uppercase tracking-[0.3em] text-orange-200">
                                    Included
                                </p>
                                <p className="mt-2 text-sm text-stone-200">
                                    Public route redirects, protected profile access, API-backed forms, and logout support.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </PublicRoute>
    );
}

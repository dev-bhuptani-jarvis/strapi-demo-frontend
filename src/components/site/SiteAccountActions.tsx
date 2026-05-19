"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import { isAuthenticated, removeToken } from "utils/auth";
import { useRouter } from "next/navigation";

interface SiteAccountActionsProps {
    variant?: "header" | "footer";
}

export default function SiteAccountActions({
    variant = "header",
}: SiteAccountActionsProps) {
    const router = useRouter();
    const isHydrated = useSyncExternalStore(
        () => () => undefined,
        () => true,
        () => false
    );
    const authenticated =
        isHydrated && isAuthenticated();

    const handleLogout = () => {
        removeToken();
        router.push("/login");
        router.refresh();
    };

    if (variant === "footer") {
        return (
            <div className="mt-5 space-y-3">
                {!authenticated && (
                    <>
                        <Link
                            href="/login"
                            className="block text-sm text-stone-600 transition hover:text-orange-600"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="block text-sm text-stone-600 transition hover:text-orange-600"
                        >
                            Register
                        </Link>
                    </>
                )}
                <Link
                    href="/profile"
                    className="block text-sm text-stone-600 transition hover:text-orange-600"
                >
                    Profile
                </Link>
                {authenticated && (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="block text-sm text-stone-600 transition hover:text-orange-600"
                    >
                        Logout
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            {!authenticated && (
                <Link
                    href="/login"
                    className="hidden rounded-2xl px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:text-orange-600 sm:inline-flex"
                >
                    Login
                </Link>
            )}
            <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
                Profile
                <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    );
}

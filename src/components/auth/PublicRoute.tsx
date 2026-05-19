"use client";

import { isAuthenticated } from "utils/auth";
import { useRouter } from "next/navigation";
import {
    useEffect,
    useSyncExternalStore,
} from "react";

interface PublicRouteProps {
    children: React.ReactNode;
}

export default function PublicRoute({
    children,
}: PublicRouteProps) {
    const router = useRouter();
    const isHydrated = useSyncExternalStore(
        () => () => undefined,
        () => true,
        () => false
    );
    const authenticated =
        isHydrated && isAuthenticated();

    useEffect(() => {
        if (authenticated) {
            router.replace("/profile");
        }
    }, [authenticated, router]);

    if (!isHydrated || authenticated) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
                <div className="rounded-3xl border border-stone-200 bg-white px-8 py-6 text-sm font-medium text-stone-500 shadow-sm">
                    Preparing authentication...
                </div>
            </main>
        );
    }

    return <>{children}</>;
}

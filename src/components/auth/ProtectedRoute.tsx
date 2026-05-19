"use client";

import { isAuthenticated } from "utils/auth";
import { useSyncExternalStore } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const isHydrated = useSyncExternalStore(
        () => () => undefined,
        () => true,
        () => false
    );
    const allowed =
        isHydrated && isAuthenticated();

    // useEffect(() => {
    //     if (isHydrated && !allowed) {
    //         router.replace("/login");
    //     }
    // }, [allowed, isHydrated, router]);

    if (!isHydrated || !allowed) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
                <div className="rounded-3xl border border-stone-200 bg-white px-8 py-6 text-sm font-medium text-stone-500 shadow-sm">
                    Checking your session...
                </div>
            </main>
        );
    }

    return <>{children}</>;
}

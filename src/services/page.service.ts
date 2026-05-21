const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getHomePage() {
    try {
        const response = await fetch(
            `${API_URL}/api/pages?filters[slug][$eq]=home&populate[sections][populate]=*`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch homepage"
            );
        }

        const data = await response.json();

        return data?.data?.[0] ?? null;
    } catch (error) {
        console.error(
            "Error fetching homepage:",
            error
        );

        return null;
    }
}

export async function getGlobalTheme() {
    try {
        const response = await fetch(
        `${API_URL}/api/global-themes?populate=*`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch global theme"
            );
        }

        const data = await response.json();

        return data?.data?.[0] ?? null;
    } catch (error) {
        console.error(
            "Error fetching global theme:",
            error
        );

        return null;
    }
}
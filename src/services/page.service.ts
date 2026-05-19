import apiClient from "lib/axios";
import { noCacheHeaders } from "./auth.service";

export async function getHomePage() {
    const response = await apiClient.get("/pages", {
        params: {
            "filters[slug][$eq]": "home",
            "populate[sections][populate]": "*",
        },
        ...noCacheHeaders
    });

    return response.data?.[0] ?? null;
}

export const getGlobalTheme = async () => {
    const response = await apiClient.get(
        `/global-themes?populate=*`,
        noCacheHeaders
    );

    return response.data?.[0] ?? null;
}

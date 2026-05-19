import apiClient from "lib/axios";
import { noCacheHeaders } from "./auth.service";

export const getBlogs = async () => {
    try {
        const response = await apiClient.get(
            "/blogs",
            {
                params: {
                    populate: "*",
                },
                ...noCacheHeaders
            },
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching blogs:",
            error
        );

        return {
            data: [],
        };
    }
};

export const getBlogBySlug = async (
    slug: string
) => {
    try {
        const response = await apiClient.get(
            "/blogs",
            {
                params: {
                    "filters[slug][$eq]": slug,
                    populate: "*",
                },
                ...noCacheHeaders
            },
        );

        return (
            response?.data?.[0] || null
        );
    } catch (error) {
        console.error(
            "Error fetching blog:",
            error
        );

        return null;
    }
};
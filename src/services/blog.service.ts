import apiClient from "lib/axios";
import { BlogsResponse } from "types/blog.types";
import { noCacheHeaders } from "./auth.service";

export const getBlogs = async (): Promise<BlogsResponse> => {
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

        return [];
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

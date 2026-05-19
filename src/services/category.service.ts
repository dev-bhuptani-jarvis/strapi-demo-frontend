import apiClient from "lib/axios";
import { CategoriesResponse } from "types/category.types";

export const getCategories = async (): Promise<CategoriesResponse> => {
    try {
        const response = await apiClient.get<
            never,
            CategoriesResponse
        >(
            "/categories"
        );

        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);

        return {
            data: [],
        };
    }
};

export const getCategoryBySlug = async (
    slug: string
) => {
    try {
        const response = await apiClient.get<
            never,
            CategoriesResponse
        >(
            "/categories",
            {
                params: {
                    "filters[slug][$eq]": slug,
                    populate: "*",
                },
            }
        );

        return response.data?.[0] || null;
    } catch (error) {
        console.error(
            "Error fetching category:",
            error
        );

        return null;
    }
};

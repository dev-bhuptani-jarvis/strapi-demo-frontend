import apiClient from "lib/axios";
import { ProductsResponse } from "types/product.types";
import { noCacheHeaders } from "./auth.service";

export const getProducts = async ({
    page = 1,
    pageSize = 12,
    search = "",
    category = "",
    sort = "createdAt:desc",
}: {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    sort?: string;
} = {}): Promise<ProductsResponse> => {
    let query = `
    /products?populate=*
    &pagination[page]=${page}
    &pagination[pageSize]=${pageSize}
    &sort=${sort}
  `;

    // Search Filter
    if (search) {
        query += `&filters[title][$containsi]=${search}`;
    }

    // Category Filter
    if (category) {
        query += `&filters[category][slug][$eq]=${category}`;
    }

    const response = await apiClient.get<never, ProductsResponse>(
        query.replace(/\s+/g, ""),
        noCacheHeaders
    );

    return response;
};

export const getProductBySlug = async (
    slug: string
) => {
    const response = await apiClient.get<
        never,
        ProductsResponse
    >(
        `/products?filters[slug][$eq]=${slug}&populate=*`,
        noCacheHeaders
    );

    return response.data?.[0] || null;
};

export const getFeaturedProducts = async () => {
    const response = await apiClient.get<
        never,
        ProductsResponse
    >(
        `/products?populate=*&pagination[pageSize]=4&sort=createdAt:desc`,
        noCacheHeaders
    );

    return response;
};

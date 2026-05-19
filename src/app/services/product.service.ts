import axiosInstance from "../../lib/axios";

export const getProducts = async () => {
    const response = await axiosInstance.get(
        "/products?populate=*"
    );

    return response.data;
};

export const getProductBySlug = async (
    slug: string
) => {
    const response = await axiosInstance.get(
        `/products?filters[slug][$eq]=${slug}&populate=*`
    );

    return response.data;
};
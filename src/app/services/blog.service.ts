import { noCacheHeaders } from "services/auth.service";
import axiosInstance from "../../lib/axios";

export const getBlogs = async () => {
  const response = await axiosInstance.get(
    "/blogs?populate=*",
    noCacheHeaders
  );

  return response.data;
};

export const getBlogBySlug = async (
  slug: string
) => {
  const response = await axiosInstance.get(
    `/blogs?filters[slug][$eq]=${slug}&populate=*`,
    noCacheHeaders
  );

  return response.data;
};
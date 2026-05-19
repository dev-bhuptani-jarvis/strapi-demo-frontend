import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "utils/auth";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = getToken();

            if (token) {
                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default apiClient;

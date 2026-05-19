import apiClient from "lib/axios";

export interface AuthResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

export const noCacheHeaders = {
    headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
    },
};

export interface CurrentUser {
    id: number;
    username: string;
    email: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    return apiClient.post<never, AuthResponse>(
        "/auth/local/register",
        {
            username,
            email,
            password,
        },
        noCacheHeaders
    );
};

export const loginUser = async (
    identifier: string,
    password: string
) => {
    return apiClient.post<never, AuthResponse>(
        "/auth/local",
        {
            identifier,
            password,
        },
        noCacheHeaders
    );
};

export const getCurrentUser = async () => {
    return apiClient.get<never, CurrentUser>("/users/me", noCacheHeaders);
};

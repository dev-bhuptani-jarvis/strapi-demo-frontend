import apiClient from "lib/axios";

export interface AuthResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

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
        }
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
        }
    );
};

export const getCurrentUser = async () => {
    return apiClient.get<never, CurrentUser>("/users/me");
};

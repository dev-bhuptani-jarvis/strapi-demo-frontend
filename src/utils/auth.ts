import {
    decryptData,
} from "./crypto";
import { AUTH_TOKEN_COOKIE } from "constants/auth";

const TOKEN_KEY = "auth_token_v2";
const LEGACY_TOKEN_KEY = "token";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const isBrowser = () =>
    typeof window !== "undefined";

const isLikelyJwt = (value: string) =>
    value.split(".").length === 3;

const getCookieValue = (name: string) => {
    if (!isBrowser()) {
        return null;
    }

    const cookie = document.cookie
        .split("; ")
        .find((item) =>
            item.startsWith(`${name}=`)
        );

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(
        cookie.substring(name.length + 1)
    );
};

const setCookie = (token: string) => {
    if (!isBrowser()) {
        return;
    }

    document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
};

const clearCookie = () => {
    if (!isBrowser()) {
        return;
    }

    document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
};

export const saveToken = (token: string) => {
    if (!isBrowser()) {
        return;
    }

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(LEGACY_TOKEN_KEY);

    setCookie(token);
};

export const getToken = () => {
    if (!isBrowser()) {
        return null;
    }

    try {
        const storedToken =
            localStorage.getItem(TOKEN_KEY);

        if (storedToken) {
            if (isLikelyJwt(storedToken)) {
                return storedToken;
            }

            localStorage.removeItem(TOKEN_KEY);
        }

        const cookieToken = getCookieValue(
            AUTH_TOKEN_COOKIE
        );

        if (cookieToken && isLikelyJwt(cookieToken)) {
            saveToken(cookieToken);
            return cookieToken;
        }

        const legacyToken = localStorage.getItem(
            LEGACY_TOKEN_KEY
        );

        if (!legacyToken) {
            return null;
        }

        if (isLikelyJwt(legacyToken)) {
            saveToken(legacyToken);
            return legacyToken;
        }

        const decryptedToken =
            decryptData(legacyToken);

        if (decryptedToken && isLikelyJwt(decryptedToken)) {
            saveToken(decryptedToken);
            return decryptedToken;
        }

        removeToken();
        return null;
    } catch (error) {
        console.error(
            "Unable to read the stored token.",
            error
        );
        removeToken();
        return null;
    }
};

export const removeToken = () => {
    if (!isBrowser()) {
        return;
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    clearCookie();
};

export const isAuthenticated = () => {
    try {
        return !!getToken();
    } catch (error) {
        console.error(
            "Unable to determine authentication state.",
            error
        );
        removeToken();
        return false;
    }
};

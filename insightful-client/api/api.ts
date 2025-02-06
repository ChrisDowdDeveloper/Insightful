const backendUrl = 'http://localhost:5000/api';
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from 'js-cookie';

interface CustomJwtPayload extends JwtPayload {
    email?: string;
    nameid?: string;
}

export const uploadFile = async(file: File) => {
    let member = false;
    const token = Cookies.get("token");

    if (token) {
        member = true;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${backendUrl}/upload?member=${member}`, {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
        throw new Error("Failed to upload file");
        }

        return await response.json();
    } catch(err) {
        console.error("Upload Error: ", err);
        throw err;
    }
}

export const fetchUploadedData = async () => {
    const token = Cookies.get("token");

    try {
        const response = await fetch(`${backendUrl}/data`, {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch uploaded data");
        }

        return await response.json();
    } catch (err) {
        console.error("Failed to fetch data: ", err);
        throw err;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await fetch(`${backendUrl}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const verifyLogin = async () => {
    try {
        const response = await fetch(`${backendUrl}/auth/verify`, {
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            console.warn("User is not authenticated");
            return null;
        }
    } catch (err) {
        console.error("Auth check failed:", err);
        return null;
    }
};

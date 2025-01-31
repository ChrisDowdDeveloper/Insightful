const backendUrl = 'http://localhost:5000/';
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

export const fetchUploadedData = async() => {
    try {
        const response = await fetch(`${backendUrl}/data`);
        if (!response.ok) {
        throw new Error("Failed to fetch uploaded data");
        }
        return await response.json();
    } catch(err) {
        console.error("Failed to fetch data: ", err);
        throw err;
    }
};
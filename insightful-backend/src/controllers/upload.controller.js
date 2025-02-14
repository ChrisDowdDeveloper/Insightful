const { uploadFile } = require("../services/upload.services");
const { authenticateUser } = require("../middleware/auth.middleware");

const handleFileUpload = async (req, res) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${backendUrl}/upload?member=${member}`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        return await response.json();
    } catch (err) {
        console.error("Upload Error:", err);
        throw err;
    }
};

module.exports = { 
    create: [authenticateUser, handleFileUpload] 
};

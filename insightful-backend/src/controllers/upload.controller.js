const { uploadFile } = require("../services/upload.services");
const { authenticateUser } = require("../middleware/auth.middleware");

const handleFileUpload = async (req, res) => {
    try {
        const { file } = req;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const { member } = req.query;
        const fileName = `${Date.now()}-${file.originalname}`;
        const fileBuffer = file.buffer;
        const contentType = file.mimetype;

        let uploadResult = null;
        if (member === "true") {
            uploadResult = await uploadFile(fileName, fileBuffer, contentType);
        }

        res.status(200).json({
            message: "File processed",
            stored: member === "true",
            storageData: uploadResult,
        });
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ error: "File processing failed" });
    }
};

module.exports = {
    create: [authenticateUser, handleFileUpload],
};

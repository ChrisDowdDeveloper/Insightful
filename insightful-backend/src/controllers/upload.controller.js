const { uploadFile } = require("../services/upload.services");
const { authenticateUser } = require("../middleware/auth.middleware");

const handleFileUpload = async (req, res) => {
    try {
        const { file } = req;
        if (!file) return res.status(400).send({ error: "No file uploaded" });

        const { member } = req.query;

        if (member === "true" && !req.isAuthenticated) {
            return res.status(403).send({ error: "Unauthorized: You must be logged in to save data." });
        }

        const fileName = `${Date.now()}-${file.originalname}`;
        const fileBuffer = file.buffer;
        const contentType = file.mimetype;
        let uploadResult = null;

        if (member === "true") {
            uploadResult = await uploadFile(fileName, fileBuffer, contentType);
        }

        res.status(200).send({
            message: "File processed",
            stored: member === "true",
            storageData: uploadResult,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "File processing failed" });
    }
};

module.exports = { 
    create: [authenticateUser, handleFileUpload] 
};

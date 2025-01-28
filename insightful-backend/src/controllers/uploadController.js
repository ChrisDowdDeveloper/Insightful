const { uploadFile } = require("../services/supabase");

const handleFileUpload = async(req, res) => {
    try {
        const { file } = req;
        if(!file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const fileName = `${Date.now()}-${file.originalname}`;
        const fileBuffer = file.buffer;
        const contentType = file.mimetype;

        const uploadResult = await uploadFile(fileName, fileBuffer, contentType);
        res.status(200).send({
            message: "File uploaded successfully",
            data: uploadResult,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "File upload failed: " + err.message });
    }
}

module.exports = { handleFileUpload };
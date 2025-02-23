const supabase = require("../services/supabase");

const uploadFile = async (filename, fileBuffer, contentType) => {
    try {
        const { data: bucketList, error: bucketError } = await supabase.storage.listBuckets();
        if (bucketError) throw new Error("Error fetching storage buckets: " + bucketError.message);

        if (!bucketList.some(bucket => bucket.name === "uploads")) {
            throw new Error("Bucket 'uploads' does not exist. Create it in Supabase Storage.");
        }

        console.log(`Uploading file: ${filename}...`);

        const { data, error } = await supabase.storage
            .from("uploads")
            .upload(filename, fileBuffer, {
                contentType,
                upsert: true,
            });

        if (error) {
            console.error("Supabase Upload Error:", error);
            throw new Error(`Supabase Upload Failed: ${error.message}`);
        }

        console.log("File uploaded successfully:", data);
        return data;
    } catch (err) {
        console.error("Error uploading file:", err);
        throw err;
    }
};

module.exports = { uploadFile };

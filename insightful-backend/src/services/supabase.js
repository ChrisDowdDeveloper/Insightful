const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadFile = async (filename, fileBuffer, contentType) => {
    try {
        const { data, error } = await supabase.storage.from("uploads").upload(filename, fileBuffer, { contentType });

        if(error) throw error;
        return data;
    } catch(err) {
        throw new Error("Error uploading file: " + err.message);
    }
}

module.exports = { uploadFile };
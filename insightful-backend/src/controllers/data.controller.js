const supabase = require("../services/supabase");

const getUserCharts = async(req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({ error: "Unauthorized: No user session found" });
        }

        const userEmail = req.user.email;

        const { data, error } = await supabase.storage.from("uploads").list(userEmail);

        if(error) {
            throw error;
        }

        const files = data.map((file) => ({
            fileName: file.name,
            created_at: file.created_at,
            url: `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${req.user.email}/${file.name}`
        }));

        res.status(200).json({ charts: files });
    } catch (err) {
        console.error("Error fetching user charts: ", err);
        res.status(500).json({ error: "Failed to fetch charts" });
    }
};

module.exports = { getUserCharts };
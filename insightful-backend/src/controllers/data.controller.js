const supabase = require("../services/supabase");

const getUserCharts = async(req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({ error: "Unauthorized: No user session found" });
        }

        const userEmail = req.user.email;

        const { data, error } = await supabase.from("charts").select("*").eq("user_email", userEmail);

        if(error) {
            throw error;
        }

        res.status(200).json({ charts: data });
    } catch (err) {
        console.error("Error fetching user charts: ", err);
        res.status(500).json({ error: "Failed to fetch charts" });
    }
};

module.exports = { getUserCharts };
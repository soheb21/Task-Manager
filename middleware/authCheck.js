const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    success: "false",
                    message: "Auth Failed",
                    e
                })
            }
            req.user = decoded.id;
            next();
        })

    } catch (e) {
        console.log(`token error ${e}`)
        res.status(500).json({
            success: "false",
            message: "Failed to verify token",
            e
        })
    }
}
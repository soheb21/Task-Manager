const authModel = require("../model/authModel");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(404).json({
                success: false,
                message: "Please Provide All Fields!",
            })
        }
        const existingEmail = await authModel.findOne({ email });
        if (existingEmail) {
            return res.status(402).json({
                success: false,
                message: "User Already Present"
            })
        }
        const user = await authModel.create({ username, email, password })
        const token = user.generateJWT();
        return res.status(201).json({
            success: true,
            message: "Register Successfully",
            token
        })
    } catch (e) {
        console.log("register error", e)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })

    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Provide Email and Password',
            })
        }
        const user = await authModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found!',
            })
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password is wrong',
            })
        }
        const token = user.generateJWT();
        res.status(201).json({
            success: true,
            message: "Login Successfully",
            token
        })
    } catch (e) {
        console.log("Login err", e)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const userID = req.user;
        const doc = await authModel.findById({ _id: userID })
        return res.status(201).json({
            success: true,
            doc
        })
    } catch (e) {
        console.log("get-user err", e)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}
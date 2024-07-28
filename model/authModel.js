const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide username"]
    },
    email: {
        type: String,
        required: [true, "Please Provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide password"]
    },
}, { timestamps: true })
authSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

})
authSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
}
authSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_JWT, { expiresIn: "2d" })
}
const authModel = new mongoose.model("auth", authSchema);

module.exports = authModel;
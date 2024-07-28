const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database is running at ${mongoose.connection.host}`)
    } catch (e) {
        console.log("Database Error", error)
    }
}
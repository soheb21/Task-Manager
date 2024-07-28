require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/database");
const app = express();
const cors = require("cors");
const authMiddleware = require("./middleware/authCheck")
const path = require("path")


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/task", authMiddleware, require("./routes/task"))
app.use("/api/v1/auth", require("./routes/auth"))

//Database
connectDB();

//static file
app.use(express.static(path.join(__dirname, "./dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"))
})


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running at port no ${port}`))
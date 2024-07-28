const express = require("express");
const { register, login, getUser } = require("../controller/authCtrl");
const router = express.Router();
const authMiddleware = require("../middleware/authCheck")

router.post("/register", register)
    .post("/login", login)
    .get("/get-user", authMiddleware, getUser)



module.exports = router;    

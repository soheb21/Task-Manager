const express = require("express");
const { getAllTaskbyUser, craeteTask, updateTask, deleteTask } = require("../controller/taskCtrl");
const router = express.Router();

router.post("/create", craeteTask)
    .get("/get", getAllTaskbyUser)
    .put("/update/:id", updateTask)
    .delete("/delete/:id", deleteTask)


module.exports = router;    

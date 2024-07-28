const mongoose = require("mongoose");

const opts = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
};
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "auth" }

}, opts)

const TaskModel = new mongoose.model("task", taskSchema)
module.exports = TaskModel;
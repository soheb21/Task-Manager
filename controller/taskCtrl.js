const TaskModel = require("../model/taskModel");

exports.getAllTaskbyUser = async (req, res) => {
    try {
        const userID = req.user;
        const doc = await TaskModel.find({ user: userID })
        res.status(201).json({ success: true, doc })

    } catch (error) {
        console.log("getAllTaskbyUser error", error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })

    }
}
exports.craeteTask = async (req, res) => {
    try {

        const { title, description } = req.body;
        const userID = req.user;
        if (!title || !description) {
            return res.status(400).json({ message: 'Both title and description are required' });
        }

        const doc = new TaskModel({ title, description, user: userID })
        await doc.save();
        res.status(201).json({ success: true, message: "Task created ", doc })


    } catch (error) {
        console.log("create task error", error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const doc = await TaskModel.findByIdAndUpdate(id, { title, description, status }, { new: true })
        res.status(201).json({ success: true, message: "Task is Updated Successfully", doc })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
        console.log("update task error", error)
    }
}
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.findByIdAndDelete(id)
        res.status(201).json({ success: true, message: "Task is deleted Successfully", id })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
        console.log("delete task error", error)
    }
}

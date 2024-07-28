import React, { useEffect, useState } from 'react'
import "./AllTask.css"
import { useDispatch, useSelector } from "react-redux"
import { addTaskAsync, deleteTaskAsync, getAllTaskAsync, updateTaskAsync } from '../../redux/task/taskAPI'
import { toast } from 'react-toastify'
import { clearAllErrors } from '../../redux/task/taskSlice'
const AllTask = ({ formData, setFormData, handleChange }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [ids, setIDs] = useState(null)
    const dispatch = useDispatch();
    const { tasks, error, loading } = useSelector(state => state.tasks)
    const { isAuth } = useSelector(state => state.auth)
    const handleSave = () => {
        if (isEdit && ids !== null) {
            dispatch(updateTaskAsync({ ...formData, _id: ids }));
            setFormData({
                title: "",
                description: "",
                status: "pending"
            });
            setIsEdit(false);
        }
        else {
            dispatch(addTaskAsync(formData))
            setFormData({
                title: "",
                description: "",
                status: "pending"
            })
        }
    }
    const handleDelete = (id) => dispatch(deleteTaskAsync(id));


    const handleEdit = (task) => {
        let { _id, title, description, status } = task;
        setIsEdit(true)
        setFormData({
            title: title,
            description: description,
            status: status
        })
        setIDs(_id)

    }
    useEffect(() => {
        if (isAuth) {
            dispatch(getAllTaskAsync());
        }
        if (error) {
            toast.error(error)
            dispatch(clearAllErrors());
            return;
        }
    }, [dispatch, error])

    if (loading) {
        return <h1 style={{ color: "white" }}>Loading...</h1>
    }


    return (
        <>
            {
                isEdit &&
                <div className="add-info  ">
                    <label >Status</label>
                    <select onChange={handleChange} value={formData.status} name='status' >
                        <option value={"Pending"}>Pending</option>
                        <option value="Done">Done</option>
                        <option value="Not Done">Not Done</option>
                    </select>
                </div>
            }

            <button onClick={handleSave} className={`${isEdit ? "btn_edit" : "btn_add"}`}>{isEdit ? "Edit" : "Add"}</button>
            <div className="task-section ">
                {
                    tasks.map((task, ind) => (
                        <div key={ind} className='all-task_container'>
                            <div className="all-task_info">
                                <p>{ind + 1}</p>
                                <p>Title: <span>{task.title}</span> </p>
                                <p className='des'>Descrition: <span>{task.description}</span> </p>
                                <p>Status: <span>{task.status}</span> </p>
                            </div>
                            <div className="btn">
                                <button style={{ cursor: "pointer", background: "orange", padding: ".5rem 1rem", borderRadius: "8px", color: "white" }} onClick={() => handleEdit(task)} >Edit</button>
                                <button style={{ cursor: "pointer", background: "red", padding: ".5rem 1rem", borderRadius: "8px", color: "white" }} onClick={() => handleDelete(task._id)}>delete</button>
                            </div>
                        </div>
                    ))

                }
            </div>


        </>

    )
}

export default AllTask
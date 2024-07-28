import React, { useState } from 'react'
import "./AddTask.css"
import AllTask from '../AllTask/AllTask'

const AddTask = () => {
    const intialTask = {
        title: "",
        description: "",
        status: "pending"
    }
    const [formData, setFormData] = useState(intialTask)
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div className='add-container'>
            <div className="add-info">
                <label >Title</label>
                <input onChange={handleChange} value={formData.title} name='title' type="text" placeholder='Enter Task..' />
            </div>
            <div className="add-info">
                <label >Description</label>
                <textarea onChange={handleChange} value={formData.description} name='description' type="text" placeholder='Enter Description.. ' rows={2} />
            </div>
          
            <AllTask formData={formData} handleChange={handleChange} setFormData={setFormData} />

        </div>
    )
}

export default AddTask
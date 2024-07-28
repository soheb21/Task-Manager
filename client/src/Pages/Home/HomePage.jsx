import React, { useEffect } from 'react'
import "./HomePage.css"
import AddTask from '../../components/AddTask/AddTask'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/authSlice';



const HomePage = () => {
    const dispatch = useDispatch();

    return (
        <div className='hero'>
            <div className="content">
                <div className="navbar">
                    <h1>Task Manager</h1>
                    <button onClick={() => dispatch(logout())} className='logout-btn'>Log-out</button>
                </div>
                {/* Adding Task */}
                <AddTask />
            </div>

        </div>
    )
}

export default HomePage
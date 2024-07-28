import React, { useState } from 'react';
import './Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../redux/auth/authAPI';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch(registerAsync(formData));
            navigate("/login")

            // Handle form submission logic here
        }
    };

    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        placeholder='enter your username'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoFocus

                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        placeholder='enter your email'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        placeholder='enter your password'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <button className='form-btn' type="submit">Register</button>
                <Link className='link' to={"/login"}>Already have an account?</Link>

            </form>
        </div>
    );
};

export default Register;

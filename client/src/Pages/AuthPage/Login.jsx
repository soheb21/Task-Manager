import React, { useEffect, useState } from 'react';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAsync } from '../../redux/auth/authAPI';
import { toast } from 'react-toastify';
import { clearAllError } from '../../redux/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { error, isAuth } = useSelector(state => state.auth)

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const errors = {};
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
            dispatch(loginAsync(formData));
        }
    };
    useEffect(() => {
        if (error) {
            toast.error(error ? error : "Something went worng!!")
            dispatch(clearAllError());
        }
        if (isAuth) {
            navigate("/")
        }
    }, [dispatch, isAuth, error])

    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        autoFocus
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
                        value={formData?.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <button className='form-btn' type="submit">Login</button>
                <Link className='link' to={"/register"}>Create an account</Link>

            </form>

        </div>
    );
};

export default Login;

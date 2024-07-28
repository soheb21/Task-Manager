
import './App.css'
import HomePage from './Pages/Home/HomePage'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Pages/AuthPage/Login';
import Register from './Pages/AuthPage/Register';
import Protected from './components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllError } from './redux/auth/authSlice';
import { userAsync } from './redux/auth/authAPI';
function App() {
  const { isAuth, error, message } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error ? error : "Something went wrong!")
      dispatch(clearAllError());
      return
    }
    if (isAuth || localStorage.getItem("token")) {

      dispatch(userAsync());
      toast.success(message);
      return
    }

  }, [dispatch, isAuth])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={
            <Protected>
              <HomePage />
            </Protected>
          } />

        </Routes>
        <ToastContainer autoClose={1500} />

      </Router>
    </>
  )
}

export default App

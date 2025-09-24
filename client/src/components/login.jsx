import React, { useState } from 'react';
import './login.css';
import toast, { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'
import logo from '../assets/video.mp4'
const Login = ({
  school = "NEW DARPAN PUBLIC SCHOOL",
  location = "MURKA MAU CHITRAKOOT (U.P.)",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const loginHandler = async (e) => {
  e.preventDefault();

  dispatch(loginStart());

  // Create a minimum 8-second delay promise
  const minDelay = new Promise((resolve) => setTimeout(resolve, 8000));

  try {
    const body = { email, password };
    const resPromise = axiosInstance.post("login", body); // Login request

    // Wait for both login request and minimum delay
    const [res] = await Promise.all([resPromise, minDelay]);

    // Dispatch login success with user and token
    dispatch(loginSuccess({ user: res?.data?.user, token: res?.data?.token }));
    navigate('/');
    toast.success(res?.data?.message + " " + res?.data?.user?.firstName);
    console.log('Login submitted:', res?.data?.user);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message);
    dispatch(loginFailure(error.message || 'Login failed'));
  }
};


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
    <div className='border-2 border-gray-800 rounded-lg p-4 bg-white w-full max-w-sm mx-auto font-sans shadow-md h-fit relative z-10'>
      <div className="bg-[#392e6e] text-white px-2 py-3 rounded-t-lg mb-4 text-center">
        <h2 className="font-bold text-xl leading-5 mb-1">{school}</h2>
        <h3 className="font-semibold text-md leading-4">{location}</h3>
      </div>
      <form className='flex flex-col' onSubmit={loginHandler}>
        <label className='font-extrabold'>Email</label>
        <input
          type="email"
          className='border-2 rounded font-bold px-1'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='font-extrabold mt-2'>Password</label>
        <input
          type="password"
          className='border-2 rounded font-bold px-1'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className='my-1 mx-auto font-bold px-5 py-2 rounded w-[50%] bg-blue-400 hover:bg-green-400 cursor-pointer disabled:opacity-60'
        >
          Login
        </button>
        {error && <p className="text-red-600 mt-2 font-semibold">{error}</p>}
      </form>
      <Link to={'/signin'}>Don't have Account</Link>
    </div>

    {/* Fullscreen video overlay */}
    {loading && (
      <div className='absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20'>
        <video
          src={logo}
          autoPlay
          loop
          muted
          className='w-1/2 h-auto object-contain rounded-lg shadow-lg'
        />
      </div>
    )}

    <Toaster />
  </div>
  );
};

export default Login;

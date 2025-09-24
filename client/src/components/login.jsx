import React, { useState } from 'react';
import './login.css';
import toast, { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/slice/authSlice'; 
import {Link, useNavigate} from 'react-router-dom'
import {axiosInstance} from '../lib/axios'
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

    try {
      const body = { email, password };
      const res = await axiosInstance.post("login", body);

      // Dispatch login success with user and token from response
      dispatch(loginSuccess({ user: res?.data?.user, token: res?.data?.token }));
      navigate('/')
      toast.success(res?.data?.message+" "+res?.data?.user?.firstName)
      console.log('Login submitted:', res?.data?.user);
    } catch (error) {
      console.log(error);
      
      toast.error(error.response?.data?.message)
      dispatch(loginFailure(error.message || 'Login failed'));
      // alert(error.message || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='border-2 border-gray-800 rounded-lg p-4 bg-white w-full max-w-sm mx-auto font-sans shadow-md h-fit'>
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-600 mt-2 font-semibold">{error}</p>}
        </form>

        <Link to={'/signin'}>Don't have Acount</Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;

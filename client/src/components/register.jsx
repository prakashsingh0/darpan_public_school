import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../lib/axios';

const Register = ({
  school = "NEW DARPAN PUBLIC SCHOOL",
  location = "MURKA MAU CHITRAKOOT (U.P.)",
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const registerHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const body = { lastName, firstName, email, phone, password };
      const res = await axiosInstance.post(`$signin`, body);
      alert(res.data.message);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='border-2 border-gray-800 rounded-lg p-4 bg-white w-full max-w-sm mx-auto font-sans shadow-md h-fit'>
        <div className="bg-[#392e6e] text-white px-2 py-3 rounded-t-lg mb-4 text-center">
          <h2 className="font-bold text-xl leading-5 mb-1">{school}</h2>
          <h3 className="font-semibold text-md leading-4">{location}</h3>
        </div>
        <form className='flex flex-col' onSubmit={registerHandler}>
          <label className='font-extrabold'>First Name</label>
          <input
            className='border-2 rounded font-bold px-1'
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label className='font-extrabold'>Last Name</label>
          <input
            className='border-2 rounded font-bold px-1'
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label className='font-extrabold'>Phone</label>
          <input
            className='border-2 rounded font-bold px-1'
            placeholder='Phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label className='font-extrabold'>Email</label>
          <input
            type='email'
            className='border-2 rounded font-bold px-1'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className='font-extrabold'>Password</label>
          <input
            type='password'
            className='border-2 rounded font-bold px-1'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className='my-1 mx-auto font-bold px-5 py-2 border-1 rounded w-[50%] bg-blue-400 hover:bg-green-400 btn'
            type='submit'
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-600 mt-4 text-center font-semibold">{error}</p>}

        <Link to={'/login'}>Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;

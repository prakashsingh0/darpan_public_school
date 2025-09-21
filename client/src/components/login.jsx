import React, { useState } from 'react'
import './login.css'
const Login = ({ school = "NEW DARPAN PUBLIC SCHOOL",
    location = "MURKA MAU CHITRAKOOT (U.P.)", }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='border-2 border-gray-800 rounded-lg bg- p-4 bg-white w-full max-w-sm mx-auto font-sans shadow-md h-fit'>
                <div className="bg-[#392e6e] text-white px-2 py-3 rounded-t-lg mb-4 text-center">
                    <h2 className="font-bold text-xl leading-5 mb-1">{school}</h2>
                    <h3 className="font-semibold text-md leading-4">{location}</h3>
                </div>
                <form className='flex flex-col'>
                    <label className='font-extrabold'>Email</label>
                    <input className='border-2 rounded font-bold px-1' placeholder='Email' value={email} onChange={() => setEmail()} />
                    <label className='font-extrabold'>Password</label>
                    <input className='border-2 rounded font-bold px-1' placeholder='Password' value={password} onChange={() => setPassword()} />
                    <button className='my-1 mx-auto font-bold px-5 py-2 border-1 rounded w-[50%] bg-blue-400 hover:bg-green-400 btn'  >Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login




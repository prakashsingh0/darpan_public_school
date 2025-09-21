import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../features/slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [isLoading,setIsLoading] = useState(false)
    const [userPic, setImage] = useState(null);
    const [fatherName, setFatherName] = useState('');
    const [Dob, setDob] = useState('');
    const [standarded, setStandarded] = useState(null); // number (not string)
    const [address, setAddress] = useState('');

    const handleform = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userPic', userPic);
            formData.append('fatherName', fatherName);
            formData.append('Dob', Dob);
            formData.append('Standarded', standarded); //  number now
            formData.append('address', address);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const res = await axios.put(
                'http://localhost:8000/api/auth/v1/updates',
                formData,
                config
            );

            dispatch(loginSuccess({ user: res?.data?.user }));
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }

        console.log(userPic, fatherName, Dob, standarded, address);
        alert(
            `Image: ${userPic?.name || 'No Image'}, Father Name: ${fatherName}, DOB: ${Dob}, Class: ${standarded}, Address: ${address}`
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="border-2 border-gray-800 rounded-lg p-4 bg-white w-full max-w-sm mx-auto font-sans shadow-md h-auto">
                <form className="flex flex-col" onSubmit={handleform}>
                    <label className="font-extrabold">Image</label>
                    <input
                        type="file"
                        className="border-2 rounded font-bold px-1"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <label className="font-extrabold mt-2">Father's Name</label>
                    <input
                        className="border-2 rounded font-bold px-1"
                        placeholder="Father name"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                    />

                    <label className="font-extrabold mt-2">Date of Birth</label>
                    <input
                        type="date"
                        className="border-2 rounded font-bold px-1"
                        value={Dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <label className="font-extrabold mt-2">Class</label>
                    <select
                        className="border-2 rounded font-bold px-1"
                        value={standarded || ''} // fallback empty string
                        onChange={(e) => setStandarded(parseInt(e.target.value))} //  ensure number
                    >
                        <option value="">Select Class</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>

                    <label className="font-extrabold mt-2">Address</label>
                    <input
                        className="border-2 rounded font-bold px-1"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button
                        className="my-4 mx-auto font-bold px-5 py-2 border rounded w-1/2 bg-blue-400 hover:bg-green-400 cursor-pointer"
                        type="submit"
                        onClick={()=>setIsLoading(true)}
                    >
                       {isLoading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;

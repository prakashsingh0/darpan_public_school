import React, { useState } from 'react';

const Form = () => {
    const [image, setImage] = useState(null);
    const [fatherName, setFatherName] = useState('');
    const [Dob, setDob] = useState('');
    const [Class, setClass] = useState('');
    const [address, setAddress] = useState('');

    const handleform = (e) => {
        e.preventDefault(); // Prevent page reload
        console.log(image, fatherName, Dob, Class, address);
        alert(`Image: ${image?.name || 'No Image'}, Father Name: ${fatherName}, DOB: ${Dob}, Class: ${Class}, Address: ${address}`);
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
                        value={Class}
                        onChange={(e) => setClass(e.target.value)}
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
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;

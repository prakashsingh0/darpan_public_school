import React from 'react'

import { useSelector } from 'react-redux';
const IdCard = ({

    session = "2025-26",
    school = "NEW DARPAN PUBLIC SCHOOL",
    location = "MURKA MAU CHITRAKOOT (U.P.)",
}) => {
    const authUser = useSelector((state) => state.auth.user);
    console.log(authUser);

   


    return (
        <div className='flex flex-col justify-center h-[100vh]'>
            <div className="border-2 mt-5 border-gray-800 rounded-lg bg-white p-4 w-full max-w-sm mx-auto font-sans shadow-md">
                <div className="bg-[#392e6e] text-white px-2 py-3 rounded-t-lg mb-4 text-center">
                    <h2 className="font-bold text-xl leading-5 mb-1">{school}</h2>
                    <h3 className="font-semibold text-md leading-4">{location}</h3>
                </div>
                <div className="flex flex-col sm:flex-row items-center mb-5 gap-3">
                    <div className="w-24 h-24 border-2 border-gray-700 rounded-md overflow-hidden mb-2 sm:mb-0">
                        {imgSrc ? <img src={authUser.userPic} alt="Student" className="w-full h-full object-fit" /> : null}
                    </div>
                    <span className="bg-cyan-500 text-white px-4 py-2 rounded-xl font-semibold text-sm">
                        SESSION {session}
                    </span>
                </div>
                <div className="text-base space-y-1">
                    <div><span className="font-bold">NAME :</span> <span className="text-red-600 font-semibold">{authUser.firstName + ' ' + authUser.lastName}</span></div>
                    <div><span className="font-bold">F. NAME :</span> <span className="text-red-600 font-semibold">{authUser.fatherName}</span></div>
                    <div><span className="font-bold">D.O.B. :</span> <span className="text-red-600 font-semibold">{authUser.Dob}</span></div>
                    <div><span className="font-bold">CLASS :</span> <span className="text-red-600 font-semibold">{authUser.Standarded}</span></div>
                    <div><span className="font-bold">MOB :</span> <span className="text-red-600 font-semibold">{authUser.phone}</span></div>
                    <div><span className="font-bold">ADD :</span> <span className="text-red-600 font-semibold">{authUser.address}</span></div>
                </div>
                <div className="mt-7 text-left text-sm italic">
                    Principal Sign.{' '}
                    <span
                        style={{
                            color:
                                authUser.status === 'Pending'
                                    ? 'orange'
                                    : authUser.status === 'Cancel'
                                        ? 'red'
                                        : authUser.status === 'Approved'
                                            ? 'green'
                                            : 'black',
                        }}
                    >
                        {authUser.status}
                    </span>
                </div>
            </div>

            <div className='flex  justify-center mt-auto bg-blue-900 text-white align-bottom font-bold px-2 py-0.5 w-full'>
                <h2 className='flex col w-[50%]'>Developed by :  </h2>
                <marquee behavior="scroll">Prakash Singh</marquee>
                </div>
        </div>
    )
}

export default IdCard





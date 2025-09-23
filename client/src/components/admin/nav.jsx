import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../lib/axios';
import { logout } from '../../features/slice/authSlice';
import { getNewStudents, getStart, getStudents, getFailure, getRejectedStudent } from '../../features/slice/studentSlice';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const LogoutHandler = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.get('/logout');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewStudents = async () => {
    try {
      dispatch(getStart());
      const res = await axiosInstance.get("/admin/new_student");
      dispatch(getNewStudents({ newstudents: res.data }));
      navigate("new-student");
    } catch (error) {
      dispatch(getFailure(error.message));
      console.log(error);
    }
  };

  const handleAllStudents = async () => {
    try {
      dispatch(getStart());
      const res = await axiosInstance.get("/admin/students");
      dispatch(getStudents({ student: res.data }));
      navigate("students");
    } catch (error) {
      dispatch(getFailure(error.message));
      console.log(error);
    }
  };

  const handleRejectedStudent =async()=>{
    try {
      dispatch(getStart());
      const res = await axiosInstance.get('admin/rejected_students');
      dispatch(getRejectedStudent({rejectedStudent:res.data}))
      navigate("Rejected-student")
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='flex justify-between w-full border-2 border-black-50 py-2 px-2 bg-blue-500 text-white'>
      <div className='flex font-extrabold' style={{ alignItems: 'center' }}>

        <img src={user?.userPic} className='h-15 w-15 rounded-4xl mr-1 object-cover' />
        {user?.firstName} {user?.lastName}
      </div>
      <div className='flex items-center'>
        <button className='mx-1 btn' onClick={handleAllStudents}>
          All Students
        </button>
        <button className='mx-1 btn' onClick={handleNewStudents}>
          New Student
        </button>
        
          <button className='mx-1 btn' onClick={handleRejectedStudent}>
            Rejected student
          </button>
        <button
          className='mx-1 flex items-center btn'
          type="button"
          onClick={LogoutHandler}
        >
          <LogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;

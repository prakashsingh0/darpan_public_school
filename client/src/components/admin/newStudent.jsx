import React from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../lib/axios';

const NewStudent = () => {
  const students = useSelector((state) => state?.student?.newstudents) || [];

  const confirmHandler = async (id) => {
    try {
      const res = await axiosInstance.put(`/admin/confirm/${id}`);
      console.log('Student confirmed:', res.data);
      // Consider updating local state or refetching to reflect changes
    } catch (error) {
      console.error('Confirm error:', error);
    }
  };

  const onDeny = async(id) => {
     try {
      const res = await axiosInstance.put(`/admin/deny/${id}`);
      console.log('Student Rejected:', res.data);
      // Consider updating local state or refetching to reflect changes
    } catch (error) {
      console.error('Confirm error:', error);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="overflow-auto w-full">
        <table className="min-w-full border border-gray-300 text-xs md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Photo</th>
              <th className="border px-2 py-1">First Name</th>
              <th className="border px-2 py-1">Last Name</th>
              <th className="border px-2 py-1">Father Name</th>
              <th className="border px-2 py-1">DOB</th>
              <th className="border px-2 py-1">Class</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Address</th>
              <th className="border px-2 py-1">Created At</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center p-2">
                  No new students found.
                </td>
              </tr>
            ) : (
              students.map((stu, idx) => (
                <tr key={stu._id || idx}>
                  <td className="border px-2 py-1">
                    {stu.userPic ? (
                      <img src={stu.userPic} alt="UserPic" width={40} className="rounded" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-2 py-1">{stu.firstName || "-"}</td>
                  <td className="border px-2 py-1">{stu.lastName || "-"}</td>
                  <td className="border px-2 py-1">{stu.fatherName || "-"}</td>
                  <td className="border px-2 py-1">{stu.Dob ? new Date(stu.Dob).toLocaleDateString() : "-"}</td>
                  <td className="border px-2 py-1">{stu.Standarded ?? "-"}</td>
                  <td className="border px-2 py-1">{stu.phone || "-"}</td>
                  <td className="border px-2 py-1">{stu.email || "-"}</td>
                  <td className="border px-2 py-1">{stu.role || "-"}</td>
                  <td className="border px-2 py-1">{stu.status || "-"}</td>
                  <td className="border px-2 py-1">{stu.address || "-"}</td>
                  <td className="border px-2 py-1">{stu.createdAt ? new Date(stu.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2 btn"
                      onClick={() => confirmHandler(stu._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 btn"
                      onClick={() => onDeny(stu._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewStudent;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Students = () => {
  const students = useSelector((state) => state?.student?.students);
  console.log(students);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('firstName');
  const [filtered, setFiltered] = useState(students);

  const handleSearch = () => {
    let result = students.filter((stu) => {
      const value =
        searchField === 'Standarded'
          ? String(stu.Standarded)
          : (stu[searchField] || '').toLowerCase();
      return value.includes(searchTerm.toLowerCase());
    });
    setFiltered(result);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4 flex gap-2">
        <select
          className="border rounded px-2 py-1"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="firstName">First Name</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="Standarded">Class</option>
        </select>
        <input
          className="border rounded px-2 py-1"
          placeholder={`Search by ${searchField}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="border rounded px-4 py-1 bg-blue-500 text-white font-semibold"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
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
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center p-2">
                  No students found.
                </td>
              </tr>
            ) : (
              filtered.map((stu, idx) => (
                <tr key={stu._id || idx}>
                  <td className="border px-2 py-1">
                    {stu.userPic ? (
                      <img src={stu.userPic} alt="UserPic" width={40} className="rounded" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-2 py-1">{stu.firstName}</td>
                  <td className="border px-2 py-1">{stu.lastName}</td>
                  <td className="border px-2 py-1">{stu.fatherName}</td>
                  <td className="border px-2 py-1">{stu.Dob}</td>
                  <td className="border px-2 py-1">{stu.Standarded || "-"}</td>
                  <td className="border px-2 py-1">{stu.phone}</td>
                  <td className="border px-2 py-1">{stu.email}</td>
                  <td className="border px-2 py-1">{stu.role}</td>
                  <td className="border px-2 py-1">{stu.status}</td>
                  <td className="border px-2 py-1">{stu.address}</td>
                  <td className="border px-2 py-1">{new Date(stu.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;

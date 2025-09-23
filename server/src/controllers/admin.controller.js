import User from "../models/user.model.js";

const NewStudent = async (req, res) => {
  try {
    const isAdmin = req.user.role;


    if (isAdmin !== 'admin') {
      return res.status(403).json({ message: "Unauthorized - Access denied" });
    }

    // Find users with status: 'Pending' and role: 'student' 
    const newStudents = await User.find({ status: 'Pending', role: 'student' }).select('-password');
    // console.log(newStudents);

    return res.status(200).json(newStudents);
  } catch (error) {
    console.log("Error in NewStudent controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Students = async (req, res) => {
  try {
    const isAdmin = req.user.role;


    if (isAdmin !== 'admin') {
      return res.status(403).json({ message: "Unauthorized - Access denied" });
    }

    // Find users with status: 'Pending' and role: 'student' 
    const students = await User.find({ status: 'Approved', role: 'student' }).select('-password');
    // console.log(newStudents);

    return res.status(200).json(students);
  } catch (error) {
    console.log("Error in Student controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

const Rejected_Students = async (req, res) => {
  try {
    const isAdmin = req.user.role;


    if (isAdmin !== 'admin') {
      return res.status(403).json({ message: "Unauthorized - Access denied" });
    }

    // Find users with status: 'Pending' and role: 'student' 
    const students = await User.find({ status: 'Cancel', role: 'student' }).select('-password');
    // console.log(newStudents);

    return res.status(200).json(students);
  } catch (error) {
    console.log("Error in Student controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

}
const Approved = async (req, res) => {
  
  const isAdmin = req.user.role;
  const studentId = req.params.id;

  // Check if requester is admin
  if (isAdmin !== 'admin') {
    return res.status(403).json({ message: "Unauthorized - Access denied" });
  }

  // Confirm the admin user exists in DB (optional sanity check)
  const isExistsAdmin = await User.findById(req.user._id);
  if (!isExistsAdmin || isExistsAdmin.role !== 'admin') {
    return res.status(403).json({ message: "Unauthorized - Admin not found" });
  }

  try {
    // Find the student by ID
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the user is actually a student (optional)
    if (student.role !== 'student') {
      return res.status(400).json({ message: "User is not a student" });
    }

    // Update the status to 'Approved'
    student.status = 'Approved';
    await student.save();
    

    return res.status(200).json({ message: "Student approved successfully", student });
  } catch (error) {
    console.error("Error approving student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const Deny = async (req, res) => {
  const isAdmin = req.user.role;
  const studentId = req.params.id;

  // Only admin can deny students
  if (isAdmin !== 'admin') {
    return res.status(403).json({ message: "Unauthorized - Access denied" });
  }

  // Verify admin exists in the database
  const isExistsAdmin = await User.findById(req.user._id);
  if (!isExistsAdmin || isExistsAdmin.role !== 'admin') {
    return res.status(403).json({ message: "Unauthorized - Admin not found" });
  }

  try {
    // Find the student by ID
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.role !== 'student') {
      return res.status(400).json({ message: "User is not a student" });
    }

    // Update status to Cancel
    student.status = 'Cancel';
    await student.save();

    return res.status(200).json({ message: "Student denied successfully", student });
  } catch (error) {
    console.error("Error denying student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { NewStudent, Students, Approved, Deny ,Rejected_Students}
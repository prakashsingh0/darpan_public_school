import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js'
import { removeLocalFile } from "../lib/multer.js";

const register = async (req, res) => {
    const { email, firstName, lastName, phone, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res
                .status(401)
                .json({ message: "Password must be at least 6 characters" });
        }

        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // generate JWT token & set cookie
            generateToken(newUser._id, res);

            await newUser.save();

            res.status(201).json({message:"Register Successfully",user:{
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }});
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invailid Credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invailed Credentials" });
        }
       const token= generateToken(user._id, res)

        res.status(200).json({token,user:{
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            fatherName: user.fatherName,
            Dob: user.Dob,
            Standarded:user.Standarded,
            phone: user.phone,
            userPic: user.userPic,
            role: user.role,
            address: user.address
        }});
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })

    }

}
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logged out controller", error.message);
        res.status(500).json({ message: "Internal server Error" })

    }
}

const updateProfile = async (req, res) => {
    try {
        const { fatherName, Dob, Standarded, address } = req.body;
        const userId = req.user._id;

        if (!req.file) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "unsigned_profile_upload",
            folder: "darpan_school",
        });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                userPic: uploadResponse.secure_url,
                fatherName,
                Dob,
                Standarded,
                address,
            },
            { new: true }
        ).select('-password');
        removeLocalFile(req.file.path);
      
        
        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error in update profile:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        removeLocalFile(req.file.path);
    }
};




export { register, login, logout, updateProfile };
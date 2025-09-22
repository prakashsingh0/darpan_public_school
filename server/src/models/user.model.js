import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userPic: {
      type: String,
      required: false,
      default: ''
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    fatherName: {
      type: String,
      required: false,
      default: ''
    },
    Dob:{
      type:String,
      required:false,
      default:Date()
    },
    Standarded: {
      type: Number,
      required: false,
      default: null
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
      required: false
    },
    status:{
      type:String,
      enum:['Pending','Approved','Cancel'],
      default:'Pending',
      required:false
    },
    address:{
        type:String,
        required:false,
        default:''
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

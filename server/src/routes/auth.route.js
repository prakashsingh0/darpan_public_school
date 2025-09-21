import express from "express";
import { login, logout, register, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

import upload from "../lib/multer.js";

const versionCon = 'v1'
const router=express.Router();

router.post(`/${versionCon}/signin`, register);
router.post(`/${versionCon}/login`, login);
router.get(`/${versionCon}/logout`,protectRoute,logout)
router.put(`/${versionCon}/updates`,protectRoute,upload.single("userPic"),updateProfile)
export default router;
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { Approved, Deny, NewStudent, Students } from '../controllers/admin.controller.js';

const admin = 'v1/admin'

const router = express.Router();

router.get(`/${admin}/new_student`,protectRoute,NewStudent);
router.get(`/${admin}/students`,protectRoute,Students);
router.put(`/${admin}/confirm/:id`, protectRoute, Approved);
router.put(`/${admin}/deny/:id`, protectRoute, Deny);


export default router;
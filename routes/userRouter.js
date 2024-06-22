import { Router } from "express";
const router = Router();

import {
    getCurrentUser,
    getApplicationStats,
    updateUser
} from '../controllers/userController.js';
import { validateUpdateUser } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";



router.route('/current-user').get(getCurrentUser);
router.route('/admin/app-stats').get(authorizePermissions('admin'), getApplicationStats);
router.route('/update-user').patch(upload.single('avatar'), validateUpdateUser, updateUser);



export default router;
import { Router } from "express";
const router = Router();
import {
    login,
    logout,
    register
} from '../controllers/authController.js';
import { validateUser, validateLogin } from '../middleware/validationMiddleware.js';



router.route('/login').post(validateLogin, login);
router.route('/register').post(validateUser, register);
router.route('/logout').get(logout);



export default router;
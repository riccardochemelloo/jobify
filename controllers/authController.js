import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { createToken } from "../utils/tokenUtils.js";



export const login = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) throw new UnauthorizedError('Invalid credentials');
    const isPasswordValid = await comparePassword(req.body.password, user.password);
    if (!isPasswordValid) throw new UnauthenticatedError('Password is not correct');
    const token = createToken({userId: user._id, role: user.role});
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    });
    res.status(StatusCodes.OK).json({msg: 'User logged in'});
}



export const register = async (req, res) => {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg:'User created'});
}



export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg: 'user logged out'});
}
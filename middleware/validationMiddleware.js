import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';



const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('No job')) {
                    throw new NotFoundError(errorMessages);
                }
                if (errorMessages[0].startsWith('Not authorized')) {
                    throw new UnauthorizedError('Not authorized to access this resource');
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
}



export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('Company is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('jobLocation').notEmpty().withMessage('Job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid type value')
]);



export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, {req}) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) throw new BadRequestError('Invalid MongoDB id');
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`No job found with id ${value}`);
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner) throw new UnauthorizedError('Not authorized to access this resource');
    }),
]);



export const validateUser = withValidationErrors([
    body('name')
        .notEmpty().withMessage('Please provide name'),
    body('email')
        .notEmpty().withMessage('Please provide email')
        .isEmail().withMessage('Please provide valid email')
        .custom(async (email) => {
            const user = await User.findOne({email: email});
            if (user) throw new BadRequestError(`This email ${email} has already been taken`);
        }),
    body('password')
        .notEmpty().withMessage('Please provide password')
        .isLength({min: 6, max: 20}).withMessage('Password must be between 8 and 20 characters')
]);



export const validateLogin = withValidationErrors([
    body('email')
        .notEmpty().withMessage('Please provide email')
        .isEmail().withMessage('Please provide valid email'),
    body('password')
        .notEmpty().withMessage('Please provide password')
]);



export const validateUpdateUser = withValidationErrors([
    body('name')
        .notEmpty().withMessage('Please provide name'),
    body('email')
        .notEmpty().withMessage('Please provide email')
        .isEmail().withMessage('Please provide valid email'),
    body('location')
        .notEmpty().withMessage('Location is required'),
    body('lastName')
        .notEmpty().withMessage('Last name is required')
]);
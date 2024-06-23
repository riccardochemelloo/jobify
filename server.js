// import libraries
import 'express-async-errors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';



// import express and create server
import express from 'express';
const app = express();



// import routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';



// public
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';



// import middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from "./middleware/authMiddleware.js";



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});



const __dirname = dirname(fileURLToPath(import.meta.url));



// middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());



// dummy route
app.get('/api/v1/test', (req, res) => {
    res.json({msg: 'test route'});
})



// set routers
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});



// Not-found middleware
app.use('*', (req, res) => {
    res.status(404).json({msg: 'Not found'});
})



// Error handler middleware
app.use(errorHandlerMiddleware);



// server port
const port = process.env.PORT || 5100;



// start the server
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import pitchsRoute from "./routes/pitchs.js";
import childPitchsRoute from "./routes/childPitchs.js";
// import adminRoute from "./routes/admins.js";
import orderRoute from "./routes/order.js";
import conversationRoute from "./routes/conversation.js";
import cors from "cors";

const app = express();
dotenv.config()


//Connect to db
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongodb")
    } catch (err) {
        throw err;
    }
};

mongoose.connection.on("Disconnected", () => {
    console.log("mongoDB disconnected!")
})
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})
//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"));
app.use(cors());

// const corsOrigin ={
//     origin:'http://localhost:8686', //or whatever port your frontend is using
//     credentials:true,            
//     optionSuccessStatus:200
// }

// console.log(cors(corsOrigin), 11111111111);

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/pitchs', pitchsRoute);
app.use('/api/childPitchs', childPitchsRoute);
// app.use('/api/admins', adminRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(8000, () => {
    connect();
    console.log("Connect to backend");
});
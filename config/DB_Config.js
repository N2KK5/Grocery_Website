import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Env Configuration
dotenv.config();

// DB Env
const DB_uri = process.env.MONGO_URI;

// Mongodb Connection
const DB_Config = mongoose.connect(DB_uri).then(() => {
    console.log("DB Connected Successfully");
}).catch((error) => {
    console.log("Connection failed:", error);
});

export default DB_Config;

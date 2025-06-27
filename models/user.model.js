import mongoose from "mongoose";

// Data Schema
const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, { msg: "Enter your username" }]
        },
        password: {
            type: String,
            required: [true, {msg: "Enter the password"}]
        }
    },
    {
        timestamps: true,
    }
);

// Data Model
const UserModel = mongoose.model("User_List", UserSchema);

export default UserModel;
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    watchHistory: {
        type: Schema.types.ObjectId,
        ref: "Video"

    },
    refreshToken: { type: String }
},
    {
        timestamps: true
    }
);
export default mongoose.model("User", userSchema);
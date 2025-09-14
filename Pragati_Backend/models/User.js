import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: { type: String, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String, trim: true },
    role: { type: String, default: "user" }  // by default user
}, { timestamps: true });

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Admin was previously a hardcoded email/password pair in
    // controller/user.controller.js, in a public repository. It is a property
    // of the account now, and an account is promoted with `npm run seed:admin`.
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

const User = mongoose.model("User", userSchema);
export default User;
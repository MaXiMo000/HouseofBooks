/**
 * Promote an account to admin.
 *
 *   ADMIN_EMAIL=you@example.com npm run seed:admin
 *
 * Replaces the hardcoded admin@gmail.com / 1234 pair that used to sit in
 * controller/user.controller.js in a public repository.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../model/user.model.js";

dotenv.config();

const email = process.env.ADMIN_EMAIL;
if (!email) {
    console.error("Set ADMIN_EMAIL to the address of an existing account.");
    process.exit(1);
}

const uri = process.env.MongoDBURI;
if (!uri) {
    console.error("MongoDBURI is not set.");
    process.exit(1);
}

await mongoose.connect(uri);
const user = await User.findOneAndUpdate({ email }, { role: "admin" }, { new: true });
if (!user) {
    console.error(`No account with email ${email}. Sign up first, then run this.`);
    await mongoose.disconnect();
    process.exit(1);
}
console.log(`${user.email} is now an admin.`);
await mongoose.disconnect();

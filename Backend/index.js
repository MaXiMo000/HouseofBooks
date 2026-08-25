import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import searchRoute from "./route/search.route.js";
import categoryRoute from "./route/category.route.js";
import cartRoute from "./route/cart.route.js"
import adminRoute from "./route/admin.route.js"

const app = express();

// cors() with no options reflects any origin, so any site could call this API
// with a victim's browser. Allowlist instead; FRONTEND_URL is the deployed
// origin, with the Vite dev server allowed for local work.
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;               

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/search", searchRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use('/books', adminRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import searchRoute from "./route/search.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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
app.use("/search", searchRoute)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
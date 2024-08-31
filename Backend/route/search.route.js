import express from "express";
import {searchUsers} from "../controller/search.controller.js";
const router = express.Router();

// router.get("/",search);

router.get('/search', searchUsers);

export default router;
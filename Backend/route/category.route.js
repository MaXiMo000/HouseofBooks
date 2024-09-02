import express from "express";
import { searchCategories } from "../controller/category.controller.js";
const router = express.Router();

// router.get("/",search);

router.get('/', searchCategories);

export default router;
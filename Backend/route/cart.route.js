import express from "express";
import { addCart, deleteItemFromCart, getCartItems, incrementItemQuantity, decrementItemQuantity } from "../controller/cart.controller.js";

const router = express.Router();

router.get("/add", addCart);
router.get("/get", getCartItems);
router.get("/inc", incrementItemQuantity);
router.get("/dec", decrementItemQuantity);
router.get("/delete", deleteItemFromCart);

export default router;
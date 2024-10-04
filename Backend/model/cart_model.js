import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    quantity: { type: Number, default: 1 },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
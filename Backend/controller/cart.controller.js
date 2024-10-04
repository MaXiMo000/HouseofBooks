import Cart from "../model/cart_model.js";

export const addCart = async (req, res) => {
    try {
        // const name = req.query.name;
        // const price = req.query.price;
        // const image = req.query.image;
        // const title = req.query.title;
        // const category = req.query.category;

        const { image, name, price, category, title } = req.query;
        const quantity = 1;

        const newCart = new Cart({
            name,
            price,
            category,
            image,
            title,
            quantity,
        });

        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        console.error('Error Adding Book in cart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteItemFromCart = async (req, res) => {
    try {
    const { title } = req.query;

    // Find the item by title
    let cartItem = await Cart.findOne({ title });

    if (!cartItem) {
        return res.status(404).json({ message: "Item not found in cart" });
    }

    await Cart.deleteOne({ title });
    return res.status(200).json({ message: "Item removed from cart" });


} catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item', error: error.message });
}
};

export const getCartItems = async (req, res) => {
    try {
    // Assuming a single cart for the demo; normally you would retrieve the cart by userId
    // const cart = await Cart.findOne();

    // if (!cart || !Array.isArray(cart.items)) {
    //     return res.status(404).json({ message: "Cart or cart items not found" });
    // }

    // res.status(200).json({ cart: cart.items }); // Return only the items array
    // console.log({ cartItems: cart.items });
    // console.log({cart});

    const cartItems = await Cart.find(); // This returns an array of all documents

    if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: "No items found in the cart" });
    }

    // Return the array of cart items
    console.log(cartItems);
    res.status(200).json(cartItems); 

    } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error: error.message });
    }
};

// Increment item quantity in the cart by title
export const incrementItemQuantity = async (req, res) => {
    try {
        const { title } = req.query;

        // Find the item by title
        let cartItem = await Cart.findOne({ title });

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Increment the quantity
        cartItem.quantity += 1;

        // Save the updated item
        await cartItem.save();

        res.status(200).json({ message: "Item quantity increased", cartItem });
    } catch (error) {
        console.error("Error incrementing item quantity:", error);
        res.status(500).json({ message: "Error incrementing item quantity", error: error.message });
    }
};

// Decrement item quantity in the cart by title
export const decrementItemQuantity = async (req, res) => {
    try {
        const { title } = req.query;

        // Find the item by title
        let cartItem = await Cart.findOne({ title });

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Decrement the quantity
        cartItem.quantity -= 1;

        // If the quantity reaches 0, remove the item from the cart
        if (cartItem.quantity === 0) {
            await Cart.deleteOne({ title });
            return res.status(200).json({ message: "Item removed from cart" });
        }

        // Save the updated item
        await cartItem.save();

        res.status(200).json({ message: "Item quantity decreased", cartItem });
    } catch (error) {
        console.error("Error decrementing item quantity:", error);
        res.status(500).json({ message: "Error decrementing item quantity", error: error.message });
    }
};
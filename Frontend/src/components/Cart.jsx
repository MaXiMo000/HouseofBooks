import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCartItems = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cart/get`);
        console.log(response.data); // Add this line to inspect the response

        if (Array.isArray(response.data)) {
            setCartItems(response.data);

            // Calculate total price
            const total = response.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
        } else {
            console.error("Expected cart to be an array.");
        }

        // Calculate total price
        const total = response.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
    };


    // Fetch cart items from the backend when component mounts
    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleIncrement = async (title) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/cart/inc`, { params: { title } });
            console.log("Item quantity increased:", response.data);
            // Fetch updated cart items after increment
            fetchCartItems();
        } catch (error) {
            console.error("Error incrementing item quantity", error);
        }
    };

    // Decrement the item quantity
    const handleDecrement = async (title) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/cart/dec`, { params: { title } });
            console.log("Item quantity decreased or removed:", response.data);
            // Fetch updated cart items after decrement
            fetchCartItems();
        } catch (error) {
            console.error("Error decrementing item quantity", error);
        }
    };

    const handleDelete = async (title) => {
        try {
            await axios.get(`${BACKEND_URL}/cart/delete`, { params: { title } });
            fetchCartItems(); // Fetch updated cart items after deletion
        } catch (error) {
            console.error("Error deleting item from cart", error);
        }
    };

    return (
        <div className="mt-20 min-h-screen bg-gray-100 p-6 dark:bg-slate-900 dark:text-white dark:border">
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 dark:text-white">Shopping Cart</h1>

            {cartItems.length === 0 ? (
            <div className="text-center mt-10">
                <h2 className="text-xl text-gray-600">Your cart is empty</h2>
                <a href="/" className="text-pink-500 hover:underline">Go Shopping</a>
            </div>
            ) : (
            <div className="flex flex-col md:flex-row gap-8">
                {/* Cart Items */}
                <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-6 dark:bg-slate-900 dark:text-white dark:border">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:text-white">Your Items</h2>
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-6 border-b pb-4 dark:text-white">
                    <div className="flex items-center">
                        <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md mr-4 dark:text-white"
                        />
                        <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-white">{item.category}</p>
                        <p className="text-sm text-gray-500 dark:text-white">Quantity: {item.quantity}</p>
                        {/* Increment/Decrement Buttons */}
                        <div className="flex space-x-2 mt-2">
                            <button 
                                onClick={() => handleDecrement(item.title)} 
                                className="px-2 py-1 bg-red-500 text-white rounded-md dark:text-white">
                                -
                            </button>
                            <button 
                                onClick={() => handleIncrement(item.title)} 
                                className="px-2 py-1 bg-green-500 text-white rounded-md dark:text-white">
                                +
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-lg font-semibold text-gray-700 dark:text-white">${item.price}</div>
                        {/* Delete Button */}
                        <button onClick={() => handleDelete(item.title)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                ))}
                </div>

                {/* Order Summary */}
                <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 dark:bg-slate-900 dark:text-white dark:border">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:text-white">Order Summary</h2>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-600 dark:text-white">Subtotal</span>
                    <span className="text-lg font-semibold text-gray-700 dark:text-white" >${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-600 dark:text-white">Shipping</span>
                    <span className="text-lg font-semibold text-gray-700 dark:text-white">$5.00</span>
                </div>
                <div className="flex justify-between items-center mb-8 border-t pt-4">
                    <span className="text-xl font-bold text-gray-700 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-gray-800 dark:text-white">${(totalPrice + 5).toFixed(2)}</span>
                </div>
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-md transition duration-300 dark:text-white">
                    Proceed to Checkout
                </button>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}

export default Cart;

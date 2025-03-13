import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [bookData, setBookData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        title: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
        const response = await axios.get(`${BACKEND_URL}/books`);
        setBooks(response.data);
        } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Failed to fetch books.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const addBook = async () => {
        try {
        const response = await axios.post(`${BACKEND_URL}/books/add`, bookData);
        if (response.data.success) {
            setMessage('Book added successfully!');
            setBookData({ name: '', price: '', category: '', image: '', title: '' });
            fetchBooks();
        } else {
            setMessage('Failed to add book.');
        }
        } catch (error) {
        console.error('Error adding book:', error);
        setMessage('Error adding book.');
        }
    };

    const deleteBook = async (id) => {
        try {
        const response = await axios.delete(`${BACKEND_URL}/books/${id}`);
        if (response.data.success) {
            setMessage('Book deleted successfully!');
            fetchBooks();
        } else {
            setMessage('Failed to delete book.');
        }
        } catch (error) {
        console.error('Error deleting book:', error);
        setMessage('Error deleting book.');
        }
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <button onClick={() => navigate('/')} className="mb-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Return to Home
        </button>
        
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Add New Book</h2>
            <div className="mb-4">
            <input
                type="text"
                name="name"
                value={bookData.name}
                onChange={handleInputChange}
                placeholder="Author"
                className="p-2 border border-gray-300 rounded mr-2"
                required
            />
            <input
                type="number"
                name="price"
                value={bookData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="p-2 border border-gray-300 rounded mr-2"
                required
            />
            <input
                type="text"
                name="category"
                value={bookData.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="p-2 border border-gray-300 rounded mr-2"
                required
            />
            <input
                type="text"
                name="image"
                value={bookData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="p-2 border border-gray-300 rounded mr-2"
                required
            />
            <input
                type="text"
                name="title"
                value={bookData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="p-2 border border-gray-300 rounded mr-2"
                required
            />
            <button
                onClick={addBook}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Book
            </button>
            </div>
        </div>

        <ul>
            {books.map((book) => (
            <li key={book._id} className="flex justify-between items-center mb-2 p-2 border border-gray-300 rounded">
                <span>{book.title} - ${book.price}</span>
                <button
                onClick={() => deleteBook(book._id)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                Delete
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default AdminDashboard;

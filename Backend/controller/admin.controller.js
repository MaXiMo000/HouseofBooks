import Book from '../model/book.model.js';
import mongoose from 'mongoose';

// Fetch all books
export async function getBooks(req, res) {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Failed to fetch books.' });
    }
}

// Add a new book
export async function addBook(req, res) {
    try {
        const { name, price, category, image, title } = req.body;
        if (!name || !price || !category || !image || !title) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newBook = new Book(req.body);

        const savedBook = await newBook.save();
        res.json(savedBook, { success: true });
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a book by ID
export async function deleteBook(req, res) {
    const { id } = req.params;

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        console.log(id);
        const result = await Book.findByIdAndDelete(id);
        console.log(result);
        if (!result) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Failed to delete book.' });
    }
}
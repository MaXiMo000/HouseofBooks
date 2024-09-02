import Book from "../model/book.model.js";

// Controller function to handle category requests

export const searchCategories = async (req, res) => {
    try {
        const category = req.query.category; // Get the query parameter 'category'
        if (!category) {
            return res.status(400).json({ error: 'Category query parameter is required' });
        }

        // Search for users with matching categorys (case-insensitive)
        const users = await Book.find({ category: new RegExp(category, 'i') });

        // Log the results found
        console.log('Users found:', users);

        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: 'No Books found' });
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};
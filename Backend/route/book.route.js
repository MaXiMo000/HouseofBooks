import express from "express";
import { getBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);

router.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/books', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json({ success: true });
});

router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ success: true });
});

export default router;
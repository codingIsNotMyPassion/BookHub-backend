const Book = require("../models/bookModel");
const asyncHandler = require("express-async-handler");

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  if (!books) {
    res.status(400);
    throw new Error("No books found");
  }
  res.status(200).json(books);
});

const getBook = asyncHandler(async (req, res) => {
  const response = await Book.findById(req.params.id);
  if (!response) {
    res.status(400);
    throw new Error("No book found");
  }
  res.status(200).json(response);
});

const postBook = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.author ||
    !req.body.description ||
    !req.body.image
  ) {
    res.status(400);
    throw new Error();
  }
  const { image, title, author, description } = req.body;
  await Book.create({
    image: image,
    title: title,
    author: author,
    description: description,
  });
  res.status(200).json({ message: "book is successfully added" });
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(400);
    throw new Error("No book find with id");
  }
  await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ message: "book is successfully updated" });
});
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(400);
    throw new Error("No book found with id");
  }
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "book is successfully deleted" });
});

module.exports = { getBooks, getBook, postBook, updateBook, deleteBook };

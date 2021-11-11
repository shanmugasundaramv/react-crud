const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Book = require('../models/book');
const User = require('../models/user');

const getBooks = async (req, res, next) => {

  let books;
  try {
    books = await Book.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a book.',
      500
    );
    return next(error);
  }
  // console.log('****** books ', books);
  if (!books) {
    const error = new HttpError(
      'Could not find book for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ books: books.map(book => book.toObject({ getters: true })) });
};

const getBooksByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let books;
  let userWithBooks;
  try {
    userWithBooks = await User.findById(userId).populate('books');
  } catch (err) {
    const error = new HttpError(
      'Fetching books failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!books || books.length === 0) {
  if (!userWithBooks || userWithBooks.books.length === 0) {
    return next(
      new HttpError('Could not find books for the provided user id.', 404)
    );
  }

  res.json({ books: userWithBooks.books.map(book => book.toObject({ getters: true })) });
};

const createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
console.log('****** req.body ', req.body)
  const { title, subtitle, author, price, description, creator } = req.body;
  const _id = req.body.id;
  const createdBook = new Book({
    _id,
    title,
    subtitle,
    author,
    price,
    description,
    creator
  });
console.log('****** createdBook ', createdBook);
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      'Creating book failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  console.log('***** user details', user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdBook.save({ session: sess }); 
    user.books.push(createdBook); 
    await user.save({ session: sess }); 
    await sess.commitTransaction();
    // await createdBook.save();
  } catch (err) {
    const error = new HttpError(
      '2 Creating book failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ book: createdBook });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, subtitle, author, price, description } = req.body;
  const bookId = req.params.bookId;
  console.log('****** bookId ', bookId);
  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update book.',
      500
    );
    return next(error);
  }

  if (book.creator.toString() !== req.userData.id) {
    const error = new HttpError('You are not allowed to edit this place.', 401);
    return next(error);
  }

  book.title = title;
  book.subtitle = subtitle;
  book.author = author;
  book.price = price;
  book.description = description;

  try {
    await book.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update book.',
      500
    );
    return next(error);
  }

  res.status(200).json({ book: book.toObject({ getters: true }) });
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;

  let book;
  try {
    book = await Book.findById(bookId).populate('creator');
    // book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete book.',
      500
    );
    return next(error);
  }

  if (!book) {
    const error = new HttpError('Could not find book for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await book.remove({session: sess});
    book.creator.books.pull(book);
    await book.creator.save({session: sess});
    await sess.commitTransaction();
    await book.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete book.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Deleted book.' });
};

exports.getBooks = getBooks;
exports.getMyBooks = getBooksByUserId;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;

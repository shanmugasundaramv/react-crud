const express = require('express');
const { check } = require('express-validator');

const booksControllers = require('../controllers/books-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', booksControllers.getBooks);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  booksControllers.createBook
);

router.put(
  '/:bookId',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  booksControllers.updateBook
);

router.delete('/:bookId', booksControllers.deleteBook);

module.exports = router;

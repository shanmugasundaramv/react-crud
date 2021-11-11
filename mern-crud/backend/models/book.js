const mongoose = require('mongoose');
const uuid = require('uuid').v4;
// import { v4 as uuid } from "uuid";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: { type: String, required: true, default: uuid },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Book', bookSchema);

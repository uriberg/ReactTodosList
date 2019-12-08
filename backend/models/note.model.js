const mongoose = require('mongoose');
const Item = require('./item.model');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: {type: String, required: true},
  creationDate: {type: Date, required: true}
  //items: [Item]
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

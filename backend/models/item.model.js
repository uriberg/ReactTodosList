const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item: {
        name: String,
        complete: false
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

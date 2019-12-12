const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoItemSchema = new Schema({
    task: String,
    isComplete: Boolean
});


const NoteSchema = new Schema({
        name: {type: String, required: true},
        todoList: {type: [TodoItemSchema], required: false}
        //creationDate: {type: Date, required: true}
        //items: [Item]
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;

const router = require('express').Router();
let Note = require('../models/note.model');

router.route('/').get((req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const creationDate = Date.parse(req.body.creationDate);

    const newNote = new Note({
        name,
        creationDate
    });

    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(note => res.json('Note Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


const router = require('express').Router();
// const { error } = require('console');
const fs = require('fs');
const path = require('path');
// const uniquid = require('uniquid')

router.get('..public/notes.html', 
(req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/api/notes', 
(req, res) => {
    fs.readFile('../db/db.json', 'utf8', 
    (error, data) => {
        res.send(data);
    })
});

router.post('/api/notes', 
(req, res) => {
    fs.readFile('../db/db.json', 'utf8', 
    (error, data) => {
        const notes = json.parse(data)
        const newNotes = req.body
        // newNotes.id = uniqid()

        notes.push(newNotes)
        fs.writeFile('../db/db.json', json.stringify(notes), 
        (error, data) => {
            res.json(newNotes)
        });
    });
});

module.exports = router


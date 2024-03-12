const router = require('express').Router();
const { error } = require('console')
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid')

router.get('/notes', 
(req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/api/notes', 
(req, res) => {
    fs.readFile('./db/db.json', 
    (error, data) => {
        res.json(JSON.parse(data));
    })
});

router.post('/api/notes', 
(req, res) => {
    fs.readFile('./db/db.json', 'utf8', 
    (error, data) => {
        if (error) {
            throw new Error(error)
        }
        const notes = JSON.parse(data) || []
        const newNotes = {title: req.body.title, text: req.body.text, id: uniqid()} 


        notes.push(newNotes)
        fs.writeFile('./db/db.json', JSON.stringify(notes), 
        (error, data) => {
            res.json(newNotes)
        });
    });
});

router.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        const noteUpdated = notes.filter(note => note.id !== req.params.id)
    fs.writeFile('./db/db.json', JSON.stringify(noteUpdated), (err) => {
        res.json(noteUpdated)
})
})
})

router.get("*", 
(req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


module.exports = router


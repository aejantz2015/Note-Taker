const router = require('express').Router();
const { error } = require('console')
const fs = require('fs');
const path = require('path');
// const uniquid = require('uniquid')

router.get('/notes', 
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
        const notes = JSON.parse(data)
        const newNotes = req.body
        // newNotes.id = uniqid()

        notes.push(newNotes)
        fs.writeFile('../db/db.json', JSON.stringify(notes), 
        (error, data) => {
            res.json(newNotes)
        });
    });
});

router.get("*", 
(req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


module.exports = router


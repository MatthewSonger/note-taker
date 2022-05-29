let notes = require('../db/db.json');
const app = require('express').Router();
const fs = require('fs');

const uuid = require('../lib/uuid');

app.get('/api/notes', (req, res) => {
    let noteString = fs.readFileSync(`./db/db.json`)
    
    notes = JSON.parse(noteString) || [];
    console.info(`${req.method} request received to get notes`);
    res.json(notes);
});

app.get('/api/notes/:notes_id', (req, res) => {
    if (req.body && req.params.note_id) {
        console.info(`${req.method} request received to get notes`);
        const noteId = req.params.note_id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.note_id === noteId) {
                res.json(currentNote);
                return
            }
        }
        res.json('Note not found');
    }
});

app.post('/api/notes', (req, res) => {

    
    console.info(`${req.method} request received to add new note`);

    
    const { title, text } = req.body;

   
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        
        notes.push(newNote)

        
        const noteString = JSON.stringify(notes);

        
        fs.writeFile(`./db/db.json`, noteString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `New Note ${newNote.title} has been written to file`
                )
        );
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.json(notes);
    } else {
        res.json('Error in creating new note');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const index = notes.findIndex(note => note.id === req.params.id);
    console.log('index: ', index);
    if (index > -1) {
        notes.splice(index, 1);
    }
    fs.writeFile(`./db/db.json`, JSON.stringify(notes, '\t'), (err) => {
        err
            ? console.error(err)
            : res.send(`Note with id: ${req.params.id} has been deleted.`)
    });
});

module.exports = app;
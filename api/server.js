const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/*
TODO:
- Create a note with a title and content.
- View an existing note.
- Edit an existing note.
- Delete an existing note.
- Modify your front-end so that it uses your newly created Web API.
*/

/*
DONE:
- Display a list of notes.
*/

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server running" });
});

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {

      if (!notes || notes.length < 1) {
        res.status(404).json({ None: 'There are no notes yet, get writing!' })
      } else {
        res.status(200).json(notes);
      }

    })
    .catch(err => res.status(500).json({ error: 'Could not retrieve notes' }, err));
});


module.exports = server;
const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/*
TODO:
- Edit an existing note.
- Delete an existing note.
- Modify your front-end so that it uses your newly created Web API.
*/

/*
DONE:
- Display a list of notes.
- View an existing note.
- Create a note with a title and content.
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

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes').where({ id }).first()
    .then(note => {

      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ missingError: 'Could not find a note by that id' });
      }

    })
    .catch(err => res.status(500).json({ error: 'An error occurred with the server when making the request, please try again' }, err));
});

server.post('/api/notes', (req, res) => {
  let { title, content } = req.body;

  if(!req.body.title || !req.body.content || req.body.title.length < 1 || req.body.content.length < 1 ) {
    return res.status(422).json({ fillError: 'Please enter a title and content' });            
  }

  db.insert({ title, content })
    .into('notes')
    .then(note => {
      res.status(201).json({ success: `Note has been created, the id is: ${note}`});
    })
})

module.exports = server;
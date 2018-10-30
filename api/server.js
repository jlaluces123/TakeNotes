const express = require('express');
const server = express();
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
server.use(cors());
server.use(express.json());

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const jwtSecret = 'nobody tosses a dwarf!';
function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: 'user',
    roles: 'admin'
  };
  const jwtOptions = {
    expiresIn: '10m'
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

function protected(req, res, next) {
  // auth tokens are usually sent as part of the header, not body
  // if user is not logged in, respond with correct httpcode and message...
  const token = req.headers.authorization;

  if (token) 
  {

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass!' });
      } else {
        req.decodedToken = decodedToken; 
        console.log(req.decodedToken, 'decodedToken from req object');
        // destructure --> any subsequent middleware of route handlers has access to this
        // so now... '/users' has access to the req.decodedToken
        next();
      }
    })

  } else {
    res.status(401).json({ message: 'No token provided' });
  }
}

function checkRole(role) {
  return function(req, res, next) {
    /* 
      - checking in the protected function, if req.decodedToken exists 
      - and also checking if the decodedToken.roles includes the role given when we invoke the function.
    */
    
    if (req.decodedToken && req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'you shall not pass! forbidden' });
    }
  };
}

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server running" });
});

server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        console.log(user);
        const token = generateToken(user);
        // on succcess, create a new JWT with user id as subject
        res.status(200).json({ welcome: user.username, token });
      } else {
        // if failure, send back correct HTTPCODE with message...
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

server.post('/api/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash; // hash the password beforehand

  db('users')
    .insert(credentials)
    .then(ids => {
      console.log(ids);
      const id = ids[0]; 
      return db('users').where({ username: credentials.username }).first()
        .then(response => {
          console.log(response);
          const token = generateToken(response);
          res.status(201).json({ welcome: response.username, token});
        })      
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/notes', protected, checkRole('admin'), (req, res) => {
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
    .catch(err => res.status(500).json(err));
});

server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('notes').where({ id }).update(changes)
    .then(response => {

      if (response === 1) {
        res.status(200).json({ success: 'Updated successfully! Keep studying!' });
      } else {
        res.status(404).json({ missing: 'Could not find a note by that ID' });
      }

    })
    .catch(err => res.status(500).json({ error: 'An error has occurred with the server, please try again' }, err));
});


server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes').where({ id }).del()
    .then(response => {
      if (response === 0) {
        res.status(404).json({ missing: 'Could not find a note by that ID' })
      }
      res.status(200).json({ success: 'Note has been successfully deleted, don\'t worry, we won\'t tell mom!' });
    })
    .catch(err => res.status(500).json({ error: 'An error has occurred with the server, please try again' }, err));
})
module.exports = server;
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Models = require('./model.js')
const { check, validationResult } = require('express-validator')
const cors = require('cors')

let allowedOrigins = [
  'http://localhost:8080', 'http://testsite.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin is not found on the allowedOrigins list
      let message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('common'))
app.use(express.static('public'))

const Movies = Models.Movie
const Users = Models.User
const Directors = Models.Director
const Genres = Models.Genre

// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // The URL is stored online on the Heroku website for security reasons

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.get('/movies',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Movies.find().then((movies) => {
    res.status(201).json(movies)
  }).catch((err) => {
    console.error(err)
    res.status(505).send('Error: ' + err)
  })
})

app.get('/movies/:title',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({'movie.title': req.params.title}).then((movies) => {
      res.json(movies)
    }).catch((err) => {
      console.error(err)
      res.status(505).send('Error: ' + err)
    })
  });

app.get('/genres/:Name',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Genres.findOne({"genre.Name": req.params.Name}).then((genres) => {
      res.json(genres)
    }).catch((err) => {
      console.error(err)
      res.status(505).send('Error: ' + err)
    })
  });

app.get('/directors/:Name',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Directors.findOne({"director.Name": req.params.Name}).then((directors) => {
      res.json(directors)
    }).catch((err) => {
      console.error(err)
      res.status(505).send('Error: ' + err)
    })
  });

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users',
 (req, res) => {
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed

  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }
  }

  let hashedPassword = Users.hashPassword(req.body.Password)
  Users.findOne({Username: req.body.Username}).then((user) => { // Search to see if the user is already in the database
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists')
    } else {
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }).then((user) => {res.status(201).json(user) }).catch((error) => {
        console.error(error)
        res.status(500).send('Error: ' + error)
      })
    }
  })
})

// Get all users
app.get('/users',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Users.find().then((users) => {
    res.status(201).json(users)
  }).catch((err) => {
    console.error(err)
    res.status(505).send('Error: ' + err)
  })
})

// Get a user by username
app.get('/users/:Username',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Users.findOne({Username: req.params.Username}).then((user) => {
    res.json(user)
  }).catch((err) => {
    console.error(err)
    res.status(505).send('Error: ' + err)
  })
})

/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
  // Validation for information entered in JSON format for updating a user
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }
  }

  Users.findOneAndUpdate({Username: req.params.Username}, { $set: 
    {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }},
  {new:true}, // So that updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err)
      res.status(500).send('Error ' + err)
    } else {
      res.json(updatedUser)
    }
  })
})

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, { $push: {FavoriteMovies: req.params.MovieID}
  }, {new:true}, // So that updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err)
      res.status(500).send('Error: ' + err)
    } else {
      res.json(updatedUser)
    }
  })
})

app.get('/', (req, res) => {
    res.send('Welcome to my movie directory')
})

// Delete a user by username
app.delete('/users/:Username',
 passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Users.findOneAndRemove({Username: req.params.Username}).then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + 'was not found')
    } else {
      res.status(200).send(req.params.Username + 'was deleted')
    }
  }).catch((err) => {
    console.error(err)
    res.status(500).send('Error: ' + err)
  })
})

// Remove movie from user's favorites
app.post('/users/:Username/movies/:MovieID',
 (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, { $pull: {FavoriteMoves: req.params.MovieID}
  }, {new:true}, // So that updated document is returned
  (err, updatedUser) => {
    if(err) {
    console.error(err)
    res.status(500).send('Error: ' + err)
  } else {
    res.json(updatedUser)
    }
  })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err.stack)
    res.status(500).send('Something broke!');
  });

require('log-timestamp')(function() { return 'date="' + new Date().toISOString() + '" message="%s"' });

// Listens for request
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

 // const logs = fs.writeFileSync('log.txt', '')

 /*
 mongoimport --uri mongodb+srv://thisistheperfectplan:c0wman88@myflixandfirstdb.8zljr.mongodb.net/myFlixDB --collection movies --type json --file ./movies.json
 mongo "mongodb+srv://myflixandfirstdb.8zljr.mongodb.net/myFirstDatabase" --username thisistheperfectplan
 */
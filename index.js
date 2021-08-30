const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs')

let tenMovies = [{
    title: 'Kung Fu Panda 2',
    releaseDate: 2003,
    director: 'Jennefir Yuh Nelsion',
    genre: 'family'
}, {
    title: 'Scott Pilgrim Vs. The World',
    releaseDate: 2010,
    director: 'Edgar Wright',
    genre: 'comedy'
}, {
    title: 'The Social Network',
    releaseDate: 2010,
    director: 'David Fincher',
    genre: 'drama'
}, {
    title: 'A Silent Voice',
    releaseDate: 2016,
    director: 'Naoko Yamada',
    genre: 'animation'
}, {
    title: 'Avengers Infinity War',
    releaseDate: 2018,
    director: 'Joe Russo/Antho Russo',
    genre: 'action'
}, {
    title: 'The Emperors New Groove',
    releaseDate: 2000,
    director: 'Mark Dindal',
    genre: 'comedy'
}, {
    title: 'Anomolisa',
    releaseDate: 2015,
    director: 'Charlie Kaufman/Duke Johnson',
    genre: 'romance'
}, {
    title: 'Spirited Away',
    releaseDate: 2001,
    director: 'Hayao Miyazaki',
    genre: 'animation'
}, {
    title: 'John Wick',
    releaseDate: 2014,
    director: 'Chad Stahelski',
    genre: 'action'
}, {
    title: 'Mulan',
    releaseDate: 1998,
    director: 'Tony Bancroft/Barry Cook',
    genre: 'family'
}]

app.get('/movies', (req, res) => {
    res.status(200).send(tenMovies)
})

app.get('/movies/:title', (req, res) => {
    let movie = tenMovies.find(() => { return tenMovies.title.toLowerCase() === req.params.title.toLowerCase() });
  
    if (movie) {
      res.status(200).send('This is where the movie object would show based on the title');
    } else {
      res.status(404).send('The (would show what the user entered) movie was not found.');
    }
  });

app.get('/:genre', (req, res) => {
    res.status(200).send('This is where all of the individual moies would show based on the entered genre');
  });

app.get('/:director', (req, res) => {
    res.status(200).send('This is where various information about a director would be displayed based on what was entered');
  });

app.post('/users', (req, res) => {
    let newUser = req.body;
  
    if (!newUser.name) {
      const message = 'Missing name in request body';
      res.status(400).send(message);
    } else {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).send('This is where information would be entered in order to add to a dabatase of different users');
    }
  });

app.put('/users/:user', (req, res) => {
    let user = users.find((user) => { return user.name === req.params.user });
  
    if (user) {
      res.status(201).send('From here the user will be allowed to update their profile');
    } else {
      res.status(404).send('The user with the name (what was entered as a parameter will be returned here) was not found.');
    }
  });

app.post('/movies/favorites', (req, res) => {
    let newFavorite = req.body;
  
    if (!newfavorite.name) {
      const message = 'Missing name in request body';
      res.status(400).send(message);
    } else {
      newFavorite.id = uuid.v4();
      users.push(newFavorite);
      res.status(201).send('This is where information would be entered in order to add to a dabatase of the users favorite movies');
    }
  });

app.get('/', (req, res) => {
    res.send('Welcome to my movie directory')
})

app.delete('/movies/favorites/:title', (req, res) => {
    let movie = tenMovies.find((movie) => { return tenMovies.id === req.params.id });
  
    if (movie) {
      tenMovies = tenMovies.filter((obj) => { return obj.id !== req.params.id });
      res.status(201).send('The movie (req.param for the title) was removed from your favorites.');
    }
  });

app.delete('/users/:user', (req, res) => {
    let movie = tenMovies.find((movie) => { return tenMovies.id === req.params.id });
  
    if (movie) {
      tenMovies = tenMovies.filter((obj) => { return obj.id !== req.params.id });
      res.status(201).send('The email for (req.param for the username) was removedsss.');
    }
  });

app.use(express.static('public'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err.stack)
    res.status(500).send('Something broke!');
  });

app.use(morgan())

// Listens for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });

 // const logs = fs.writeFileSync('log.txt', '')
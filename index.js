const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require('mongoose')
const Models = require('./model.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const Movies = Models.Movie
const Users = Models.User

mongoose.connect('mongodb://localhost:27017/myFlixDB', {userNewUrlParser: true, useUnifiedTopology: true})



let tenMovies = [{
    title: 'Kung Fu Panda 2',
    releaseDate: "2003",
    Director: {
      Name: "Jennefir Yuh Nelsion",
      Bio: "Korean-American storyboard writer and director",
      Birth: "1972",
      Death: "null"
  },
    Genre: {
      Name: "Animation",
      Description: "Films that are animated in 2d, 3d and other forms of creative style, along with various themes and settings"
    },
    Featured: false,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/b/b1/Kung_Fu_Panda_2_Poster.jpg"
}, {
    title: 'Scott Pilgrim Vs. The World',
    releaseDate: "2010",
    Director: {
      Name: "Edgar Wright",
      Bio: "English film director known for fast paced/satircal movies",
      Birth: "1974",
      Death: "null"
  },
    Genre: {
      Name: "Comedy",
      Description: "Films that focus on making the audience laugh through jokes and their ridiculous premises"
    },
    Featured: true,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/1/14/Scott_Pilgrim_vs._the_World_teaser.jpg"
}, {
    title: 'The Social Network',
    releaseDate: "2010",
    Director: {
      Name: "David Fincher",
      Bio: "American film director known for psychological thrillers/personal dramas",
      Birth: "1962",
      Death: "null"
  },
    Genre: {
      Name: "Drama",
      Description: "Films that focus on societal pressure, relationships, and daring stakes that affect characters personal lives"
    },
    Featured: false,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/8c/The_Social_Network_film_poster.png"
}, {
    title: 'A Silent Voice',
    releaseDate: "2016",
    Director: {
      Name: "Naoko Yamada",
      Bio: "Japanese animator at Kyoto Animation",
      Birth: "1984",
      Death: "null"
  },
    Genre: {
      Name: "Animation",
      Description: "Films that are animated in 2d, 3d and other forms of creative style, along with various themes and settings"
    },
    Featured: true,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/3/32/A_Silent_Voice_Film_Poster.jpg"
}, {
    title: 'Avengers Infinity War',
    releaseDate: "2018",
    Director: {
      Name: "Joe Russo",
      Bio: "1/2 of the famous Russo brothers known for their blockbuster films",
      Birth: "1971",
      Death: "null"
  },
    Genre: {
      Name: "Action",
      Description: "Films that focus on intense fights and close stakes to build up the audiences adrenaline"
    },
    Featured: true,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg"
}, {
    title: 'Captain America Civil War',
    releaseDate: "2016",
    Director: {
      Name: "Joe Russo",
      Bio: "1/2 of the famous Russo brothers known for their blockbuster films",
      Birth: "1971",
      Death: "null"
  },
    Genre: {
      Name: "Action",
      Description: "Films that focus on intense fights and close stakes to build up the audiences adrenaline"
    },
    Featured: false,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg"
}, {
    title: 'The Emperors New Groove',
    releaseDate: "2000",
    Director: {
      Name: "Mark Dindal",
      Bio: "American director famous for popular films for kids, like Chicken Little",
      Birth: "1960",
      Death: "null"
  },
    Genre: {
      Name: "Comedy",
      Description: "Films that focus on making the audience laugh through jokes and their ridiculous premises"
    },
    Featured: false,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/6/69/Grooveposter.jpg"
}, {
    title: 'Anomolisa',
    releaseDate: "2015",
    Director: {
      Name: "Charlie Kaufman",
      Bio: "American director known for his mind boggling/trippy films",
      Birth: "1958",
      Death: "null"
  },
    Genre: {
      Name: "Romance",
      Description: "Films that focus on the romantic relationship between individuals"
    },
    Featured: true,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/0/0f/Anomalisa_poster.jpg"
}, {
    title: 'Spirited Away',
    releaseDate: "2001",
    Director: {
      Name: "Hayao Miyazaki",
      Bio: "Japanese animator and cofounder of Studio Ghibli",
      Birth: "1941",
      Death: "null"
  },
    Genre: {
      Name: "Animation",
      Description: "Films that are animated in 2d, 3d and other forms of creative style, along with various themes and settings"
    },
    Featured: false,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png"
}, {
    title: 'John Wick',
    releaseDate: "2014",
    Director: {
      Name: "Chad Stahelski",
      Bio: "American director and stunt man known for his action films",
      Birth: "1968",
      Death: "null"
  },
    Genre: {
      Name: "Action",
      Description: "Films that focus on intense fights and close stakes to build up the audiences adrenaline"
    },
    Featured: false,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/4/44/John_Wick_%28franchise_logo%29.png"
}, {
    title: 'Mulan',
    releaseDate: "1998",
    Director: {
      Name: "Tony Bancroft",
      Bio: "American director known for his disney films and being the owner of Toonacious Family Entertainment",
      Birth: "1961",
      Death: "null"
  },
    Genre: {
      Name: "Animation",
      Description: "Films that are animated in 2d, 3d and other forms of creative style, along with various themes and settings"
    },
    Featured: true,
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/a/a3/Movie_poster_mulan.JPG"
}]

let users = [{
  _id: 1,
  username: "kylerules",
  email: "kylerules@gmail.com",
  password: "kylepassword",
  Birthday: new Date("1999-01-20")
}, {
  _id: 2,
  username: "jamesdaman",
  email: "jamesdaman@gmail.com",
  password: "jamespassword",
  Birthday: new Date("2001-10-01")
}, {
  _id: 3,
  username: "christinab",
  email: "christinab@gmail.com",
  password: "christinapassword",
  Birthday: new Date("2000-02-19")
}, {
  _id: 4,
  username: "alexmc",
  email: "alexmc@gmail.com",
  password: "alexpassword",
  Birthday: new Date("1990-08-02")
}, {
  _id: 5,
  username: "jlulke",
  email: "jlulke@gmail.com",
  password: "jakepassword",
  Birthday: new Date("1997-12-04")
}
]

app.get('/movies', (req, res) => {
  Movies.find().then((movies) => {
    res.status(201).json(movies)
  }).catch((err) => {
    console.error(err)
    res.status(505).send('Error: ' + err)
  })
})

app.get('/movies/:title', (req, res) => {
    Movies.findOne({'movie.title': req.params.title}).then((movies) => {
      res.json(movies)
    }).catch((err) => {
      console.error(err)
      res.status(505).send('Error: ' + err)
    })
  });

app.get('/movies/:genre', (req, res) => {
    Movies.find({'movie.Genre': req.params.genre}).then((movies) => {
      res.json(movies)
    }).catch((err) => {
      console.error(err)
      res.status(505).send('Error: ' + err)
    })
  });

app.get('/movies/:director', (req, res) => {
    Movies.find({'movie.Director': req.params.director}).then((movies) => {
      res.json(movies)
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

app.post('/users', (req, res) => {
  Users.findOne({Username: req.body.Username}).then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists')
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
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
app.get('/users', (req, res) => {
  Users.find().then((users) => {
    res.status(201).json(users)
  }).catch((err) => {
    console.error(err)
    res.status(505).send('Error: ' + err)
  })
})

// Get a user by username
app.get('/users/:Username', (req, res) => {
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
app.put('/users/:Username', (req, res) => {
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
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
app.delete('/users/:Username', (req, res) => {
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
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

app.use(express.static('public'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err.stack)
    res.status(500).send('Something broke!');
  });

app.use(morgan())

require('log-timestamp')(function() { return 'date="' + new Date().toISOString() + '" message="%s"' });

// Listens for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });

 // const logs = fs.writeFileSync('log.txt', '')
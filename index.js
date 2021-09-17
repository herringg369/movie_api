const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs')

fs.writeFileSync('log.txt', )

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
      res.status(201).send('The email for (req.param for the username) was removed.');
    }
  });

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
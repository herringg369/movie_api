const express = require('express')
const app = express()
const morgan = require('morgan')

let tenMovies = [{
    title: 'Kung Fu Panda 2',
    releaseDate: 2003,
    director: 'Jennefir Yuh Nelsion'
}, {
    title: 'Scott Pilgrim Vs. The World',
    releaseDate: 2010,
    director: 'Edgar Wright'
}, {
    title: 'The Social Network',
    releaseDate: 2010,
    director: 'David Fincher'
}, {
    title: 'A Silent Voice',
    releaseDate: 2016,
    director: 'Naoko Yamada'
}, {
    title: 'Avengers Infinity War',
    releaseDate: 2018,
    director: 'Joe Russo/Antho Russo'
}, {
    title: 'The Emperors New Groove',
    releaseDate: 2000,
    director: 'Mark Dindal'
}, {
    title: 'Anomolisa',
    releaseDate: 2015,
    director: 'Charlie Kaufman/Duke Johnson'
}, {
    title: 'Spirited Away',
    releaseDate: 2001,
    director: 'Hayao Miyazaki'
}, {
    title: 'John Wick',
    releaseDate: 2014,
    director: 'Chad Stahelski'
}, {
    title: 'Mulan',
    releaseDate: 1998,
    director: 'Tony Bancroft/Barry Cook'
}]

app.get('/movies', (req, res) => {
    res.send(tenMovies)
})

app.get('/', (req, res) => {
    res.send('Welcome to my movie directory')
})

app.use(express.static('public'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err.stack)
    res.status(500).send('Something broke!');
  });

app.use(morgan(common))

// Listens for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
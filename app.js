const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
let pokemons = require('./mock-pokemon')
const { success } = require('./helper.js')

const app = express();
const port = 5000;


app
  .use(morgan('dev'))
  .use(favicon(__dirname = './favicon.ico'))

app.get('/', (req, res) => res.send('Hello  from express'))

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokemon a été trouvé'
  res.json(success(message, pokemon))

});

app.get('/api/pokemons', (req, res) => {
  const totalPokemon = pokemons.length
  const message = `La liste des ${totalPokemon} pokemons a ete recuperée`
  res.json(success(message, pokemons))

})

app.post('/api/pokemons/post', (req, res) => {
  const id = 14
  const pokemonCreated = {
    ...req.body, ...{
      id: id,
      "name": "Pikachu",
      "type": ["électrique"],
      "hp": 50,
      createdAt: new Date()
    }
  }
  pokemons.push(pokemonCreated)
  const message = `$ Le pokemon ${pokemonCreated.name} a été crée`
  res.json(success(message, pokemonCreated))
})

app.listen(port, () => console.log(`Le serveur est lancé sur http://localhost:${port}`))


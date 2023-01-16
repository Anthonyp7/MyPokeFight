const { model, Schema} = require('mongoose');

const Pokemon = new Schema({
    username:String,
    name:String,
    pokeid: String,
    getAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('Pokemon', Pokemon, 'pokemons');

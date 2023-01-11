const { model, Schema} = require('mongoose');

const Pokemon = new Schema({
    // username:{
    //     type: Schema.Types.ObjectId, ref: 'User',
    // },
    username:String,
    name:String,
    url: String,
    getAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('Pokemon', Pokemon, 'pokemons');

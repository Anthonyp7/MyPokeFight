const Pokemon = require('../models/Pokemon');



const GetPokemon = async (req, res) => {
    try {
        const pokemonurl = req.body.url;
        const username = req.body.username;

        const newPokemon = new Pokemon();
        newPokemon.url = pokemonurl;
        newPokemon.username = username;

        await newPokemon.save();

        res.send({
            code: 201,
            message: "Pokémon Attrapé"
        });

    } 
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

module.exports = {
    GetPokemon
}



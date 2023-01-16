const Pokemon = require('../models/Pokemon');



const CreatePokemon = async (req, res) => {
    try {
        const username = req.body.username;
        const pokeid = req.body.pokeid;

        const newPokemon = new Pokemon();
        newPokemon.username = username;
        newPokemon.pokeid = pokeid;

        await newPokemon.save();


        res.send({
            code: 201,
            message: "Pokémon Attrapé"
        });

        req.username = username;

    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const GetPokemon = async (req, res) => {
    try {
        const username = req.body.username;

        Pokemon.find({ username: username })
            .then(result => {
                const pokeid = [];
                console.log(result.length)
                for (let i = 0; i < (result).length; i++) {

                    if (result && result[i] && result[i].pokeid)
                        pokeid.push(result[i].pokeid)

                    console.log(pokeid);
                }
                console.log("pokeid", pokeid);
                console.log(result.length)
                res.send({
                    code: 201,
                    username: username,
                    pokemonid: pokeid
                })



            })

    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

module.exports = {
    CreatePokemon,
    GetPokemon
}



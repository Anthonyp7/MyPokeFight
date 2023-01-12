const Pokemon = require('../models/Pokemon');



const CreatePokemon = async (req, res) => {
    try {
        const pokemonurl = req.body.url;
        const username = req.body.username;
        const pokeid = req.body.pokeid;

        const newPokemon = new Pokemon();
        newPokemon.url = pokemonurl;
        newPokemon.username = username;
        newPokemon.pokeid = pokeid;

        await newPokemon.save();
        

        res.send({
            code: 201,
            message: "Pokémon Attrapé"
        });

        req.username = username;
        req.url = pokemonurl;

    } 
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const GetPokemon = async (req, res) => {
    try {
        const username = req.body.username;
        console.log("username", username);
        
        Pokemon.find({ username: username})
        .then(result => {
            const pokemonurl = [];
            

            for (let i = 0; i <= (result).length; i ++){
                 
                pokemonurl.push(result && result[i] && result[i].url)

                console.log(pokemonurl);
            }
            res.send({
                code: 201,
                username: username,
                url: pokemonurl
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



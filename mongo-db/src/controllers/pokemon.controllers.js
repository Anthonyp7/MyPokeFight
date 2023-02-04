const Pokemon = require('../models/Pokemon');



const CreatePokemon = async (req, res) => {
    try {
        const username = req.body.username;
        const pokeid = req.body.pokeid;
        const pokehp = "";
        const pokeattack = "";
        const pokespeed = "";

        const newPokemon = new Pokemon();
        newPokemon.username = username;
        newPokemon.pokeid = pokeid;
        newPokemon.pokehp = pokehp;
        newPokemon.pokeattack = pokeattack;
        newPokemon.pokespeed = pokespeed;

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

const PatchPokemon = (req, res) => {
    try {
        const newPokeid = req.body.newpokeid;
        Pokemon.updateOne({username: req.body.username, pokeid: req.body.pokeid}, {
            pokeid: newPokeid

        })
        .then(result => {
            res.send({
                code: 201,
                pokemonid: newPokeid
            })
        })


    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}


const PatchPokeStats = async (req, res) => {
    try {
        const pokeid = req.body.pokeid;
        const username = req.body.username;
        const pokehp = req.body.pokehp;
        const pokeattack = req.body.pokeattack;
        const pokespeed = req.body.pokespeed;

        console.log("pokeid", pokeid);

        console.log("pokehp", pokehp);
        
        await Pokemon.updateOne({username: username, pokeid: pokeid}, {
            pokehp: pokehp,
            pokeattack: pokeattack,
            pokespeed: pokespeed

        })
        .then(result => {

            console.log(username);
            res.send({
                code: 201
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
    GetPokemon,
    PatchPokemon,
    PatchPokeStats
}



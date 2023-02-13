const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { FifoMatchmaker } = require('matchmaking');
const Pokemon = require('../models/Pokemon');



const CreateUser = async (req,res) =>{
    try {
        const username = req.body.username;
        const pokeavatar = req.body.pokeavatar;
        const password = req.body.password;
        const pokeid = req.body.pokeid;
        const ready = false;
        const pokecoin = 4;
        const order = [];

        const saltRounds = 3;
        const hashpassword = bcrypt.hashSync(password, saltRounds);
        

        const newUser = new User();
        newUser.username = username; 
        newUser.pokeavatar = pokeavatar; 
        newUser.password = hashpassword; 
        newUser.pokecoin = pokecoin;
        newUser.pokeid = pokeid;
        newUser.ready = ready;
        newUser.order = order;

        await newUser.save();
        
        
        res.send({
            code: 201,
            message: "Utilisateur créé"
        });
        req.username = username;
        req.pokeavatar = pokeavatar;
        req.password = password;
        req.pokecoin = pokecoin;
        req.pokeid = pokeid;
        req.ready = ready;
        req.order = order;
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const GetUser = async (req,res) =>{
    try {
        const username = req.body.username; 

        const token = jwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: '1h' });


        User.findOne({username: username})
        .then(result => {
            const pokeavatar = result.pokeavatar;
            const pokecoin = result.pokecoin;
            const pokeid = result.pokeid;
            res.send({
                code : 201,
                message: "Connection OK",
                token: token,
                username: username,
                pokeavatar: pokeavatar,
                pokecoin:pokecoin,
                pokeid: pokeid
            });
        })


        
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const PatchUser = async (req,res) =>{
    try {
        const username = req.body.username; 
        const newPokecoin = req.body.pokecoin;
        const newPokeid = req.body.pokeid;
        
        const user = await User.findOne({username : username})

        user.pokecoin = newPokecoin;
        user.pokeid.push(newPokeid);

        await user.save();
        
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const PatchUserPokemon = (req, res) => {
    try {
        const newPokeid = req.body.newpokeid;
        User.updateOne({username: req.body.username}, {
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



/////////////////////////////////////////////



// SI LE USER EST PRET POUR LE COMBAT   
const PatchUserReady = (req, res) => {
    try {
        const username = req.body.username;
        const order = req.body.pokemonfight;

        User.updateMany({username: username}, {
            ready: true,
            order: order
        })
        .then(result => {
            res.send({
                code: 201,
                // ready: ready
            })
        })

    } 
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}


const CreateFight = async (req, res) => {
    try {
        const username = req.body.username;

        // USER 1 ET USER2
        const user1 = await User.findOne({username: username})
        const user2 = await User.findOne({ready: true, username: {$ne : username}})


        function getPlayerKey(player) {
            // return player.username;
            return player;
        }


        let mm = new FifoMatchmaker(runGame, getPlayerKey, { checkInterval: 2000 });
        // let player1 = user1;
        // let player2 = user2;

        mm.push(user1);// PLAYER1
        mm.push(user2);// PLAYER2
        console.log(mm);
        



        
        // LANCEMENT FIGHT
        function runGame(players) {
            console.log("Game started with:");
            const player1 = players[1];
            const player2 = players[0];
            console.log(player1.username, player2.username);


            // LISTE POKEMON CHOISI PAR PLAYERS
            let pokePlayer1 = player1.order;
            let pokePlayer2 = player2.order;

            console.log(pokePlayer1, pokePlayer2)

            res.send({
                code: 200,
                pokeplayer1: pokePlayer1,
                pokeplayer2: pokePlayer2
            })


            // console.log("HP1", );


            // const pokeid = req.body.pokeid;

            // COMPTEUR POKEMON ID
            // let i = 0;
            // for (i; ...)

            // const pokestats1 = Pokemon.find({ username: username, pokeid: pokeid[i]})


            
        }

    } 
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

module.exports= {
    CreateUser,
    GetUser,
    PatchUser,
    PatchUserPokemon,
    PatchUserReady,
    CreateFight
}
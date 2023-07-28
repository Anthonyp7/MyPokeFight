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
        const user1 = await User.findOne({username: username});
        const user2 = await User.findOne({ready: true, username: {$ne : username}});
        const username2 = user2.username;



        // POKE STATS USER1 ET USER2
        const pokeuser1 = await Pokemon.find({username: username});
        const pokeuser2 = await Pokemon.find({username: username2});


        ////
        // IT WORK
        // for (let i = 0; i < 4; i ++){
        //     console.log("pokeuser1 attack : ", pokeuser1[i].pokeattack);
        //     console.log("pokeuser2 attack : ", pokeuser2[i].pokeattack);

        // }
        // const user1poke1speed = pokeuser1[0].pokespeed;
        //console.log("user1poke1speed : ", user1poke1speed);
        ////




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
        async function runGame(players) {
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

            //                                                             //########################### DEBUT COMBAT #############################//

            // // VERIFICATION POKEMON QUI ATTAQUE EN PREMIER
        
            // // POKE STATS USER1 ET USER2
            // const poke1user1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
            // const poke1user2 = await Pokemon.findOne({username: username2, pokeid: pokePlayer2[0]});


            // const pokeuser1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
            // const pokeuser2 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});

            // console.log("len", pokePlayer1.length);

            // //SI LA SPEED DES PREMIERS POKEMONS A SE BATTRENT EST SUPERIEUR A L'AUTRE
            // if (pokeuser1.pokespeed >= pokeuser2.pokespeed){
            //     console.log("C'est au tour du user1 de commencer");
            // }
            // else{
            //     console.log("C'est au tour du user2 de commencer");
            // }
            // //while(pokePlayer1.length > 0 || pokePlayer2.length > 0){

            // for (let k = 0; k < 3; k ++){
            //     while(pokeuser1.pokehp > 0 && pokeuser2.pokehp > 0){

            //         console.log("USER1 : Pokemon1 HP = ", pokeuser1.pokehp);
            //         console.log("USER2 : Pokemon1 ATTACK = ", pokeuser2.pokeattack);

            //         console.log("USER1 : Pokemon1 HP : ", pokeuser1.pokehp, " - ", pokeuser2.pokeattack);

            //         pokeuser1.pokehp -= pokeuser2.pokeattack;
        
            //         console.log("USER1 : Pokemon1 HP = ", pokeuser1.pokehp);
            //     }

            //     // RETRAIT DES POKEMONS VAINCUS DES LISTES
            //     if (pokeuser1.pokehp <= 0){
            //         pokePlayer1.shift();
            //     }
            //     else{
            //         pokePlayer2.shift();
            //     }
            //     console.log("K.O! Nouveau Pokemon");

            //     // NOUVELLE VARIABLES POKEMONS (DANS LA BOUCLE CETTE FOIS-CI)
            //     const newPokeuser1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
            //     const newPokeuser2 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});

            //     console.log("len", pokePlayer1.length);
            //     console.log("pokePlayer1", pokePlayer1);
            //     //console.log("Pokeuser1 next : ", pokeuser1);
            //     console.log("Pokeuser1 next : ", newPokeuser1);

            //     console.log("pokePlayer1[0]", pokePlayer1[0]);
            // }
            // //}




                                                                        //########################### DEBUT COMBAT #############################//

            // VERIFICATION POKEMON QUI ATTAQUE EN PREMIER
        
            // POKE STATS USER1 ET USER2
            const poke1user1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
            const poke1user2 = await Pokemon.findOne({username: username2, pokeid: pokePlayer2[0]});


            const pokeuser1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
            const pokeuser2 = await Pokemon.findOne({username: username2, pokeid: pokePlayer2[0]});

            let startuser = 0;//ADD
            //const startuser1 = 0;//ADD
            //const startuser2 = 0;//ADD

            console.log("len", pokePlayer1.length);

            console.log("pokeuser1", pokeuser1);
            console.log("pokeuser2", pokeuser2);

            //SI LA SPEED DES PREMIERS POKEMONS A SE BATTRENT EST SUPERIEUR A L'AUTRE
            if (Number(pokeuser1.pokespeed) >= Number(pokeuser2.pokespeed)){
                console.log("C'est au tour du user1 de commencer");
                startuser = 1;//ADD
                //startuser1 = 1;//ADD
                //startuser2 = 2;//ADD
            }
            else{
                console.log("C'est au tour du user2 de commencer");
                startuser = 2;//ADD
                //startuser2 = 1;//ADD
                //startuser1 = 2;//ADD
            }


            //while(pokePlayer1.length > 0 || pokePlayer2.length > 0){
            for (let k = 0; k < 3; k ++){
                for (let j = 0; j <= 0; j ++){
                // TANT QUES LES POKEMONS ONT DE L'HP
                    while(pokeuser1.pokehp > 0 && pokeuser2.pokehp > 0){

                        // SI STARTUSER EST PAIR C'EST AU USER2, S'IL EST IMPAIR C'EST AU USER1
                        // SI OUI, TOUR DE USER2
                        if(startuser % 2 == 0){//ADD

                            console.log("USER1 : Pokemon1 HP = ", pokeuser1.pokehp);
                            console.log("USER2 : Pokemon1 ATTACK = ", pokeuser2.pokeattack);
        
                            console.log("USER1 : Pokemon1 HP : ", pokeuser1.pokehp, " - ", pokeuser2.pokeattack);
        
                            pokeuser1.pokehp -= pokeuser2.pokeattack;
                
                            console.log("USER1 : Pokemon1 HP = ", pokeuser1.pokehp);
                            console.log("Tour suivant");// ADD

                            //startuser += 1;//ADD
                        }
                        // SINON, TOUR DE USER1
                        else{// ADD

                            console.log("USER2 : Pokemon1 HP = ", pokeuser2.pokehp);
                            console.log("USER1 : Pokemon1 ATTACK = ", pokeuser1.pokeattack);
        
                            console.log("USER2 : Pokemon1 HP : ", pokeuser2.pokehp, " - ", pokeuser1.pokeattack);
        
                            pokeuser2.pokehp -= pokeuser1.pokeattack;
                
                            console.log("USER2 : Pokemon1 HP = ", pokeuser2.pokehp);
                            console.log("Tour suivant");// ADD

                            //startuser += 1;//ADD
                        }
                        startuser += 1;//ADD
                    }
                    // RETRAIT DES POKEMONS VAINCUS DES LISTES
                    if (pokeuser1.pokehp <= 0){
                        pokePlayer1.shift();
                    }
                    else{
                        pokePlayer2.shift();
                    }
                    console.log("K.O! Nouveau Pokemon");
                }

                // NOUVELLE VARIABLES POKEMONS (DANS LA BOUCLE CETTE FOIS-CI)
                const newPokeuser1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
                const newPokeuser2 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});

                console.log("len", pokePlayer1.length);
                console.log("pokePlayer1", pokePlayer1);
                //console.log("Pokeuser1 next : ", pokeuser1);
                console.log("Pokeuser1 next : ", newPokeuser1);

                console.log("pokePlayer1[0]", pokePlayer1[0]);


                console.log("FIN, pokePlayer1, pokePlayer2", pokePlayer1, pokePlayer2);

                while(newPokeuser1.pokehp > 0 && newPokeuser2.pokehp > 0){

                    // SI STARTUSER EST PAIR C'EST AU USER2, S'IL EST IMPAIR C'EST AU USER1
                    // SI OUI, TOUR DE USER2
                    if(startuser % 2 == 0){//ADD

                        console.log("USER1.0 : Pokemon1 HP = ", newPokeuser1.pokehp);
                        console.log("USER2 : Pokemon1 ATTACK = ", newPokeuser2.pokeattack);
    
                        console.log("USER1 : Pokemon1 HP : ", newPokeuser1.pokehp, " - ", newPokeuser2.pokeattack);
    
                        newPokeuser1.pokehp -= newPokeuser2.pokeattack;
            
                        console.log("USER1 : Pokemon1 HP = ", newPokeuser1.pokehp);
                        console.log("Tour suivant");// ADD

                        //startuser += 1;//ADD
                    }
                    // SINON, TOUR DE USER1
                    else{// ADD

                        console.log("USER2.0 : Pokemon1 HP = ", newPokeuser2.pokehp);
                        console.log("USER1 : Pokemon1 ATTACK = ", newPokeuser1.pokeattack);
    
                        console.log("USER2 : Pokemon1 HP : ", newPokeuser2.pokehp, " - ", newPokeuser1.pokeattack);
    
                        newPokeuser2.pokehp -= newPokeuser1.pokeattack;
            
                        console.log("USER2 : Pokemon1 HP = ", newPokeuser2.pokehp);
                        console.log("Tour suivant");// ADD

                        //startuser += 1;//ADD
                    }
                    startuser += 1;//ADD
                }
                // RETRAIT DES POKEMONS VAINCUS DES LISTES
                if (newPokeuser1.pokehp <= 0){
                    pokePlayer1.shift();
                }
                else{
                    pokePlayer2.shift();
                }
                console.log("K.O2! Nouveau Pokemon");
            }
            console.log("FIN 2, pokePlayer1, pokePlayer2", pokePlayer1, pokePlayer2);
            //}

































            // //while(pokePlayer1 > 0 || pokePlayer2 > 0){

            //     while(poke1user1.pokehp > 0 && poke1user2.pokehp > 0){// CHECK

            //         //SI LA SPEED DES PREMIERS POKEMONS A SE BATTRENT EST SUPERIEUR A L'AUTRE
            //         if (poke1user1.pokespeed >= poke1user2.pokespeed){
            //             console.log("C'est au tour du user1 de commencer");
            //         }
            //         else{
            //             console.log("C'est au tour du user2 de commencer");
        
        
            //             console.log("hp pokeuser1 pre", poke1user1.pokehp);
            //             poke1user1.pokehp -= poke1user2.pokeattack;
        
            //             console.log("hp pokeuser1 post", poke1user1.pokehp);
            //         }
            //     }
            // //}

            
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
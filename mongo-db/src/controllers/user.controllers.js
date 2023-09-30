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

            

                                                                        //########################### DEBUT COMBAT #############################//

            
            

            // PREMIERS POKEMONS DES 2 USERS UNIQUEMENT
            const pokeuser1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
            const pokeuser2 = await Pokemon.findOne({username: username2, pokeid: pokePlayer2[0]});

            //COMPTEUR TOUR (POUR SAVOIR QUI COMMENCE)
            let startuser = 0;

            //COMPTEUR BOUCLE DEBUT
            let j = 0;
            let l = 0;

            


            while(pokePlayer1.length > 0 && pokePlayer2.length > 0){

                while(j < 1){
                    
                    // TANT QUES LES POKEMONS ONT DE L'HP - TOUR COMBAT
                    while(pokeuser1.pokehp > 0 && pokeuser2.pokehp > 0){

                        // BOUCLE POUR L'EFFECTUER QU'AU DEBUT
                        if(startuser == 0){

                            //SI LA SPEED DES PREMIERS POKEMONS A SE BATTRENT EST SUPERIEUR A L'AUTRE
                            if (Number(pokeuser1.pokespeed) >= Number(pokeuser2.pokespeed)){
                                console.log("C'est au tour du user1 de commencer");
                                startuser = 1;
                            }
                            else{
                                console.log("C'est au tour du user2 de commencer");
                                startuser = 2;
                            }
                        }

                        else{
                            // SI STARTUSER EST PAIR C'EST AU USER2, S'IL EST IMPAIR C'EST AU USER1

                            // SI OUI, TOUR DE USER2
                            if(startuser % 2 == 0){
                                console.log("USER1 : Pokemon1 HP = ", pokeuser1.pokehp);
                                console.log("USER2 : Pokemon1 ATTACK = ", pokeuser2.pokeattack);
            
                                console.log("USER1 : Pokemon1 HP : ", pokeuser1.pokehp, " - ", pokeuser2.pokeattack);
            
                                pokeuser1.pokehp -= pokeuser2.pokeattack;
                    
                                console.log("USER1 : Pokemon1 HP = ", pokeuser1.pokehp);
                            }

                            // SINON, TOUR DE USER1
                            else{
                                console.log("USER2 : Pokemon1 HP = ", pokeuser2.pokehp);
                                console.log("USER1 : Pokemon1 ATTACK = ", pokeuser1.pokeattack);
            
                                console.log("USER2 : Pokemon1 HP : ", pokeuser2.pokehp, " - ", pokeuser1.pokeattack);
            
                                pokeuser2.pokehp -= pokeuser1.pokeattack;
                    
                                console.log("USER2 : Pokemon1 HP = ", pokeuser2.pokehp);
                            }

                            console.log("Tour suivant");
                            startuser += 1;
                        }
                    }
                    // FIN DU TOUR


                    // RETRAIT DES POKEMONS VAINCUS DES LISTES
                    if (pokeuser1.pokehp <= 0){
                        pokePlayer1.shift();
                    }
                    else{
                        pokePlayer2.shift();
                    }
                    console.log("K.O! Nouveau Pokemon");
                    j += 1;
                }

                // RESET DU COMPTEUR 
                startuser = 0;



////////////////////////////// 2IEME COMBAT ET + (TOUT SAUF LE PREMIER)



                // NOUVELLE VARIABLES POKEMONS (DANS LA BOUCLE CETTE FOIS-CI)
                const newPokeuser1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
                const newPokeuser2 = await Pokemon.findOne({username: username2, pokeid: pokePlayer2[0]});

                // var is_alive1 = true;// 
                // var is_alive2 = true;// 

                

                while(l < 1){
                    console.log("On recommence", l);
                    var is_alive1 = true;// 
                    var is_alive2 = true;// 
                    var newPokeuser1hp = parseInt(newPokeuser1.pokehp);
                    var newPokeuser2hp = parseInt(newPokeuser2.pokehp);
                    l += 1;
                }

                //while(newPokeuser1.pokehp > 0)

                if (is_alive1 == false){
                    var newPokeuser1hp = parseInt(newPokeuser1.pokehp);
                    console.log("Is_alive1 false");
                }
                if (is_alive2 == false){
                    var newPokeuser2hp = parseInt(newPokeuser2.pokehp);
                    console.log("Is_alive2 false");
                }
                
                // var newPokeuser1at = parseInt(newPokeuser1.pokeattack);
                // var newPokeuser2at = parseInt(newPokeuser2.pokeattack);




                console.log("FIN", pokePlayer1, pokePlayer2);

                while(newPokeuser1.pokehp > 0 && newPokeuser2.pokehp > 0){
                    if(startuser == 0){

                        //SI LA SPEED DES PREMIERS POKEMONS A SE BATTRENT EST SUPERIEUR A L'AUTRE
                        if (Number(newPokeuser1.pokespeed) >= Number(newPokeuser2.pokespeed)){
                            console.log("C'est au tour du user1 de commencer 1.0");
                            startuser = 1;
                        }
                        else{
                            console.log("C'est au tour du user2 de commencer 2.0");
                            startuser = 2;
                        }
                    }

                    else{
                        // SI STARTUSER EST PAIR C'EST AU USER2, S'IL EST IMPAIR C'EST AU USER1

                        // SI OUI, TOUR DE USER2
                        if(startuser % 2 == 0){
                            console.log("USER1.0 : Pokemon1 HP = ", newPokeuser1hp);
                            console.log("USER2 : Pokemon1 ATTACK = ", newPokeuser2.pokeattack);
        
                            console.log("USER1 : Pokemon1 HP : ", newPokeuser1hp, " - ", newPokeuser2.pokeattack);
        
                            //newPokeuser1hp -= newPokeuser2at;
                            newPokeuser1.pokehp -= newPokeuser2.pokeattack;

                            if(newPokeuser1.pokehp > 0){
                                newPokeuser1hp =  newPokeuser1.pokehp;
                                console.log("USER1 : Pokemon1 HP = ", newPokeuser1hp);
                                is_alive1 = true;
                            }
                            else{
                                is_alive1 = false;

                            }

                            console.log("USER1 : Pokemon1 HP = ", newPokeuser1.pokehp);
                        }

                        // SINON, TOUR DE USER1
                        else{
                            console.log("USER2.0 : Pokemon1 HP = ", newPokeuser2hp);
                            console.log("USER1 : Pokemon1 ATTACK = ", newPokeuser1.pokeattack);
        
                            console.log("USER2 : Pokemon1 HP : ", newPokeuser2hp, " - ", newPokeuser1.pokeattack);
        
                            newPokeuser2.pokehp -= newPokeuser1.pokeattack;

                            if(newPokeuser2.pokehp > 0){
                                newPokeuser2hp =  newPokeuser2.pokehp;
                                console.log("changement new poke2 hp");
                                console.log("USER2 : Pokemon1 HP = ", newPokeuser2hp);
                                is_alive2 = true;
                            }
                            else{
                                is_alive2 = false;

                            }
                
                            console.log("USER2 : Pokemon1 HP = ", newPokeuser2.pokehp);
                        }
                        
                        console.log("Tour suivant");
                        startuser += 1;
                    }
                    //newPokeuser1hp =  newPokeuser1.pokehp;
                    

                    console.log("new poke 1 hp", newPokeuser1hp);
                    console.log("new poke 2 hp", newPokeuser2hp);
                }
                // FIN DU TOUR

                // RETRAIT DES POKEMONS VAINCUS DES LISTES
                // if (newPokeuser1.pokehp <= 0){
                //     pokePlayer1.shift();
                // }
                // else if(newPokeuser1.pokehp > 0){
                    
                // }


                // else if(newPokeuser2.pokehp <= 0){
                //     pokePlayer2.shift();
                // }
                // else{

                // }

                if (newPokeuser1.pokehp <= 0){
                    pokePlayer1.shift();
                }
                else{
                    pokePlayer2.shift();
                }

                console.log("K.O 2.0! Nouveau Pokemon");
            }
            console.log("FIN 2, pokePlayer1, pokePlayer2", pokePlayer1, pokePlayer2);

































        //     // NOUVELLE VARIABLES POKEMONS (DANS LA BOUCLE CETTE FOIS-CI)
        //     const newPokeuser1 = await Pokemon.findOne({username: username, pokeid: pokePlayer1[0]});
        //     const newPokeuser2 = await Pokemon.findOne({username: username2, pokeid: pokePlayer2[0]});

        //     var is_alive1 = true;// 
        //     var is_alive2 = true;// 

            

        //     while(l < 1){
        //         console.log("On recommence", l);
        //         var newPokeuser1hp = parseInt(newPokeuser1.pokehp);
        //         var newPokeuser2hp = parseInt(newPokeuser2.pokehp);
        //         l += 1;
        //     }

        //     //while(newPokeuser1.pokehp > 0)

        //     if (is_alive1 == false){
        //         var newPokeuser1hp = parseInt(newPokeuser1.pokehp);
        //         echo("Is_alive1 false");
        //     }
        //     if (is_alive2 == false){
        //         var newPokeuser2hp = parseInt(newPokeuser2.pokehp);
        //         echo("Is_alive2 false");
        //     }
            
        //     var newPokeuser1at = parseInt(newPokeuser1.pokeattack);
        //     var newPokeuser2at = parseInt(newPokeuser2.pokeattack);




        //     console.log("FIN", pokePlayer1, pokePlayer2);

        //     while(newPokeuser1.pokehp > 0 && newPokeuser2.pokehp > 0){
        //         if(startuser == 0){

        //             //SI LA SPEED DES PREMIERS POKEMONS A SE BATTRENT EST SUPERIEUR A L'AUTRE
        //             if (Number(newPokeuser1.pokespeed) >= Number(newPokeuser2.pokespeed)){
        //                 console.log("C'est au tour du user1 de commencer 1.0");
        //                 startuser = 1;
        //             }
        //             else{
        //                 console.log("C'est au tour du user2 de commencer 2.0");
        //                 startuser = 2;
        //             }
        //         }

        //         else{
        //             // SI STARTUSER EST PAIR C'EST AU USER2, S'IL EST IMPAIR C'EST AU USER1

        //             // SI OUI, TOUR DE USER2
        //             if(startuser % 2 == 0){
        //                 console.log("USER1.0 : Pokemon1 HP = ", newPokeuser1hp);
        //                 console.log("USER2 : Pokemon1 ATTACK = ", newPokeuser2.pokeattack);
    
        //                 console.log("USER1 : Pokemon1 HP : ", newPokeuser1hp, " - ", newPokeuser2.pokeattack);
    
        //                 //newPokeuser1hp -= newPokeuser2at;
        //                 newPokeuser1.pokehp -= newPokeuser2.pokeattack;

        //                 if(newPokeuser1.pokehp > 0){
        //                     newPokeuser1hp =  newPokeuser1.pokehp;
        //                     console.log("USER1 : Pokemon1 HP = ", newPokeuser1hp);
        //                 }
        //                 else{
        //                     is_alive1 = false;

        //                 }

        //                 console.log("USER1 : Pokemon1 HP = ", newPokeuser1.pokehp);
        //             }

        //             // SINON, TOUR DE USER1
        //             else{
        //                 console.log("USER2.0 : Pokemon1 HP = ", newPokeuser2hp);
        //                 console.log("USER1 : Pokemon1 ATTACK = ", newPokeuser1.pokeattack);
    
        //                 console.log("USER2 : Pokemon1 HP : ", newPokeuser2hp, " - ", newPokeuser1.pokeattack);
    
        //                 newPokeuser2.pokehp -= newPokeuser1.pokeattack;

        //                 if(newPokeuser2.pokehp > 0){
        //                     newPokeuser2hp =  newPokeuser2.pokehp;
        //                     console.log("changement new poke2 hp");
        //                     console.log("USER2 : Pokemon1 HP = ", newPokeuser2hp);
        //                 }
        //                 else{
        //                     is_alive2 = false;

        //                 }
            
        //                 console.log("USER2 : Pokemon1 HP = ", newPokeuser2.pokehp);
        //             }
                    
        //             console.log("Tour suivant");
        //             startuser += 1;
        //         }
        //         //newPokeuser1hp =  newPokeuser1.pokehp;
                

        //         console.log("new poke 1 hp", newPokeuser1hp);
        //         console.log("new poke 2 hp", newPokeuser2hp);
        //     }
        //     // FIN DU TOUR

        //     // RETRAIT DES POKEMONS VAINCUS DES LISTES
        //     if (newPokeuser1.pokehp <= 0){
        //         pokePlayer1.shift();
        //     }
        //     else{
        //         pokePlayer2.shift();
        //     }
        //     console.log("K.O 2.0! Nouveau Pokemon");
        // }
        // console.log("FIN 2, pokePlayer1, pokePlayer2", pokePlayer1, pokePlayer2);

            
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
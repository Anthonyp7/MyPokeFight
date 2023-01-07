const User = require('../models/User');

const CreateUser = async (req,res) =>{
    try {
        const username = req.body.username;
        const pokeavatar = req.body.pokeavatar;
        const password = req.body.password;

        const newUser = new User();
        newUser.username = username; 
        newUser.pokeavatar = pokeavatar; 
        newUser.password = password; 


        await newUser.save();
        
        res.status(201).send("Utilisateur créé");
        req.username = username;
        req.pokeavatar = pokeavatar;
        req.password = password;
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const GetUser = async (req,res) =>{
    try {
        console.log("a", req.body.username);
        

        
        User.findOne({username : req.body.username})
        .then(res => {
            console.log("test", res);
        })

        res.status(200).send("User found");

        // User.findOne({username : req.body.username})
        // .then(res => {
        //     console.log("test", res);
        //     if(res.password === req.body.password){
        //         res.status(200).send("User found");
        //         console.log("Found!");
        //     }
        // })
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

module.exports= {
    CreateUser,
    GetUser
}
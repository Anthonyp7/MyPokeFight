const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const CreateUser = async (req,res) =>{
    try {
        const username = req.body.username;
        const pokeavatar = req.body.pokeavatar;
        const password = req.body.password;
        const pokecoin = 4;

        const saltRounds = 3;
        const hashpassword = bcrypt.hashSync(password, saltRounds);
        // Store hash in your password DB.

        // bcrypt.hash(password, saltRounds, function(err, hash) {
        //     // Store hash in your password DB.
        // });

        const newUser = new User();
        newUser.username = username; 
        newUser.pokeavatar = pokeavatar; 
        newUser.password = hashpassword; 
        newUser.pokecoin = pokecoin;

        // bcrypt.compareSync(password, hashpassword);

        await newUser.save();
        
        
        res.send({
            code: 201,
            message: "Utilisateur créé"
        });
        req.username = username;
        req.pokeavatar = pokeavatar;
        req.password = password;
        req.pokecoin = pokecoin;
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
            res.send({
                code : 201,
                message: "Connection OK",
                token: token,
                username: username,
                pokeavatar: pokeavatar,
                pokecoin:pokecoin
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
        
        const user = await User.findOne({username : username})

        user.pokecoin = newPokecoin;

        await user.save();
        
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

module.exports= {
    CreateUser,
    GetUser,
    PatchUser
}
const User = require('../models/User');

const CreateUser = async (req,res) =>{
    try {
        const username = req.body.username;

        const newUser = new User();
        newUser.username = username; 


        await newUser.save();
        
        res.status(201).send("Utilisateur créé");
        req.username = username;
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

module.exports= {
    CreateUser
}
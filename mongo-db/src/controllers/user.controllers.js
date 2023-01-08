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
        
        
        res.send({
            code: 201,
            message: "Utilisateur créé"
        });
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
        // console.log("username", req.body.username);

        User.findOne({username : req.body.username})
        .then(result => {
            // console.log("test", res);

            if(result.password === req.body.password){
                console.log("password : ", req.body.password);
                res.send({
                    code : 200,
                    message: "Connection OK"
                });
                console.log("Found!");
            }

            else {
                res.send({
                    code: 404, 
                    message: "Error Connection"
                })
                console.log("Not Found!");
            }
        })
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
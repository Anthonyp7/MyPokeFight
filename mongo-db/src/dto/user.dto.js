const User = require('../models/User');

const dtoCreateUser = (req,res,next) => {
    try {
        const username = req.body.username;  //USERNAME
        const password = req.body.password;  //PASSWORD


        if (!username || !password) {
            res.status(400).send("Name or Username Missing");
            return;
        }
        
        next();
    } catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log("error", error);
    }
};

module.exports= {
    dtoCreateUser
}
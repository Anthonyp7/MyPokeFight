const User = require('../models/User');

const dtoCreateUser = (req,res,next) => {
    try {
        const user = req.body.user;  //NOM
        const username = req.body.username;  //USERNAME

        console.log(user, username); //AFFICHER NOM + USERNAME

        if (!user || !username) {
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
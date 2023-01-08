const User = require('../models/User');

const dtoCreateUser = (req,res,next) => {
    try {
        const username = req.body.username;  //USERNAME
        const password = req.body.password;  //PASSWORD

        console.log("username", username, "req.body.username", req.body.username, "res.username", res.username);
        console.log("test", User.findOne({username : req.body.username}))


        if (!username || !password) {
            res.send({
                code: 400,
                message: "Name or Username Missing"
            });
            return;
        }
        if (User.findOne({username : req.body.username})) {
            res.send({
                code: 401,
                message: "Username already chosen"
            });
            return;
        }
        // User.find
        next();
    } catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log("error", error);
    }
};

module.exports= {
    dtoCreateUser
}
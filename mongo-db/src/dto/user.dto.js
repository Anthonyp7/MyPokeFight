const User = require('../models/User');

const dtoCreateUser = async (req,res,next) => {
    try {
        const username = req.body.username;  //USERNAME
        const password = req.body.password;  //PASSWORD

        const userExist = await User.findOne({ username: username });

        if (userExist) {
            res.send({
                    code : 401,
                    message: "Username already chosen"
                });
            return;
          }

        if (!username || !password) {
            res.send({
                code: 400,
                message: "Name or Username Missing"
            });
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
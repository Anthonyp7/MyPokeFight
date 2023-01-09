const User = require('../models/User');

const dtoCreateUser = async (req,res,next) => {
    try {
        const username = req.body.username;  //USERNAME
        const password = req.body.password;  //PASSWORD

        const userExist = await User.findOne({ username: username });

        

        if (!username || !password) {
            res.send({
                code: 400,
                message: "Name or Username Missing"
            });
            return;
        }

        if (userExist) {
            res.send({
                    code : 401,
                    message: "Username already chosen"
                });
            return;
        }
        
        next();


    } catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log("error", error);
    }
};

const dtoGetUser = async (req, res, next) => {
    try {
        const username = req.body.username;  //USERNAME
        const password = req.body.password;  //PASSWORD

        const user = await User.findOne({ username: username });

        User.findOne({username : username})
        .then(result => {
            // console.log("test", res);

            // if(result.password === req.body.password){
            //     console.log("password : ", req.body.password);
            //     res.send({
            //         code : 200,
            //         message: "Connection OK"
            //     });
            //     console.log("Found!");
            //     return;
            // }
            if (!user || result.password !== password) {
                res.send({
                    code: 401, 
                    message: " Username or Password is Incorrect"
                })
                return;
            }

            // if(result.password !== password) {
            //     res.send({
            //         code: 404, 
            //         message: "Error Connection"
            //     })
                
            // }
            else{
                next();
            }
        })
        
        


    } catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log("error", error);
    }
}

module.exports= {
    dtoCreateUser,
    dtoGetUser
}
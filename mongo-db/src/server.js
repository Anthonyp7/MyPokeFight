const express = require('express');
const app = express();
const cors = require('cors');
require('./database');
const controllers = require('./controllers/user.controllers');
const dto = require('./dto/user.dto');
app.use(express.json());
app.use(cors());


// USER
app.post(
    '/login',
    dto.dtoCreateUser,
    controllers.CreateUser
    
);

app.post(
    '/signin',
    dto.dtoGetUser,
    controllers.GetUser
);



app.listen(3080, () => {
    console.log('Server running');
});

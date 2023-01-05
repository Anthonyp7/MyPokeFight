const express = require('express');
const app = express();
require('./database');
const controllers = require('./controllers/user.controllers');
const dto = require('./dto/user.dto');
app.use(express.json());

// USER
app.post(
    '/login',
    controllers.CreateUser, 
    dto.dtoCreateUser
);

app.listen(3080, () => {
    console.log('Server running');
});

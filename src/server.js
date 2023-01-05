const express = require('express');
const app = express();
require('./database');
app.use(express.json());



app.listen(3060, () => {
    console.log('Server running');
});

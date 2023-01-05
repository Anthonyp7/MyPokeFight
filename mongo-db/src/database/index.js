const mongoose = require('mongoose');
const { connect, set } = mongoose;


mongoose.connection.on('connected', () =>{
    console.log('Mongo Connection Established');
});

mongoose.connection.on('reconnected', () => {
    console.log('Connection Mongo Reestablished');
});

mongoose.connection.on('disconnected', () => {
    console.log('Connection Mongo Reestablished');
});

mongoose.connection.on('close', () => {
    console.log('Connection Closed');
});

mongoose.connection.on('error', (error) => {
    console.log('DB ERROR');
});

set('debug', true);
connect(
    'mongodb+srv://aperozeni:introuvable@cluster0.iaeqygc.mongodb.net/PokeAPI?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true}
);
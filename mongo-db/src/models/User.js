const { model, Schema} = require('mongoose');

const User = new Schema({
    username:String,
    password:String,
    pokeavatar:String,
    pokecoin:String,
    pokeid:[String],
    ready:Boolean,
    order:[String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('User', User, 'users');


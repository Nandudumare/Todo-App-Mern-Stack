const { Schema, model } = require('mongoose');
const validator = require('validator');

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
    },
    password: { type: String}
})

const User = new model("user", UserSchema)


module.exports = User
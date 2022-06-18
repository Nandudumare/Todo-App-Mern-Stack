
const mongoose = require("mongoose");


const connection = mongoose.connect("mongodb+srv://nandu:nandu@cluster0.0muxdo4.mongodb.net/MineApp?retryWrites=true&w=majority")

module.exports = connection;
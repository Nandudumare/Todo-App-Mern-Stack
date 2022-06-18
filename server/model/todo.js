const { Schema, model } = require("mongoose");


const TodoSchema = new Schema({
    userId :String | Number,
    id: Number,
    task: String,
    status:Boolean,
})


const Todo = new model("todo", TodoSchema)


module.exports = Todo
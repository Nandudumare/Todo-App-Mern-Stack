// 62ac64475c9b8d5b04840819

const { Router } = require("express");
const Todo = require('../model/todo')


const todo = Router();


todo.get("/:apiKey", async(req, res) => {
    const { apiKey } = req.params;
    try{
        const Todos = await Todo.find({ userId: apiKey });
        if (Todos) {
            return res.send(Todos)
        }
        return res.status(401).send("Invalid ApiKey")
    } catch (err) {
        return res.status(500).send("Something went wrong");
    }
})

todo.post("/:apikey", async (req, res) => {
    const { apikey } = req.params;
    // console.log(req.params)
    // console.log(req.body)
    try {
        const newTodo = new Todo({ userId: apikey, ...req.body });
        newTodo.save();
        return res.send(newTodo)
    } catch (err) {
        console.log(err)
        return res.status(500).send("Something went wrong");
    }
})


todo.patch("/:apiKey/:id", async (req, res) => {
    const { apiKey, id } = req.params;
    // console.log(req.params)
    try {
        const updatedTodo = await Todo.updateOne({ id: Number(id), useId: apiKey }, { $set: { ...req.body } });
        return res.send(req.body)
    } catch (err) {
        return res.status(500).send("Something went wrong");
    }
})

todo.delete("/:apiKey/:id", async (req, res) => {
    const {
        apiKey,id
    } = req.params;
    try {
        const del = await Todo.deleteOne({
            id: Number(id),userId:apiKey
        })
        if (del.deletedCount === 0) {
           return res.json("Invalid id")
        } else {
           return res.json({})
        }
    } catch (err) {
        return res.status(500).send("Something went wrong");
    }
})

module.exports =todo
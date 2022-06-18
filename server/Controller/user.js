const { Router } = require('express');
const User = require('../model/user')

const user = Router();


user.get("/", (req, res) => {
    res.send("user")
})

user.post("/signup", async (req, res) => {
    try {
        let newUser = new User({ ...req.body })
        // console.log('newUser:', newUser)
        newUser.save()
        return res.send({ apiKey: newUser._id, ...req.body });
    } catch (err) {
        return res.status(500).send("Something went wrong");
    }
})


user.post("/login", async (req, res) => {
    try {
        let oldUser = await User.findOne({ ...req.body });
        return res.send({apiKey:oldUser._id,status:"login Success"})
    } catch (err) {
        return res.status(500).send("Invalid Crediential");
    }
})


module.exports = user
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model")

const userRoute = express.Router();
const { tracker } = require("../middlewares/tracker")

userRoute.post("/register", tracker, async (req, res) => {

    let user = await UserModel.findOne({ email: req.body.email })
    if (user) {

        return res.status(404).send({ "error": "user already exists!!" })

    }
    const { name, email, password, city, age } = req.body;

    bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
            return res.status(404).send({ "error": err.message })
        }
        user = await UserModel({ name, email, password: hash, city, age })
        await user.save();
        return res.status(200).send({ "massage": "User has been registerd" })
    })

})


//  login 

userRoute.post("/login", tracker, async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
        return res.status(404).send({ "error": "Wrong credentials" })

    }

    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
            return res.status(404).send({ "error": err.message })
        }
        let token = jwt.sign({ user: user.name, userID: user._id }, "secret")
        return res.status(200).send({ "massage": "login Successfully", "token": token })
    })

})




module.exports = { userRoute }
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(404).send({ "error": "Invailed token" })
    }
    tokenValue = token.replace("Bearer ", "")
    jwt.verify(tokenValue, "secret", async (err, decoded) => {
        if (err) {
            return res.status(404).send({ "error": err.message })
        }
        req.body.userID = decoded.userID;
        req.body.user = decoded.user
        next()
    })

}

module.exports = { auth }
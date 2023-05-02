const express = require("express");
const fs = require('fs')
const tracker = async (req, res, next) => {
    fs.appendFileSync("./logs.txt", `Method: ${req.method}, URl: ${req.originalUrl}, IP Address: ${req.ip}, Timestamp: ${new Date().getTime()}.\n`)
    next()

}

module.exports = { tracker }

const mongoose = require("mongoose")
require("dotenv").config()
const mongoURl = process.env.mongoURl

const connection = mongoose.connect(mongoURl)

module.exports = { connection }
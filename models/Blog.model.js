const mongoose = require("mongoose")
const blogSchema = mongoose.Schema({
    title: { type: String, require: true },
    body: { type: String, require: true },
    category: { type: String, require: true },
    live: { type: Boolean, require: true },

    user: { type: String, require: true },
    userID: { type: String, require: true },

}, {
    versionKey: false
})


const BlogModel = mongoose.model("blog", blogSchema)

module.exports = BlogModel

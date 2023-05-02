const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BlogModel = require("../models/Blog.model")
const fs = require('fs')


const blogRoute = express.Router();

const { auth } = require("../middlewares/auth")
const { tracker } = require("../middlewares/tracker")

/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: All the Api Related to blogs 
 */

/**
 * /articles
 *  get:
 *      summray; This will give the details of all articles from databse
 *      tags: [Blogs]
 *      responses:
 *          200:
 *              description: Returns a list of all articles
 *          400:
 *              description: Incorrect Details
 */


//  get blog 

blogRoute.get("/", auth, tracker, async (req, res) => {
    let title = req.query.title
    if (title) {
        article = await BlogModel.find({ title: { $regex: title, $options: "i" } })
        return res.status(200).send(article)
    }
    const userID = req.body.userID
    article = await BlogModel.find({ userID: userID })
    res.status(200).send(article)
})

//   get by id -->  /articles/:id:
blogRoute.get("/:id", auth, tracker, async (req, res) => {
    const id = req.params.id
    article = await BlogModel.find({ _id: id })
    res.status(200).send(article)
})


//  add blog
blogRoute.post("/add", auth, tracker, async (req, res) => {
    console.log(req.body)
    blog = await BlogModel(req.body)
    await blog.save();

    return res.status(200).send({ "message": "One blog has been saved" })
})

//  editing by a perticular id   /articles/edit/:id: 
blogRoute.patch("/edit/:id", auth, tracker, async (req, res) => {

    const id = req.params.id
    article = await BlogModel.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).send({ "message": "One blog has been updated" })

})


//  editing by a perticular id   /articles/edit/:id: 
blogRoute.delete("/rem/:id", auth, tracker, async (req, res) => {

    const id = req.params.id
    article = await BlogModel.findByIdAndDelete({ _id: id });
    return res.status(200).send({ "message": "One blog has been deleted" })

})



//  
module.exports = { blogRoute }

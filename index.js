const express = require("express");
const PORT = 8080;
const app = express();
app.use(express.json());

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./routes*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(openapiSpecification))





const { rateLimiter } = require("./middlewares/ratelimiter")

app.use(rateLimiter)



const { userRoute } = require("./routes/user.route")
const { blogRoute } = require("./routes/blog.route")



app.use("/user", userRoute)
app.use("/articles", blogRoute)



app.get("/", (req, res) => {
    res.send("homepage")
})



const { connection } = require("./db")
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Server listening at ", PORT)
    } catch (error) {
        // console.log(error)
    }
})
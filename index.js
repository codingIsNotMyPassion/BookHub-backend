// starting an app
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

//Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }))
app.use(cookieParser())

//CORS Policy
const cors = require("cors")
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

// configure .env
require("dotenv").config()
const port = process.env.PORT || 5000

//Create server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

// connecting to database
const connectDB = require("./database/db")
connectDB()

//simple route
app.get("/", (req,res)=>{
    res.send("welcome to the server")
})

// CRUD routes
app.use("/api/books", require("./routes/bookRoutes"))
app.use("/api", require("./routes/userRoutes"))
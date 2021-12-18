//Import all dependencies & middleware here
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const errorHandler = require("errorhandler");
require("dotenv").config();

//Configure isProduction variable
//const isProduction = process.env.NODE_ENV === "production";

//Init an Express App.
const app = express();

app.use(cors());

//Connection to the database
const connectDB = require(`./config/db`)

connectDB();

const PORT = process.env.PORT || 6000;

//Use your dependencies here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuration additional

//Initialize passport middleware
app.use(passport.initialize());
//require("./middlewares/auth/jwt")(passport);

//To enable incoming request logging in dev mode
app.use(morgan("dev"));

//Api endpoint
//require("./routes/index")(app);

//Define the endpoint
app.get("/ping", (req, res) => {
    return res.status(200).json({
        status: "Server is up and running",
    });
});

//Handle 404 error
app.use((req, res, next) => {
    res.status(404).json({ message: "API Endpoint not found." });
});

//Start server here
app.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
});
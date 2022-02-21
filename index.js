/*  ===============================
    Import all dependencies & middleware here
    =============================== 
*/
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
const multer = require("multer");
const applyMulter = require("./middlewares/multer")
const path = require("path")
const connectDB = require(`./config/db`);
const { createServer } = require("http");

require("dotenv").config();

/*  ===============================
    Configure isProduction variable
    const isProduction = process.env.NODE_ENV === "production";
    =============================== 
*/

//Init an Express App.
const app = express();

app.use(cors());

//Connection to the database
connectDB();

//Initialize the port
const PORT = process.env.PORT || 4000;


/* 
    ========================
        Apply middlewares
    ========================
*/ 

//Initialize body parser
app.use(express.urlencoded({ extended: false }));
//Initialize JSON
app.use(express.json());
//Initialize multer
app.use(applyMulter.init(multer).single("image"))

// Pass the global passport object into the configuration function
require("./middlewares/auth/jwt")(passport); 

//Initialize passport 
app.use(passport.initialize());


//Serving Images folder as static
app.use('/images', express.static(path.join(__dirname, 'images')));


/*  ===============================
    Additional Configuration
    To enable incoming request logging in dev mode
    =============================== 
*/


app.use(morgan("dev"));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Pass to next layer of middleware
    next();
});

//Api endpoint
require("./routes/index")(app);

//Define the endpoint
app.get("/ping", (req, res) => {
    return res.status(200).json({
        status: "Server is up and running",
    });
});

//Handle 404 error
app.use((req, res, next) => {
    res.status(404).json({ msg: "API Endpoint not found." });
});

//Create the server
const httpServer = createServer(app);

// Initialized socket io in the backend
const io = require("./socket.io").init(httpServer);

//Initialized connection
io.on("connection", socket => { 
    console.log("Client connected " + socket.id)
})

//Start server here
httpServer.listen(PORT, 
    console.log("Server start successfully")
)
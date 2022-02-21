const auth = require("../api/auth/route");
const category = require("../api/category/route")
const post = require("../api/post/route")
const comment = require("../api/comment/route")
const like = require("../api/like/route")
const user = require("../api/user/route")

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send({
        message: "Welcome to #YourVoiceMatters API.",
        });
    });
    app.use("/api/auth", auth);
    app.use("/api/category", category);
    app.use("/api/article", post);
    app.use("/api/comment", comment);
    app.use("/api/like", like);
    app.use("/api/user", user);
};
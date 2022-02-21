const express = require("express");
const authenticate = require("../../middlewares/auth/authenticate")
const decodeduser = require("../../middlewares/auth/decoded-user")
const like = require("./controller");
const likeMiddleware = require("../../middlewares/like/index");

const router = express.Router();

router.get("/like", (req, res) => {
    return res.status(200).json({
        message:
            "You are in the Post Endpoint.",
    });
});

router.post(
    "/",
    authenticate,
    likeMiddleware,
    like.like
)


router.get(
    "/",
    decodeduser,
    likeMiddleware,
    like.isLiked
)

module.exports =  router; 

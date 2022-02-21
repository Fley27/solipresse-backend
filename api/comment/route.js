const express = require("express");
const {check} = require("express-validator")
const validate = require("../../middlewares/validation/index");
const authenticate = require("../../middlewares/auth/authenticate")
const comment = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).json({
        message:
            "You are in the Comment Endpoint.",
    });
});

router.post(
    "/add",
    authenticate,
    [
        check("content")
            .not()
            .isEmpty()
            .withMessage("Make sure the comment - field is not empty."),
    ],
    validate,
    comment.add
)

router.get(
    "/fetch/:post",
    comment.fetch
)

router.post(
    "/reply",
    authenticate,
    [
        check("content")
            .not()
            .isEmpty()
            .withMessage("Make sure the comment - field is not empty."),
    ],
    validate,
    comment.reply
)



module.exports =  router; 
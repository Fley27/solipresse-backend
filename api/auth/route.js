const express = require("express");
const {check} = require("express-validator")
const validate = require("../../middlewares/validation/index");
const auth = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).json({
        message:
            "You are in the Auth Endpoint. Register or Login to test Authentication.",
    });
});

router.post(
    "/register",
    [
        check("email").isEmail().withMessage("Enter a valid email address"),
        check("password")
            .not()
            .isEmpty()
            .isLength({ min: 8 })
            .withMessage("Must be at least 8 characters long"),
        check("firstName")
            .not()
            .isEmpty()
            .withMessage("Your first name is required"),
        check("lastName").not().isEmpty().withMessage("Your last name is required"),
    ],
    validate,
    auth.register
)

router.post(
    "/login",
    [
        check("email").isEmail().withMessage("Enter a valid email address"),
        check("password")
            .not()
            .isEmpty()
            .isLength({ min: 8 })
            .withMessage("Must be at least 8 characters long"),
    ],
    validate,
    auth.login
)

router.post("/logout", auth.logout)

module.exports = router;


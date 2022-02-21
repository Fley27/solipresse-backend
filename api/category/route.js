const express = require("express");
const {check} = require("express-validator")
const validate = require("../../middlewares/validation/index");
const category = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message:
            "You are in Category Endpoint.",
    });
});

router.post(
    "/new",
    [
        check("title")
        .not()
        .isEmpty().withMessage("Enter a valid title"),
    ],
    validate,
    category.new
)

router.get("/:id", category.category);

router.get("/all", category.all);



module.exports =  router; 
const express = require("express");
const image = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message:
            "You are in Image Endpoint.",
    });
});

router.post(
    "/add",
    image.new
)

router.get("/:id", image.image);

router.get("/all", category.all);



module.exports =  router; 
const express = require("express");
const user = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message:
            "You are in Category Endpoint.",
    });
});

router.put("/:id", user.update);
router.get("/:id", user.detail);
router.post("/editors", user.editor);
router.post("/authors", user.author);




module.exports =  router; 
const express = require("express");
const {check} = require("express-validator")
const validate = require("../../middlewares/validation/index");
const authenticate = require("../../middlewares/auth/authenticate")
const post = require("./controller");
const schedulePost = require("../../middlewares/post/check-post-schedule")
const paginationPost = require("../../middlewares/post/pagination")

const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).json({
        message:
            "You are in the Post Endpoint.",
    });
});

router.post(
    "/new",
    authenticate,
    [
        check("title")
            .not()
            .isEmpty()
            .withMessage("Enter a valid title"),
        check("description")
            .not()
            .isEmpty()
            .withMessage("The number of characters must be at between 50 characters long"),
    ],
    validate,
    post.new
)

router.put("/approved/:id", authenticate, post.approved);

router.put("/removed/:id", authenticate, post.removed);

router.get("/author/:id", post.author);

router.get("/category/:id", post.category);

router.post("/articles", schedulePost.edit, paginationPost.dynamic, post.articles);

router.get("/blog/:nPerPage/:pageNumber",  post.blog);

router.get("/blog/:nPerPage/:pageNumber/:category",  post.blogPerCategory);

router.get("/premiere",  post.premiere);

router.post("/articles/author", schedulePost.edit, paginationPost.author, post.articlesPerAuthor);

router.post("/articles/editor", schedulePost.edit, paginationPost.editor, post.articlesPerEditor);

router.post("/similar",  post.similarArticles);

router.get("/:id", post.post);


module.exports =  router; 
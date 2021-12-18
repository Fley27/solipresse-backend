const mongoose = require("mongoose");

const {Shema} = mongoose;

const commentSchema = new Shema({
    description: {type: String, require: true},
    date: {type: String, default: Date.now()},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "post", require: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
    isRemoved: {type: Boolean },
    removeAt: {type: Date},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: "comment"},
    likeBy: [
        {user: {type: mongoose.Schema.Types.ObjectId, ref: "user"}}
    ]
})

module.exports = Comment = mongoose.model("comment", commentSchema)
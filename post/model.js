const mongoose = require("mongoose");

const {Schema} = mongoose;

const postSchema = new Schema({
    title: {type: String, require: true},
    description: {type: String, require: true}, 
    date: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    editor: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    status: {type: String, default: "Draft"}, 
    editedAt: {type: Date},
    postedAt: {type: Date},
    isRemoved: {type: Date},
    removedAt: {type: Date},
    isUpdated: {type: Boolean},
    updatedAt: {type: Date},
    reasonForremoval: {type: String},
    isAvailable: {type: Boolean},
    publicationDate: {type: Date},
    likeBy: [
        {user: {type: mongoose.Schema.Types.ObjectId, ref: "user"}}
    ]
})

module.exports = Post = mongoose.model("post", postSchema)
const mongoose = require("mongoose");
const schema = require("./schema");

const {Schema} = mongoose;

const postSchema = new Schema(schema.init(mongoose))

module.exports = Post = mongoose.model("post", postSchema)
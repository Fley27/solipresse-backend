const mongoose = require("mongoose");
const {Schema} = mongoose;
const schema = require("./schema")

const userSchema = new Schema (schema.init(mongoose))     


module.exports = User = mongoose.model("user", userSchema)
const mongoose =  require("mongoose");
const {Schema} = mongoose;
const schema = require("./schema");

const categorySchema = new Schema(schema.init);

module.exports = Category = mongoose.model("category", categorySchema)
const mongoose =  require("mongoose");
const {Schema} = mongoose;
const schema = require("./schema");

const imageSchema = new Schema(schema.init());

module.exports = Image = mongoose.model("image", imageSchema) 
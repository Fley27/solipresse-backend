const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = new Schema ({
    firstname: { type: String, require: true}, 
    lastname: {type: String, require: true},
    email: {type: String, require: true, unique: true}, 
    password: {type: String, require: true},
    phone: {type: String},
    birthday: {type: Date},
    isLogged: {type: Boolean, default: false},
    loggedAt: {type: Date },
    role: {type: String, default: "normal"},
    isSubscribed: {type: Boolean},
    subscription: {
        channel: {type: String, default: email}
    },
    isconfirmed: {type: Boolean, default: false}, 
    country: {type: String},
    code: {type: String},
    expirationDate: {type: Date, default: Date.now()}, 
    avatar: {type: String},
    bio: {type: String}
})     


module.exports = User = mongoose.model("user", userSchema)
exports.init = (mongoose) => ({
    firstName: { type: String, require: true}, 
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true}, 
    password: {type: String, require: true},
    phone: {type: String},
    birthday: {type: Date},
    country: {type: String},
    city: {type: String},
    address: {type: String},
    address2: {type: String},
    avatar: {type: mongoose.Schema.Types.ObjectId, ref: "image"},
    bio: {type: String},
    role: {type: String, default: "normal"},
    code: {type: String},
    status: {type: String, default: "Pending"},
    isDeleted: {type: Boolean},
    deleteAt: {type: Date}, 
    isLogged: {type: Boolean, default: false},
    loggedAt: {type: Date },
    subscribers: [{
        email: {type: String},
    }],
    followers: [
        {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    ],
    isconfirmed: {type: Boolean, default: false}, 
    expirationDate: {type: Date, default: Date.now()}, 
})
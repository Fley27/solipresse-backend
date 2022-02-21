
module.exports = (mongoose) => {
    const {Schema} = mongoose;

    return new Schema({
        content: {type: String, require: true},
        date: {type: Date, default: Date.now()},
        post: {type: mongoose.Schema.Types.ObjectId, ref: "post", require: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
        isRemoved: {type: Boolean },
        removeAt: {type: Date},
        likeBy: [
            {type: mongoose.Schema.Types.ObjectId, ref: "user"}
        ], 
        reply:[
            {
                content: {type: String},
                date: {type: Date, default: Date.now()},
                user: {type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
                nameOfUser: {type: String},
                isRemoved: {type: Boolean },
                removeAt: {type: Date},
            }
        ]
    })
}
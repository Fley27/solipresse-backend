
module.exports = (mongoose) => {
    const {Schema} = mongoose;

    return new Schema({
        post: {type: mongoose.Schema.Types.ObjectId, ref: "post", require: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
        isUnlike: {type: Boolean, default: false },
        unlikeAt: {type: Date, },
        date: {type: Date, default: Date.now()},
    })
}
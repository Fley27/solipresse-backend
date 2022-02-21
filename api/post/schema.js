exports.init = (mongoose) => ({
    title: {type: String, require: true},
    type: {type: String, default: "Normal"},
    description: {type: String, require: true}, 
    date: {type: Date, default: Date.now()},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    editor: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    status: {type: String, default: "draft"}, 
    editedAt: {type: Date}, 
    postedAt: {type: Date},
    scheduleAt: {type: Date},
    isRemoved: {type: Boolean},
    removedAt: {type: Date},
    isUpdated: {type: Boolean},
    updatedAt: {type: Date},
    reasonForremoval: {type: String},
    isAvailable: {type: Boolean, default: false},
    publicationDate: {type: Date},
    readCount: { type: Number, default: 0},
    category: [
        {type: String}, 
    ],
    content: {type: String}, 
    image: {type: mongoose.Schema.Types.ObjectId, ref: "image"},
    tags: [{
        type: String
    }]
})
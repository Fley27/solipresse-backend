const Like = require("../../api/like/model")

module.exports = async (req,res, next) => {
    try {
        let like = null
        if(req.headers.user)
            like = await Like.findOne({ user: req.headers.user._id, post: req.headers.article });
        
        const numberOfLike = await Like.find({isUnlike: false, post: req.headers.article}).count();
        const isExist = like ? true : false;
        req.headers.isLiked = isExist ? !like.isUnlike : false;
        req.headers.isExist = isExist;
        req.headers.numberOfLike = numberOfLike;
        req.headers.like = like;
        next();
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}
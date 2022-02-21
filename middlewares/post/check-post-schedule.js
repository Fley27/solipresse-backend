//@route Get api/article/articles
//@desc -----
//@access public

const Post = require("../../api/post/model")

exports.edit = async (req, res, next) => {
    try {
        await Post.updateMany(
            {scheduleAt: {$lte: new Date()}},
            {
                $set: {
                    isAvailable: true
                }
            }
        )
        next()
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@desc -----
//@access public

const Post = require("../../api/post/model");

exports.read = async (req, res, next) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(404).json({
                message: "Could not find any article which match with this id."
            })

        let readCount = post.readCount;
        !readCount ? readCount  = 1 : readCount++;
        
        post.set({readCount})
        await post.save()
        next();   
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}
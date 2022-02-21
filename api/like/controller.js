const Like = require("./model");
const io = require("../../socket.io");

exports.like = async (req,res) => {
    try {
        const {post} = req.body;
        console.log(post);
        let isLiked = req.headers.isLiked, numberOfLike = req.headers.numberOfLike, like = req.headers.like, isExist = req.headers.isExist;
        console.log(isLiked);
        if(!isExist)
            like = new Like({post, user: req.headers.user._id});
        else
            like.set({isUnlike: !like.isUnlike, unlikeAt: new Date()});

        await like.save();
        if(isLiked)
            numberOfLike -= 1;
        else
            numberOfLike += 1;
        io.getIo().emit('like', {action: "addOrRemoved", numberOfLike: numberOfLike});
        return res.json({numberOfLike: numberOfLike, isLiked: !like.isUnlike});
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

exports.isLiked = async (req,res) => {
    try {
        return res.json({isLiked: req.headers.isLiked, numberOfLike: req.headers.numberOfLike});
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}


const Comment = require("./model");
const io = require("../../socket.io");

//@route  Post api/comment/add
//@desc Post new comment
//@access public

exports.add = async (req,res) => {
    try {
        const {content, post} = req.body;
        const newComment = new Comment({content, post, user: req.headers.user._id});
        await newComment.save();
        const comment = await Comment.findById(newComment._id).populate("user");
        io.getIo().emit('comment', {action: "add", comment: comment});
        return res.json(comment);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}


//@route  Post api/comment/add
//@desc Post get comment
//@access public

exports.fetch = async (req,res) => {
    try {
        const comments = await Comment.find({post: req.params.post}).populate("user");
        return res.json(comments);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route  Post api/comment/reply
//@desc Post new comment
//@access public

exports.reply = async (req,res) => {
    try {
        const {content, id} = req.body;
        console.log(req.headers.user);
        const comment =  await Comment.findById(id).populate("user");
        if (!comment)
            return res.status(404).json({message: `No comments matched`});
        comment.reply.push({content, user: req.headers.user._id, nameOfUser: `${req.headers.user.firstName} ${req.headers.user.lastName}`});
        await comment.save();
        const comments = await Comment.find({post: comment.post}).populate("user");
        io.getIo().emit('comment', {action: "reply", comments: comments});
        return res.json(comments);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}
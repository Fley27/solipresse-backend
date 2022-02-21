const Post = require("./model");
const Image = require("../image/model");
const func = require("./function");
const funcPerAuthor = require("./funcForAuthor")
const funcPerEditor = require("./funcForEditor");


exports.similarArticles = async (req, res) => {
    try {
        const {id,tags} = req.body;
        //tags: {$in: tags},
        const posts = await Post.find({status: "approved", isAvailable: true,  _id: {$ne: id}})
        .populate("image")
        .limit(10)
        .sort({date: 1});
        return res.json({
            articles: posts,
        });
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}


//@route Get api/article/articles
//@desc Fetch articles posts 
//@access public

exports.articlesPerEditor = async (req, res) => {
    try {
        const {pageNumber, nPerPage, search, category, tag, oderBy, user, isAvailable} = req.body;
        const pageTotal = req.headers.pageTotal;
        const isTitleMatch =  req.headers.isTitleMatch;
        const isDescriptionMatch = req.headers.isDescriptionMatch; 
        const isContentMatch = req.headers.isContentMatch;
        let posts = null;

        console.log(`${isContentMatch} ${isDescriptionMatch} ${isTitleMatch}`);

        if(isTitleMatch)    
            posts = await funcPerEditor.isMatchPerTitle(Post, isTitleMatch, category, tag, search, nPerPage, pageNumber, user, isAvailable)
        if(isDescriptionMatch)    
            posts = await funcPerEditor.isMatchPerDescription(Post, isDescriptionMatch, category, tag, search, nPerPage, pageNumber, user, isAvailable)
        if(isContentMatch)    
            posts = await funcPerEditor.isMatchContent(Post, isContentMatch, category, tag, search, nPerPage, pageNumber, user, isAvailable)

        if(!posts)
            return res.json({
                articles: [],
                pageNumber: pageNumber,
                hasNextPage: nextPage >= pageTotal ? false : true,
                numberTotalOfPage: pageTotal,
                nextPage: nextPage
            })

        const nextPage = pageNumber + 1;
        return res.json({
            articles: posts,
            pageNumber: pageNumber,
            hasNextPage: nextPage >= pageTotal ? false : true,
            numberTotalOfPage: pageTotal,
            nextPage: nextPage
        });        
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}


//@route Get api/article/articles/author
//@desc Fetch articles posts per author selected author
//@access public

exports.articlesPerAuthor = async (req, res) => {
    try {
        const {pageNumber, nPerPage, search, category, tag, oderBy, user, isAvailable} = req.body;
        const pageTotal = req.headers.pageTotal;
        const isTitleMatch =  req.headers.isTitleMatch;
        const isDescriptionMatch = req.headers.isDescriptionMatch; 
        const isContentMatch = req.headers.isContentMatch;
        let posts = null;

        console.log(`${isContentMatch} ${isDescriptionMatch} ${isTitleMatch}`);

        if(isTitleMatch)    
            posts = await funcPerAuthor.isMatchPerTitle(Post, isTitleMatch, category, tag, search, nPerPage, pageNumber, user, isAvailable)
        if(isDescriptionMatch)    
            posts = await funcPerAuthor.isMatchPerDescription(Post, isDescriptionMatch, category, tag, search, nPerPage, pageNumber, user, isAvailable)
        if(isContentMatch)    
            posts = await funcPerAuthor.isMatchContent(Post, isContentMatch, category, tag, search, nPerPage, pageNumber, user, isAvailable)

        if(!posts)
            return res.json({
                articles: [],
                pageNumber: pageNumber,
                hasNextPage: nextPage >= pageTotal ? false : true,
                numberTotalOfPage: pageTotal,
                nextPage: nextPage
            })

        const nextPage = pageNumber + 1;
        return res.json({
            articles: posts,
            pageNumber: pageNumber,
            hasNextPage: nextPage >= pageTotal ? false : true,
            numberTotalOfPage: pageTotal,
            nextPage: nextPage
        });        
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Post api/article/new
//@desc Post post
//@access public 

exports.new = async (req, res) => { 

    try {
        const {title, description, content, category, tags} =  req.body;
        //const newPost = new Post(req.body);
        //await newPost.save();
        console.log(req)
        if(!req.file.path)
            return res.status(404).json({message: "Could not file an image attached."});

        //Add the path of the image in our database
        const image = new Image({path: req.file.path});

        //Create a new post
        const newPost = new Post({title, description, tags: JSON.parse(tags), category: JSON.parse(category), content, image: image._id, author: req.headers.user._id });

        await image.save()
        await newPost.save();
        
        return res.json(newPost);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Get api/article/articles
//@desc Fetch articles posts 
//@access public

exports.articles = async (req, res) => {
    try {
        const {pageNumber, nPerPage, search, category, tag, oderBy, isAvailable} = req.body;
        const pageTotal = req.headers.pageTotal;
        const isTitleMatch =  req.headers.isTitleMatch;
        const isDescriptionMatch = req.headers.isDescriptionMatch; 
        const isContentMatch = req.headers.isContentMatch;
        let posts = null;

        console.log(`${isContentMatch} ${isDescriptionMatch} ${isTitleMatch}`);

        if(isTitleMatch)    
            posts = await func.isMatchPerTitle(Post, isTitleMatch, category, tag, search, nPerPage, pageNumber, isAvailable)
        if(isDescriptionMatch)    
            posts = await func.isMatchPerDescription(Post, isDescriptionMatch, category, tag, search, nPerPage, pageNumber, isAvailable)
        if(isContentMatch)    
            posts = await func.isMatchContent(Post, isContentMatch, category, tag, search, nPerPage, pageNumber, isAvailable)

        if(!posts)
            return res.json({
                articles: [],
                pageNumber: pageNumber,
                hasNextPage: nextPage >= pageTotal ? false : true,
                numberTotalOfPage: pageTotal,
                nextPage: nextPage
            })

        const nextPage = pageNumber + 1;
        return res.json({
            articles: posts,
            pageNumber: pageNumber,
            hasNextPage: nextPage >= pageTotal ? false : true,
            numberTotalOfPage: pageTotal,
            nextPage: nextPage
        });        
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}


//@route Get api/article/draft
//@desc Fetch all posts 
//@access public

exports.blogPerCategory = async (req, res) => {
    try {
        const postCount = await Post.count();
        const availableNumberOfPage = Math.ceil((postCount - 1) / req.params.nPerPage);
        const posts = await Post.find({status: "approved", isAvailable: true, category: { $in: [`${req.params.category}`]}})
        .populate("image")
        .skip(( req.params.pageNumber * req.params.nPerPage ))
        .limit( req.params.nPerPage )
        .sort({date: 1});
        //Next Page
        const nextPage = req.params.pageNumber + 1;
        console.log(posts)
        return res.json({
            articles: posts,
            pageNumber: req.params.pageNumber,
            hasNextPage: nextPage >= availableNumberOfPage ? false : true,
            numberTotalOfPage: availableNumberOfPage,
            nextPage: nextPage
        });
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
} 

//@route Get api/article/draft
//@desc Fetch all posts 
//@access public

exports.blog = async (req, res) => {
    try {
        const postCount = await Post.count();
        const availableNumberOfPage = Math.ceil((postCount - 1) / req.params.nPerPage);
        const posts = await Post.find({status: "approved", isAvailable: true})
        .populate("image")
        .skip(( req.params.pageNumber * req.params.nPerPage ))
        .limit( req.params.nPerPage )
        .sort({date: 1});
        //Next Page
        const nextPage = req.params.pageNumber + 1;
        console.log(posts)
        return res.json({
            articles: posts,
            pageNumber: req.params.pageNumber,
            hasNextPage: nextPage >= availableNumberOfPage ? false : true,
            numberTotalOfPage: availableNumberOfPage,
            nextPage: nextPage
        });
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Get api/article/draft
//@desc Fetch all posts 
//@access public

exports.removed = async (req, res) => {
    try {
        const posts = await Post.find({status: "removed"}).limit(10).sort({postedAt: 1})
        return res.json(posts);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Get api/article/:id
//@desc Fetch a specific post per it id
//@access public

exports.post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(["image", "author"]);
        return res.json(post);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Get api/article/:id
//@desc Fetch a specific post per it id
//@access public

exports.premiere = async (req, res) => {
    try {
        const post = await Post.findOne({type: "Première"}).populate("image");
        return res.json(post);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Get api/article/author/:id
//@desc Fetch all posts per a specific user
//@access public

exports.author = async (req, res) => {
    try {
        const posts = await Post.find({author: req.params.id}).limit(10).sort({postedAt: 1})
        return res.json(posts);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Get api/article/category/:id
//@desc Fetch all posts per categories
//@access public

exports.category = async (req, res) => {
    try {
        const posts = await Post.find({category: {$in : req.body }}).limit(10).sort({postedAt: 1})
        return res.json(posts);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route Put api/article/:id
//@desc update an article
//@access public 

exports.approved = async (req, res) => {
    try {
        console.log(req.body)
        const {category, day, month, year, hour, minute, type} = req.body;
        const post = await Post.findById(req.params.id);
        const date = new Date();
        const scheduled = new Date(`${year}-${month + 1 < 10 ? `0`+ (month + 1)  : (month + 1)}-${day} ${hour}:${minute}:00`);

        if(category === "Immediately")
            post.set({editedAt: date, postedAt: date, status: "approved", isAvailable: true, editor: req.headers.user._id, type: type});
        else if(category === "Scheduled")
            post.set({editedAt: date, scheduleAt: scheduled, status: "approved", editor: req.headers.user._id, type: type});
        
        await post.save();         
        return res.json(true);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

exports.removed = async (req, res) => {
    try {
        console.log(req.body)
        const {category, day, month, year, hour, minute} = req.body;
        const post = await Post.findById(req.params.id);
        const date = new Date();

        post.set({removedAt: date, status: "removed", isRemoved: true, editor: req.headers.user._id});

        //await post.save();
        console.log(post);
        return res.json(true);
    } catch (error) {
        return res.status(500).json({message: `Server error: ${error}`})
    }
}


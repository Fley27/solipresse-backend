//@route Get api/article/articles
//@desc -----
//@access public
const Post = require("../../api/post/model");
const ObjectId = require("bson-objectid");

exports.editor = async (req, res, next) => {
    try {
        const {nPerPage, search, category, tag, sortBy, user, isAvailable} = req.body;
        console.log(req.body);
        let availableNumberOfPage = 0, isTitleMatch = true, isDescriptionMatch = true, isContentMatch = true;
        const posts = await Post.aggregate([
            {
                $match: {
                    $and: [{category: {$in : category}}, {tags: {$in : tag}}],
                    status: `${isAvailable ? `approved` : `draft`}`,  
                    isAvailable: isAvailable,
                    editor: ObjectId(user),
                }
            },
            {
                $addFields: {
                    score: "0",
                    isTitleMatch: {$regexMatch: {input: "$title", regex: search, options: "i"}},
                    isDescriptionMatch: {$regexMatch: {input: "$description", regex: search, options: "i"}},
                    isContentMatch: {$regexMatch: {input: "$content", regex: search, options: "i"}},
                }
            },
            {
                $project: { 
                    id: "$score",
                    "titleScore": {
                        $cond: { if: { $eq: ["$isTitleMatch",true] }, then: 1, else: 0 }
                    },
                    "descriptionScore": {
                        $cond: { if: {$eq: ["$isDescriptionMatch",true] }, then: 1, else: 0 }
                    },
                    "contentScore": {
                        $cond: { if: {$eq: ["$isContentMatch", true] }, then: 1, else: 0 }
                    }
                }
            },
            {
                $group: { 
                    _id: "$id",
                    "totalTitleScore": { $sum: "$titleScore"},
                    "totalDescriptionScore": { $sum: "$descriptionScore"},
                    "totalContentScore": { $sum: "$contentScore"},
                }
            },
        ]);
        console.log(posts);
        if(!posts.length)
            return res.json({
                articles: [],
                pageNumber: 0,
                hasNextPage:  false,
                numberTotalOfPage: 0,
                nextPage: 0
            })
        if(sortBy === "title"){
            availableNumberOfPage = Math.ceil((posts[0].totalTitleScore) / nPerPage);
            isDescriptionMatch = false; 
            isContentMatch = false;
        }else if (sortBy  === "description"){
            availableNumberOfPage = Math.ceil((posts[0].totalDescriptionScore) / nPerPage);
            isTitleMatch = false;
            isContentMatch = false;
        }else if (sortBy  === "content"){
            availableNumberOfPage = Math.ceil((posts[0].totalContentScore) / nPerPage);
            isTitleMatch = false;
            isDescriptionMatch = false; 
        }
        req.headers.pageTotal = availableNumberOfPage;
        req.headers.isTitleMatch = isTitleMatch;
        req.headers.isDescriptionMatch = isDescriptionMatch; 
        req.headers.isContentMatch = isContentMatch;
        next();
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

exports.author = async (req, res, next) => {
    try {
        const {nPerPage, search, category, tag, sortBy, user, isAvailable} = req.body;
        console.log(req.body);
        let availableNumberOfPage = 0, isTitleMatch = true, isDescriptionMatch = true, isContentMatch = true;
        const posts = await Post.aggregate([
            {
                $match: {
                    $and: [{category: {$in : category}}, {tags: {$in : tag}}],
                    status: `${isAvailable ? `approved` : `draft`}`,  
                    isAvailable: isAvailable,
                    author: ObjectId(user),
                }
            },
            {
                $addFields: {
                    score: "0",
                    isTitleMatch: {$regexMatch: {input: "$title", regex: search, options: "i"}},
                    isDescriptionMatch: {$regexMatch: {input: "$description", regex: search, options: "i"}},
                    isContentMatch: {$regexMatch: {input: "$content", regex: search, options: "i"}},
                }
            },
            {
                $project: { 
                    id: "$score",
                    "titleScore": {
                        $cond: { if: { $eq: ["$isTitleMatch",true] }, then: 1, else: 0 }
                    },
                    "descriptionScore": {
                        $cond: { if: {$eq: ["$isDescriptionMatch",true] }, then: 1, else: 0 }
                    },
                    "contentScore": {
                        $cond: { if: {$eq: ["$isContentMatch", true] }, then: 1, else: 0 }
                    }
                }
            },
            {
                $group: { 
                    _id: "$id",
                    "totalTitleScore": { $sum: "$titleScore"},
                    "totalDescriptionScore": { $sum: "$descriptionScore"},
                    "totalContentScore": { $sum: "$contentScore"},
                }
            },
        ]);
        console.log(posts);
        if(!posts.length)
            return res.json({
                articles: [],
                pageNumber: 0,
                hasNextPage:  false,
                numberTotalOfPage: 0,
                nextPage: 0
            })
        if(sortBy === "title"){
            availableNumberOfPage = Math.ceil((posts[0].totalTitleScore) / nPerPage);
            isDescriptionMatch = false; 
            isContentMatch = false;
        }else if (sortBy  === "description"){
            availableNumberOfPage = Math.ceil((posts[0].totalDescriptionScore) / nPerPage);
            isTitleMatch = false;
            isContentMatch = false;
        }else if (sortBy  === "content"){
            availableNumberOfPage = Math.ceil((posts[0].totalContentScore) / nPerPage);
            isTitleMatch = false;
            isDescriptionMatch = false; 
        }
        req.headers.pageTotal = availableNumberOfPage;
        req.headers.isTitleMatch = isTitleMatch;
        req.headers.isDescriptionMatch = isDescriptionMatch; 
        req.headers.isContentMatch = isContentMatch;
        next();
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

exports.dynamic = async (req, res, next) => {
    try {
        const {nPerPage, search, category, tag, sortBy, isAvailable} = req.body;
        console.log(req.body);
        let availableNumberOfPage = 0, isTitleMatch = true, isDescriptionMatch = true, isContentMatch = true;
        const posts = await Post.aggregate([
            {
                $match: {
                    $and: [{category: {$in : category}}, {tags: {$in : tag}}],
                    status: `${isAvailable ? `approved` : `draft`}`, 
                    isAvailable: isAvailable
                }
            },
            {
                $addFields: {
                    score: "0",
                    isTitleMatch: {$regexMatch: {input: "$title", regex: search, options: "i"}},
                    isDescriptionMatch: {$regexMatch: {input: "$description", regex: search, options: "i"}},
                    isContentMatch: {$regexMatch: {input: "$content", regex: search, options: "i"}},
                }
            },
            {
                $project: { 
                    id: "$score",
                    "titleScore": {
                        $cond: { if: { $eq: ["$isTitleMatch",true] }, then: 1, else: 0 }
                    },
                    "descriptionScore": {
                        $cond: { if: {$eq: ["$isDescriptionMatch",true] }, then: 1, else: 0 }
                    },
                    "contentScore": {
                        $cond: { if: {$eq: ["$isContentMatch", true] }, then: 1, else: 0 }
                    }
                }
            },
            {
                $group: { 
                    _id: "$id",
                    "totalTitleScore": { $sum: "$titleScore"},
                    "totalDescriptionScore": { $sum: "$descriptionScore"},
                    "totalContentScore": { $sum: "$contentScore"},
                }
            },
        ]);
        console.log(posts);
        if(!posts.length)
            return res.json({
                articles: [],
                pageNumber: 0,
                hasNextPage:  false,
                numberTotalOfPage: 0,
                nextPage: 0
            })
        if(sortBy === "title"){
            availableNumberOfPage = Math.ceil((posts[0].totalTitleScore) / nPerPage);
            isDescriptionMatch = false; 
            isContentMatch = false;
        }else if (sortBy  === "description"){
            availableNumberOfPage = Math.ceil((posts[0].totalDescriptionScore) / nPerPage);
            isTitleMatch = false;
            isContentMatch = false;
        }else if (sortBy  === "content"){
            console.log("JJJ");
            availableNumberOfPage = Math.ceil((posts[0].totalContentScore) / nPerPage);
            isTitleMatch = false;
            isDescriptionMatch = false; 
        }
        req.headers.pageTotal = availableNumberOfPage;
        req.headers.isTitleMatch = isTitleMatch;
        req.headers.isDescriptionMatch = isDescriptionMatch; 
        req.headers.isContentMatch = isContentMatch;
        next();
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

/*
,
                "beauté",
                "société",
                "mode",
                "lifestyle", 
                "jobs-et-études",
                "bon-plans"


                 "Homosexualité",
                "bisexualité", 
                 "LGBT", 
                 "LGBTQ", 
                 "politique", 
                 "economie"  

*/
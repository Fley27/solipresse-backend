const ObjectId = require("bson-objectid");

exports.isMatchContent = async (Post, status, category, tag, search,  nPerPage, pageNumber, user, isAvailable) => {
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
            $lookup: {
                from: "images",
                localField: "image",
                foreignField: "_id",
                as: "image_docs"
            }
        },
        {
            $unwind: "$image_docs"
        },
        {
            $addFields: {
                isTitleMatch: {$regexMatch: {input: "$title", regex: search, options: "i"}},
                isDescriptionMatch: {$regexMatch: {input: "$description", regex: search, options: "i"}},
                isContentMatch: {$regexMatch: {input: "$content", regex: search, options: "i"}},
            }
        },
        {
            $match: {
                isContentMatch: status,
            }
        },
        {
            $skip: (pageNumber * nPerPage)
        },
        {
            $limit: nPerPage
        }
    ]);
    return posts;
}

exports.isMatchPerDescription = async (Post, status, category, tag, search,  nPerPage, pageNumber, user, isAvailable) => {
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
            $lookup: {
                from: "images",
                localField: "image",
                foreignField: "_id",
                as: "image_docs"
            }
        },
        {
            $unwind: "$image_docs"
        },
        {
            $addFields: {
                isTitleMatch: {$regexMatch: {input: "$title", regex: search, options: "i"}},
                isDescriptionMatch: {$regexMatch: {input: "$description", regex: search, options: "i"}},
                isContentMatch: {$regexMatch: {input: "$content", regex: search, options: "i"}},
            }
        },
        {
            $match: {
                isDescriptionMatch: status,
            }
        },
        {
            $skip: (pageNumber * nPerPage)
        },
        {
            $limit: nPerPage
        }
    ]);
    return posts;
}

exports.isMatchPerTitle = async (Post, status, category, tag, search,  nPerPage, pageNumber, user, isAvailable) => {
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
            $lookup: {
                from: "images",
                localField: "image",
                foreignField: "_id",
                as: "image_docs"
            }
        },
        {
            $unwind: "$image_docs"
        },
        {
            $addFields: {
                isTitleMatch: {$regexMatch: {input: "$title", regex: search, options: "i"}},
                isDescriptionMatch: {$regexMatch: {input: "$description", regex: search, options: "i"}},
                isContentMatch: {$regexMatch: {input: "$content", regex: search, options: "i"}},
            }
        },
        {
            $match: {
                isTitleMatch: status,
            }
        },
        {
            $skip: (pageNumber * nPerPage)
        },
        {
            $limit: nPerPage
        }
    ]);
    return posts;
}
const User = require("./model");

exports.update = async (req,res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body)
        
        if(user)
            user = await User.findById(req.params.id);
        
        return res.json(user)
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route  Get api/user/:id
//@desc get user per his/her id
//@access public

exports.detail = async (req,res) => {
    try {
        console.log("KK: "+req.params.id);
        const user = await User.findById(req.params.id);
        //{$and : [{ role: "author"}, {$or: [{$text: {$search: name}}, {isLogged: false}]}]}
        return res.json(user)
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route  Post api/user/editors
//@desc get editors
//@access public

exports.editor = async (req,res) => {
    try {
        const {name, status } = req.body;
        let array = []
        if(status ===  "All")
            array = ["Approved", "Pending", "Unavailable"]
        else if(status === "Completed")
            array = ["Approved"]
        else if("Pending")
            array = ["Pending"]
        else
            array = ["Unavailable"]
        console.log(array);
        const editors = await User.aggregate([
            // Project the concatenated full name along with the original doc
            {   
                $project: { 
                    searchName: {$concat: ['$firstName', ' ', '$lastName']}, 
                    firstName: "$firstName",
                    lastName: "$lastName",
                    job: "$role",
                    email: "$email",
                    location: {$concat: ['$city', ', ', '$country']},
                    phone: "$phone",
                    status: { $ifNull: [ "$status", "Pending" ] }
                }
            },
            {
                $addFields: 
                    {
                        isMatch: {$regexMatch: {input: "$searchName", regex: name, options: "i"}}
                    }
            },
            {
                $match: {
                    $and: [{job: "editor"}, {isMatch: true}], 
                    status: {$in: array }
                },
            },
        ]);
        //{$and : [{ role: "author"}, {$or: [{$text: {$search: name}}, {isLogged: false}]}]}
        return res.json(editors)
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}


//@route  Post api/user/authors
//@desc get authors
//@access public

exports.author = async (req,res) => {
    try {
        const {name, status } = req.body;
        let array = []
        if(status ===  "All")
            array = ["Approved", "Pending", "Unavailable"]
        else if(status === "Completed")
            array = ["Approved"]
        else if("Pending")
            array = ["Pending"]
        else
            array = ["Unavailable"]
        console.log(array);
        const authors = await User.aggregate([
            // Project the concatenated full name along with the original doc
            {   
                $project: { 
                    searchName: {$concat: ['$firstName', ' ', '$lastName']}, 
                    firstName: "$firstName",
                    lastName: "$lastName",
                    job: "$role",
                    email: "$email",
                    location: {$concat: ['$city', ', ', '$country']},
                    phone: "$phone", 
                    status: { $ifNull: [ "$status", "Pending" ] }
                }
            },
            {
                $addFields: 
                    {
                        isMatch: {$regexMatch: {input: "$searchName", regex: name, options: "i"}}
                    }
            },
            {
                $match: {
                    $and: [{job: "author"}, {isMatch: true}],
                    status: {$in: array }
                },
            },
        ]);
        //{$and : [{ role: "author"}, {$or: [{$text: {$search: name}}, {isLogged: false}]}]}
        return res.json(authors)
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

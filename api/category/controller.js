const Category = require("./model");

//@route  Post api/category/new
//@desc Post new category
//@access public

exports.new = async (req,res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        return res.json(newCategory);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}


//@route  Get api/category/all
//@desc Fetch all categories
//@access public

exports.all = async (req,res) => {
    try {
        const categories = await Category.find();
        return res.json(categories);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route  Get api/category/:id
//@desc Fetch a category per it id
//@access public

exports.category = async (req,res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.json(category);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
} 
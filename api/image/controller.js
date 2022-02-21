const Image = require("./model");

//@route  Post api/Image/new
//@desc Post new Image
//@access public

exports.add = async (req,res) => {
    try {
        const newImage = new Image(req.body);
        await newImage.save();
        return res.json(newImage);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
}

//@route  Get api/image/:id
//@desc Fetch a image per it id
//@access public

exports.image = async (req,res) => {
    try {
        const image = await Image.findById(req.params.id);
        return res.json(image);
    } catch (error) {
        console.log(`${error}`)
        return res.status(500).json({message: `Server error: ${error}` })
    }
} 

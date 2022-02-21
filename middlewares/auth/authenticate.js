const jwt_decode  = require("jwt-decode");
const User = require("../../api/user/model")

//Use to authneticate the user

module.exports = async (req, res, next) => {
    
    try {
        const decoded = jwt_decode(req.headers.user);
        const user = await User.findById(decoded.id);
        console.log(req.headers.user);
        if (!user)
        return res
            .status(401)
            .json({ message: "Unauthorized Access - No token Provided" });
        req.headers.user = user;
        next();    
    } catch (error) {
        console.log(`${error}`)
        return res
            .status(500)
            .json({ message: "Unauthorized Access - "+ error });
    }
};
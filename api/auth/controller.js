const User = require("../user/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route Post api/auth/register
//@desc Register user
//@access public

exports.register = async (req, res) => {
    try {
        let {firstName, lastName, birthday, email, password, country, phone, avatar, bio } = req.body;
        //Check if email doesn't exist yet
        const user = await User.findOne({email});
        if(user)
            return res.status(401).json({message: "This email is already used for another account"});

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const newUser = new User({firstName, lastName, birthday, email, password, country, phone, avatar, bio });
        await newUser.save();

        const payload = {
            id : newUser._id
        }

        //return token
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
            expiresIn: 360000,
            },
            (err, token) => {
                if (err)
                    return res.status(500).json({
                        message: `Error, can't create a new token ${err}`,
                    });
                return res.json({
                    token: token,
                    redirectTo: newUser.role === "normal" ? "/" : "/admin"
                });
            }
        );
    } catch (error) {
        console.log(error);
        return res
                .status(500)
                .json({message: `Server Error ${error}`})
    }
}

//@route Get api/auth/login
//@desc login user
//@access public 


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user)
            return res
                .status(404)
                .json({
                    message: `Any user's account matchs with this email`,
                    redirectTo: "/register"
                })

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res
                .status(404)
                .json({
                    message: `Your email or password is incorrect.`,
                    redirectTo: "/"
                })
        console.log("OK")
        const payload = {
            id : user._id
        }

        //return token
        jwt.sign(
            payload,
                config.get("jwtSecret"),
            {
            expiresIn: 360000,
            },
            (err, token) => {
                if (err)
                    return res.status(500).json({
                        message: `Error, can't create a new token ${err}`,
                    });
                return res.json({
                    token: token,
                    redirectTo: user.role === "normal" ? "/" : "/admin"
                });
            }
        );
    } catch (error) {
        console.log(error);
        return res
                .status(500)
                .json({message: `Server Error ${error}`})
    }
}

//@route Get api/auth/logout
//@desc Logout user
//@access public 


exports.logout = async (req, res) => {
    try {
        res.json({ 
            message: "Logged out successfully.", 
            token: "",
            redirectTo: "/"
        });
    } catch (error) {
        console.log(error);
        return res
                .status(500)
                .json({message: `Server Error ${error}`})
    }
}
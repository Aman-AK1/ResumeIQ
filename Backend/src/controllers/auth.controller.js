const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please fill all the deatils"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }]
})

if (isUserAlreadyExists) {
    if (isUserAlreadyExists.username === username) {
        return res.status(400).json({
            message: "Username is already taken"
        });
    }

    if (isUserAlreadyExists.email === email) {
        return res.status(400).json({
            message: "Account already exists with this mail"
        });
    }
}

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

/**
 * @name LoginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

console.log("password from request:", password);
console.log("user found:", user);
console.log("hashed password:", user?.password);

    const isPasswordValid = await bcrypt.compare(password, user.password)
console.log("isPasswordValid:", isPasswordValid);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid email or password"
        }
        )
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "user loggedin successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController(req,res){
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message: " User logged out successfully"
    })

}

/**
 * @name getmeController
 * @description get the current logged in user details 
 * @access Private
 */
async function getMeController(req,res){
const user = await userModel.findById(req.user.id)

res.status(200).json({
    message: "User details fetched successfully",
    user:{
        id:user._id,
        username:user.username,
        email: user.email

    }
})
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
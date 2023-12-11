const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const createToken = (_id) => {
    return jwt.sign({ _id }, secret, { expiresIn: '3d' })
}

//login user
const login = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//signup user
const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({email,token})
    }
    catch (error) {
        res.status(400).json({error:error.message})
    }
}

//get user id
const getUserId = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await User.findOne({ email });

        if (result) {
            const documentId = result._id;
            res.status(200).json({ id: documentId });
        } else {
            res.status(400).json({ message: "Document not found" });
        }
    } catch (error) {
        console.error('Error while retrieving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    login,
    signup,
    getUserId
}
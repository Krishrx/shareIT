const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]
    const secret = process.env.SECRET;

    try {
        const { _id } = jwt.verify(token, secret)
        //console.log(_id);
        req.user = await User.findOne({ _id }).select('_id')
        next()

    }
    catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth
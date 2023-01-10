const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser, checkPermissions } = require('../utils')
 
const getAllUsers = async(req, res) => {
    const users = await User.find({}).select('-password');
    res.status(StatusCodes.OK).json({users, count:users.length})
}
const getSingleUser = async(req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`no user with id ${req.params.id}`)
    }
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({user})
}
const getCurrentUser = async(req, res) => {
    res.status(StatusCodes.OK).json({user:req.user})
} 
const updateUser = async(req, res) => {
    const {name, email} = req.body;

    if(!name || !email){
        throw new CustomError.BadRequestError("please provide all values")
    }

    const user = await User.findOne({_id: req.user.userId})

    if(!user){
        throw new CustomError.NotFoundError(`no user with id ${req.user.UserId}`)
    }

    user.email = email
    user.name = name

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user:tokenUser})
    res.status(StatusCodes.OK).json({ user:tokenUser})
}

const updateUserPassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError("Invalid credentials")
    }

    console .log(req.body)
    console .log(req.user)

    const user = await User.findOne({_id: req.user.userId})
    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid credentials")
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({msg: "success! Password updated"})
}

module.exports = {
    getAllUsers, getSingleUser, getCurrentUser, updateUser, updateUserPassword
}
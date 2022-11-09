const User = require("../model/User");
const { StatusCode } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser, checkPermissions } = require('../utils')

const getAllUsers = async(req, res) => {
    res.send('get all users')
}
const getSingleUser = async(req, res) => {
    res.send('get single users')
}
const getCurrentUser = async(req, res) => {
    res.send('get current user')
}
const updateUser = async(req, res) => {
    res.send('update user')
}
const updateUserPassword = async(req, res) => {
    res.send('update user password')
}

module.exports = {
    getAllUsers, getSingleUser, getCurrentUser, updateUser, updateUserPassword
}
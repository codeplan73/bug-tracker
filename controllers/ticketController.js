const Ticket = require('../model/Ticket')
const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')
/**
 * assign ticket to user > ticket history
 *  unassigned tickets
 *  failed tickets
 *  fixed tickets
 */
/**
 * @param {post request}
 * @param {authenticated user can create ticket}
 */
const createTicket = async (req, res) => {
  req.body.user = req.user.userId
  
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  req.body.visualProof = result.secure_url

  const ticket = await Ticket.create(req.body)
  res.status(StatusCodes.CREATED).json({ticket})
}

/**
 * @param {get request}
 * @param {authenticated and authorize admin can view all tickets}
 */
const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({});
  res.status(StatusCodes.OK).json({tickets, count:tickets.length})
}

/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getMyTickets = async (req, res) => {
  const myTickets = await Ticket.find({user: req.user.userId})
  checkPermissions(req.user, myTickets.user)
  res.status(StatusCodes.OK).json({myTickets, count:myTickets.length})
}
/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getMyAssignedTickets = async (req, res) => {
  const myAssignedTickets = await Ticket.find({assignee: req.user.userId})
  res.status(StatusCodes.OK).json({myAssignedTickets, count:myAssignedTickets.length})
}

/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getTicket = async (req, res) => {
  res.send('get tickets details')
}

/**
 * @param {patch request}
 * @param {authenticated and authorize admin can assign ticket to user}
 */
const assignUserTicket = async (req, res) => {
  res.send('assign ticket to user')
}

/**
 * @param {patch request}
 * @param {authenticated and authorize user can updata ticket status}
 */
const updateTicketStatus = async (req, res) => {
  res.send('update ticket status')
}

/**
 * @param {delete request}
 * @param {authenticated and authorize user can updata ticket status}
 */
const deleteTicket = async (req, res) => {
  res.send('delete ticket')
}

module.exports = {
  createTicket,
  getAllTickets,
  getMyTickets,
  getMyAssignedTickets,
  getTicket,
  assignUserTicket,
  updateTicketStatus,
  deleteTicket,
}

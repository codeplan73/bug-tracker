const Ticket = require('../model/Ticket')
const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

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
  )
  fs.unlinkSync(req.files.image.tempFilePath)
  req.body.visualProof = result.secure_url

  const ticket = await Ticket.create(req.body)
  res.status(StatusCodes.CREATED).json({ ticket })
}

/**
 * @param {get request}
 * @param {authenticated and authorize admin can view all tickets}
 */
const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({})
  res.status(StatusCodes.OK).json({ tickets, count: tickets.length })
}

/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getMyTickets = async (req, res) => {
  const myTickets = await Ticket.find({ user: req.user.userId })
  checkPermissions(req.user, myTickets[0].user)
  res.status(StatusCodes.OK).json({ myTickets, count: myTickets.length })
}

/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getMyAssignedTickets = async (req, res) => {
  const myAssignedTickets = await Ticket.find({ assignee: req.user.userId })
  //   checkPermissions(req.user, myAssignedTickets[0].user)
  res
    .status(StatusCodes.OK)
    .json({ myAssignedTickets, count: myAssignedTickets.length })
}

/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getTicket = async (req, res) => {
  const id = req.params.id
  const ticket = await Ticket.find({ _id: id })
  checkPermissions(req.user, ticket[0].user)
  res.status(StatusCodes.OK).json({ ticket })
}

/**
 * @param {patch request}
 * @param {authenticated and authorize admin can assign ticket to user}
 */
const assignUserTicket = async (req, res) => {
  const ticketId = req.params.id

  const ticket = await Ticket.find({ _id: ticketId })
  if (ticket.status === 'assigned') {
    throw new CustomError.BadRequestError(
      `This tickets has been assiged user with id ${ticket.assignee}`
    )
  }

  await Ticket.findByIdAndUpdate({ _id: ticketId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket with id ${ticketid}`)
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `has been assigned, ticket with id ${ticketId}` })
}

/**
 * @param {patch request}
 * @param {authenticated and authorize user can updata ticket status}
 */
const updateTicketStatus = async (req, res) => {
  const id = req.params.id

  const ticket = await Ticket.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket with id ${id}`)
  }
  res.status(StatusCodes.OK).json({ ticket })
}

/**
 * @param {delete request}
 * @param {authenticated and authorize user can updata ticket status}
 */
const deleteTicket = async (req, res) => {
  const id = req.params.id
  const ticket = await Ticket.findOne({ _id: id })

  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket with id: ${id}`)
  }

  await ticket.remove()
  res.status(StatusCodes.OK).json({ msf: 'Success! Ticket has benn removed' })
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

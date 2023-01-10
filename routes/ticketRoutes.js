const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const {createTicket, getAllTickets, getMyTickets, getMyAssignedTickets, getTicket, assignUserTicket, updateTicketStatus, deleteTicket} = require('../controllers/ticketController')

router.route('/').post(authenticateUser, createTicket)
router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllTickets)
router.route('/assignTicket/:id').patch(authenticateUser, authorizePermissions('admin'), assignUserTicket)

router.route('/userTickets').get(authenticateUser, getMyTickets)
router.route('/assignedTickets').get(authenticateUser, getMyAssignedTickets)
router.route('/:id').get(authenticateUser, getTicket)
router.route('/:id').patch(authenticateUser, updateTicketStatus)
router.route('/:id').delete(authenticateUser, authorizePermissions('admin'), deleteTicket)

module.exports = router; 
/**
 * create ticket
 * all tickets
 * my assigned tickets
 * all my tickets
 * show ticket
 * update ticket status
 * delete ticket
 * assign ticket to user > ticket history
 *  unassigned tickets 
 *  failed tickets
 *  fixed tickets
 */

/**
 * @param {post request}
 * @param {authenticated user can create ticket}
 */
 const createTicket = async(req, res)=>{
    res.send("create ticket")
}

/**
 * @param {get request}
 * @param {authenticated and authorize admin can view all tickets}
 */
const getAllTickets = async(req, res)=>{
    res.send("get all tickets")
}

/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getMyTickets = async(req, res)=>{
    res.send("get all user tickets")
}

/**
 * @param {get request}
 * @param {authenticated and authorize user can view user tickets}
 */
const getTicket = async(req, res)=>{
    res.send("get tickets details")
}

/**
 * @param {patch request}
 * @param {authenticated and authorize admin can assign ticket to user}
 */
const assignUserTicket = async(req, res)=>{
    res.send("assign ticket to user")
}

/**
 * @param {patch request}
 * @param {authenticated and authorize user can updata ticket status}
 */
const updateTicketStatus = async(req, res)=>{
    res.send("update ticket status")
}

/**
 * @param {delete request}
 * @param {authenticated and authorize user can updata ticket status}
 */
const deleteTicket = async(req, res)=>{
    res.send("delete ticket")
}

module.exports = {
    createTicket, getAllTickets, getMyTickets, getTicket, assignUserTicket, updateTicketStatus, deleteTicket
}
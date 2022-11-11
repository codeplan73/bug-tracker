const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a name']
    },
    summary: {
        type:String,
        required: [true, 'please enter ticket summary']
    },
    visualProof: {
        type:String,
    },
    environment: {
        type:String,
        required: [true, 'please enter environment']
    },
    sourceUrl: {
        type: String,
        required: true
    },
    consoleLog: {
        type:String,
    },
    steps_to_reproduce: {
        type: String,
        required: [true, 'please enter the steps to reproduce this error']
    },
    expected_result: {
        type:String
    },
    actual_result: {
        type: String,
    },
    assignee: {
        type: String,
    },
    status: {
        type: String,
        default: 'unassigned',
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Ticket', TicketSchema)
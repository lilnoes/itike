const mongoose = require("mongoose")

const TicketSchema = new mongoose.Schema({
    bus: {type: mongoose.Schema.Types.ObjectId, ref: "Bus"},
    session_id: {type: String},
    paid: {type: Boolean, default: false},
    pending: {type: Boolean, default: true},
    deleted: {type: Boolean, default: false},
    started: {type: Date, default: Date.now},
})

const Ticket = mongoose.model("Ticket", TicketSchema, "tickets")

module.exports = Ticket
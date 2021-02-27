const mongoose = require("mongoose")

const BTicketSchema = new mongoose.Schema({
    paid: {type: Boolean, default: false},
    session_id: {type: String},
    stripe_session_id: {type: String},
    email_sent: {type: Boolean, default: false},
    device_id: {type: Number},
    bus: {type: mongoose.Schema.Types.ObjectId, ref: "Bus"},
    ticket: {type: mongoose.Schema.Types.ObjectId, ref: "Ticket"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    payment_method: {type: String},
    payment_info: {type: String},
    validated_count: {type: Number, default: 0},
    qr_url: {type: String, default: ""},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    phone: {type: String},
    date: {type: Date, default: Date.now}
})

const BTicket = mongoose.model("BTicket", BTicketSchema, "bought_tickets")

module.exports = BTicket

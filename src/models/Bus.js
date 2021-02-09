const mongoose = require("mongoose")

const BusSchema = new mongoose.Schema({
    type: {type: String},
    from: {type: String},
    fee: {type: Number, default: 2000},
    plaka: {type: String},
    icon: {type: String},
    to: {type: String},
    date: {type: Date},
    taken_places: {type: Number, default: 0},
    available_places: {type: Number, default: 24},
    pending_places: {type: Number, default: 0},
    max_places: {type: Number, default: 24}
})

const Bus = mongoose.model("Bus", BusSchema, "buses")

module.exports = Bus
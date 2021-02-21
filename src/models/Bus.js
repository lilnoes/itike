const mongoose = require("mongoose")

const BusSchema = new mongoose.Schema({
    type: {type: String},
    from: {type: String},
    to: {type: String},
    hours: {type: Number, default: 5},
    fee: {type: Number, default: 2000},
    plaka: {type: String},
    type_url: {type: String, default: "https://itike.s3.amazonaws.com/assets/volcano.png"},
    date: {type: Date},
    taken_places: {type: Number, default: 0},
    available_places: {type: Number, default: 24},
    pending_places: {type: Number, default: 0},
    max_places: {type: Number, default: 24}
})

const Bus = mongoose.model("Bus", BusSchema, "buses")

module.exports = Bus
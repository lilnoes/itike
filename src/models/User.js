const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    first_name: {type: String},
    last_name: {type: String},
    id_no: {type: String},
    phone: {type: String},
    birth_date: {type: Date},
    created_at: {type: Date, default: Date.now},
    last_login: {type: Date, default: Date.now},
    password: {type: String},
})

const User = mongoose.model("User", UserSchema, "users")

module.exports = User
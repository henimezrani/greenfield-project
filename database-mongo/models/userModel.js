const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:                     { type: "string", required: true },
    email:                    { type: "string", required: true, unique: true },
    hashedPassword:           { type: "string", required: true },
    register_date:            { type: "string", default: Date.now }
})

User = mongoose.model('User',UserSchema)

module.exports.User = User
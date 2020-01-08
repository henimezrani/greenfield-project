const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    id_facebook :                {type: "string"},
    email_facebook :             {type: "string"},
    name:                        { type: "string"},
    email:                       { type: "string"},
    hashedPassword:              { type: "string"},
    register_date: { type: "string", default: Date.now }

})

User = mongoose.model('User',UserSchema)

module.exports.User = User

/*
method: {
        type: String,
        enum: ['local', 'facebook', 'google'],
        required: true
    },
    local: {
        name:                     { type: "string", required: true },
        email:                    { type: "string", required: true, unique: true },
        hashedPassword:           { type: "string", required: true },
        register_date:            { type: "string", default: Date.now }
    },
    facebook: {
        id:                       {type: String},
        email:                    {type: String,lowercase: true}
    } */
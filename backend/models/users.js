const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    morada:{
        contacto: {
            type: String
        },
        cidade: {
            type: String
        },
        ruaCasa: {
            type: String
        },
        codPostal: {
            type: String
        }
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Users", usersSchema,"users");
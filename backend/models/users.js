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
    morada: {
        contacto: {
            type: String
        },
        distrito: {
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
    carrinho: {
        ref: {
            type: Number
        },
        tamanho: {
            type: String
        },
        cor: {
            type: String
        },
        quantidade: {
            type: Number
        },
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Users", usersSchema, "users");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alunosSchema = new Schema({
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
    isAdmin:{
        type: Boolean,
        default: false
    }
})

var Alunos = mongoose.model("alunos", alunosSchema);
module.exports = Alunos;
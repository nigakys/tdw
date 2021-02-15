const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const produtosSchema = new Schema({
    ref:{
        type: Number,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true
    },
    especial:{
        type:Boolean,
        required:true
    },
    dataAdicionado:{
        type:Date,
        required: true
    },
    imagem: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("Produtos", produtosSchema,"produtos")
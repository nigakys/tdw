const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const produtosSchema = new Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    tamanho: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Produtos", produtosSchema)
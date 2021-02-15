const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const variantesSchema = new Schema({
    ref:{
        type: Number,
        required: true
    },
    tamanho: {
        type: String,
        required: true
    },
    imagens:{
        type: Array,
        required:true
    },
    cor: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Variantes", variantesSchema,"variantes")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encomendasSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    produtos: {
        type: Array,
        required: true
    },
    dataEncomenda: {
        type: String,
        required: true
    },
    custo: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Encomendas", encomendasSchema,"encomendas")
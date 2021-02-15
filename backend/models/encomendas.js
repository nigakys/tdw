const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encomendasSchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    produtos: {
        type: Array,
        required: true
    },
    dataEncomenda: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Encomendas", encomendasSchema,"encomendas")
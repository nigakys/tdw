const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
    categoria: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Categorias", categoriasSchema,"categorias")
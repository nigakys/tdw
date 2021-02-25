const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coresSchema = new Schema({
    cor: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Cor", coresSchema,"cores")
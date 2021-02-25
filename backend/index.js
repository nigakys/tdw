const express = require("express")
const mongoose = require("mongoose");
const dbName = "Grupo5";
const app = express();
app.use(express.json());
const cors = require("cors")
const port = 4000;
const uri = "mongodb://admin:admin@cluster0-shard-00-00.tqocv.mongodb.net:27017,cluster0-shard-00-01.tqocv.mongodb.net:27017,cluster0-shard-00-02.tqocv.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-pblict-shard-0&authSource=admin&retryWrites=true&w=majority";
const connect = mongoose.connect(uri, { dbName: dbName, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });


connect.then(() => {
    console.log("Connected");

    let produtos = require("./controllers/produtos");
    let variantes = require("./controllers/variantes");
    let users = require("./controllers/users");
    let atributos = require("./controllers/atributos");

    app.use(express.static('public'))
    app.use(cors());
    app.use("/variantes", variantes)
    app.use("/users", users)
    app.use("/produtos", produtos)
    app.use("/atributos", atributos)
    
    app.use((req, next) => {
        var data = new Date();
        console.log("Pedido: " + req.method + "\nData: " + data.toUTCString());
    });



    app.listen(port, () => console.log('App | TDW'));
});
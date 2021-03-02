var mongo = require("mongodb");
var express = require('express');
const encomendas = require("../models/encomendas");
var router = express.Router();

router.get('/', (req, res) => {
    encomendas.find().then(result => {
        if (result != null) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send("Nada encontrado")
        }
    })
});


router.get('/:id', (req, res) => {
    var id = new mongo.ObjectID(req.params.id);
    var query = { _id: id };
    if (req.params != null) {
        encomendas.find(query).then(result => {
            if (result != null) {
                res.status(200).send(result);
            }
            else {
                res.status(400).send("Nada encontrado")
            }
        })
    }
    else {
        res.status(400).send("Parametros vazios ou inválidos")
    }
});

router.post('/', (req, res) => {
    if (req.body != null) {
        encomendas.create(req.body)
            .then(() => {
                res.status(200).send("Produto inserido" + JSON.stringify(req.body));
            })
    }
    else {
        res.status(400).send("Body sem valores")
    }
})


router.put('/:id', (req, res) => {
    var id = new mongo.ObjectID(req.params.id);
    var query = { _id: id };

    if (req.body != null && req.params != null) {
        encomendas.updateOne(query, req.body).then(() => {
            res.status(200).send("Atualizado com sucesso: " + JSON.stringify(req.body));
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
    else {
        res.status(400).send("Body ou Id nao enviados");
    }
})

router.delete('/:id', (req, res) => {
    var id = new mongo.ObjectID(req.params.id);
    var query = { _id: id };
    if (req.params.id != null) {
        encomendas.deleteOne(query).then(() => {
            res.status(200).send("Apagado com sucesso");
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
    else {
        res.status(400).send("Id nao enviado");
    }
})

router.delete('/', (req, res) => {
    encomendas.deleteMany().then(() => {
        res.status(200).send("Apagado com sucesso");
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

module.exports = router;

var mongo = require("mongodb");
var express = require('express');
const variantes = require("../models/variantes");
var router = express.Router();


router.get('/', (req, res) => {
    variantes.find().then(result => {
        if (result != null) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send("Nada encontrado")
        }
    })
});


router.get('/:ref', (req, res) => {
    var query = { ref: req.params.ref };

    if (req.params != null && !isNaN(req.params.ref)) {
        variantes.find(query).then(result => {
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

        variantes.create(req.body).then(() => {
            res.status(200).send("Produto inserido" + JSON.stringify(req.body));
        })
            .catch((err) => {
                console.log(err)
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
        variantes.updateOne(query, req.body).then(() => {
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
        variantes.deleteOne(query).then(() => {
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
    variantes.deleteMany().then(() => {
        res.status(200).send("Apagado com sucesso");
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

module.exports = router;

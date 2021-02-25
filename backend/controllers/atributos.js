var mongo = require("mongodb");
var express = require('express');
const cores = require("../models/cores");
const categorias = require("../models/categorias");
var router = express.Router();


router.get('/cores/', (req, res) => {
    cores.find().then(result => {
        if (result != null) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send("Nada encontrado")
        }
    })
});

router.get('/categorias/', (req, res) => {
    categorias.find().then(result => {
        if (result != null) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send("Nada encontrado")
        }
    })
});



router.post('/categorias/', (req, res) => {
    if (req.body != null) {
        categorias.create(req.body)
            .then(() => {
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

router.post('/cores/', (req, res) => {
    if (req.body != null) {
        cores.create(req.body)
            .then(() => {
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

router.delete('/categorias/:categoria', (req, res) => {
    var categoria = req.params.categoria
    var query = { categoria: categoria };
    if (req.params.categoria != null) {
        categorias.deleteOne(query).then(() => {
            res.status(200).send("Apagada com sucesso");
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
    else {
        res.status(400).send("categoria nao existe");
    }
})

router.delete('/cores/:cor', (req, res) => {
    var cor = req.params.cor
    var query = { cor: cor };
    if (req.params.cor != null) {
        cores.deleteOne(query).then(() => {
            res.status(200).send("Apagada com sucesso");
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
    else {
        res.status(400).send("cor nao existe");
    }
})

module.exports = router;

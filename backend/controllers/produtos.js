var mongo = require("mongodb");
var express = require('express');
const produtos = require("../models/produtos");
var router = express.Router();
const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.get('/', (req, res) => {
    produtos.find().then(result => {
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
        produtos.find(query).then(result => {
            if (result != null) {
                res.status(200).send(result);
            }
            else {
                res.status(400).send("Nada encontrado")
            }
        })
    }
    else {

    }
});

router.get('/ref/:ref', (req, res) => {
    var query = { ref: req.params.ref };

    if (req.params != null) {
        produtos.findOne(query).then(result => {
            if (result != null) {
                res.status(200).send(result);
            }
            else {
                res.status(400).send("Nada encontrado")
            }
        })
    }
    else {

    }
});


router.post('/', (req, res) => {
    if (req.body != null) {
        produtos.create(req.body)
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

router.post('/imagem', function (req, res) {
    var file;
    var filename;
    var erro = null;
    if (req.files != null) {
        file = req.files.file
        filename = file.name
        file.mv('./public/files/' + filename, function (err) {
            if (err) {
                erro = err;
            }
        })
        if (erro != null) {
            res.status(200).send("Sucesso")
        }
    }
    else {
        res.status(400).send("imagem vazia")
    }
});

router.put('/:id', (req, res) => {
    var id = new mongo.ObjectID(req.params.id);
    var query = { _id: id };
    if (req.body != null && req.params != null) {
        produtos.updateOne(query, req.body).then(() => {
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
        produtos.deleteOne(query).then(() => {
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
    produtos.deleteMany().then(() => {
        res.status(200).send("Apagado com sucesso");
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

module.exports = router;

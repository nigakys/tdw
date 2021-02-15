var mongo = require("mongodb");
var express = require('express');
const users = require("../models/users");
var router = express.Router();

//erro 11000 duplicado
router.get('/', (req, res) => {
    users.find().then(result => {
        if (result != null) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send("Nada encontrado")
        }
    })
});


router.get('/:ref', (req, res) => {
    var ref = req.params.ref;
    var query = { ref: ref };
    if (req.params != null) {
        users.find(query).then(result => {
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
        
        users.create(req.body).then(() => {
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
        users.updateOne(query, req.body).then(() => {
            res.status(200).send("Atualizado com sucesso: " + JSON.stringify(req.body));
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
    else{
        res.status(400).send("Body ou Id nao enviados");
    }
})

router.delete('/:id', (req, res) => {
    var id = new mongo.ObjectID(req.params.id);
    var query = { _id: id };
    if (req.params.id != null) {
        users.deleteOne(query).then(() => {
            res.status(200).send("Apagado com sucesso");
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
    else{
        res.status(400).send("Id nao enviado");
    }
})

router.delete('/', (req, res) => {
    users.deleteMany().then(() => {
        res.status(200).send("Apagado com sucesso");
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

module.exports = router;

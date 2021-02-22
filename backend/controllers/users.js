var mongo = require("mongodb");
var express = require('express');
const users = require("../models/users");
var router = express.Router();
var functions = require("../shared/functions")

//erro 11000 duplicado
router.get('/:user', (req, res) => {
    var user = req.params.user;
    var query = { username: user }

    users.findOne(query).then(result => {
        if (result != null) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send("User nao existe")
        }
    })
});

router.get('/email/:email', (req, res) => {
    var email = req.params.email;
    var query = { email: email }

    users.findOne(query).then(result => {
        if (result == null) {
            res.status(200).send(email);
        }
        else {
            res.status(400).send("email ja existe")
        }
    }).catch(() => { res.status(400).send("Query error") })
});


router.post('/', (req, res) => {
    var pass = req.body.password;

    functions.hashPassword(pass).then((result) => {
        req.body.password = result
        if (req.body != null) {
            users.create(req.body)
                .then(() => {
                    res.status(200).send("User registado")
                })
                .catch((err) => {
                    if (err.code == "11000") {
                        res.status(400).send("User duplicado")
                    }
                })
        }
        else {
            res.status(400).send("Body sem valores")
        }
    })
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
    else {
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
    else {
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

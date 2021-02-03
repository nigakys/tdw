const { isAuthorized } = require("../middleware/auth.js");
var mongo = require('mongodb');
test
module.exports = function (app, collections) {
    var users = collections["users"];
    var items = collections["items"];

    app.use((req, res, next) => {
        users.find().toArray().then(result => {
            isAuthorized(req, res, next, result);
        })
    });

    app.get('/', (req, res) => {
        items.find().toArray().then(result => {
            res.status(200).send(result);
        })
    });

    app.get('/:id', (req, res) => {
        var id = new mongo.ObjectID(req.params.id);
        var query = { _id: id };
        items.findOne(query).then(result => {
            res.status(200).send(result);
        })
    });

    app.post('/', (req, res) => {
        items.insertOne(req.body, function (err, res) {
            if (err) res.status(400).send("Erro a inserir");
            else res.status(200).send("Produto inserido" + req.body);
        });

    })

    app.put('/:id', (req, res) => {
        var id = new mongo.ObjectID(req.params.id);
        var query = { _id: id };
        var values = { $set: req.body };

        items.updateOne(query, values, function (err, res) {
            if (err) throw err;
        });
        res.status(200).send("Item atualizado com sucesso");
    })

    app.delete('/:id', (req, res) => {
        var id = new mongo.ObjectID(req.params.id);
        var query = { _id: id };

        items.deleteOne(query, function (err, res) {
            if (err) {
                return err;               
            }
        });
        res.status(200).send("Item apagado com sucesso");
    })

    app.delete('/', (req, res) => {
        items.deleteMany(function (err, res) {
            if (err) {
                return err;
            }
        });
        res.status(200).send("Todos os items foram apagados")
    })
}

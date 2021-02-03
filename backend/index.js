const express = require("express");
const app = express();
const port = 4000;
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://pcarmo:pcarmo123@cluster-shard-00-00.jabin.mongodb.net:27017,cluster-shard-00-01.jabin.mongodb.net:27017,cluster-shard-00-02.jabin.mongodb.net:27017/db?ssl=true&replicaSet=atlas-610jb3-shard-0&authSource=admin&retryWrites=true&w=majority";
 test 
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
	if (err == null) {
		let collections = {
			"users": client.db("Db").collection("users"),
			"items": client.db("Db").collection("items")
		}

		require("./controllers/pratosDia")(app, collections);

		app.listen(port, () => console.log('App | Pedro Carmo'));
	}
});

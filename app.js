const config = require('./config.json')
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = config['uri'];

app.set('view engine', 'pug');
app.get('/', function(req, res) {res.render('index')});
app.get('/searching', function(req, res){
	var val = req.query.search;
	console.log(val);

	res.send("WHEEE");
});

app.get('/getTasks', (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect().then(() => {
		client.db("d1pseychatbot").collection("tasks").find({}).toArray().then(i => {
			client.close();
			res.send(i);
		});
	});
});

app.get('/addTask', (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect().then(() => {
		client.db("d1pseychatbot").collection("tasks").insertOne({"name": req.query.name}).then(() => {
			client.close();
			res.send();
		});
	});
});

app.get('/editTask', (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect().then(() => {
		client.db("d1pseychatbot").collection("tasks").updateOne({'name': req.query.before}, { $set: {'name': req.query.after}}).then(() => {
			client.close();
			res.send();
		});				
	});
});

app.get('/deleteTask', (req, res) => {
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect().then(() => {
		let a = new mongodb.ObjectID(req.query._id);
		client.db("d1pseychatbot").collection("tasks").deleteOne({"_id": a}).then(() => {
			client.close();
			res.send();
		});				
	});
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
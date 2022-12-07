const express = require('express')
const router = express.Router();

const mongodb = require("mongodb");
console.log("mongodb: ", mongodb);
const dbConnectionUrl = "mongodb+srv://geotalk:a4WgEpScBUD3fa5M@geotalk.68jkjje.mongodb.net/?retryWrites=true&w=majority";


// get Post

router.get('/', async (req, res) => {
	console.log("get received")
	const entries = await loadPostsCollection();
	res.send(await entries.find({}).toArray());
});
/*
// add Post

router.post('/', async (req, res) => {
	await loadPostsCollection(function(dbCollection){
		dbCollection.insertOne({
			text: req.body.text,
			health: 1,
			
		});
		
	});
	res.status(201).send();
	
});

//delete Post

router.delete("/:id", async(req, res)=> {
	await loadPostsCollection(function(dbCollection){
		//check the entry's health
		dbCollection.findOne({_id: new mongodb.ObjectID(req.params.id)}, function(err, result){
			if (err) throw err;
			if (result.health && result.health > 1){
				dbCollection.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$set: {health: result.health - 1}}, function(err, res){
					if (err) throw err;
				});
			}
			else{
				dbCollection.deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function(err, obj){
					if (err) throw err;
				});
			}
		});
	});
	
	res.status(200).send();
	
});
//add health to post
router.patch("/:id", async(req, res)=> {
	//checks to see if entry exists, if it does, add  health.
	await loadPostsCollection(function(dbCollection){
		dbCollection.findOne({_id: new mongodb.ObjectID(req.params.id)}, function(err, result){
			if (err) throw err;
			if (result){
				dbCollection.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$set: {health: result.health + 1}}, function(err, res){
					if (err) throw err;
				});
			}
		});
	});
	res.status(200).send();
});
*/
// get the collection from a database 

async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect( dbConnectionUrl, {useNewUrlParser: true});
	
	return client.db('geotalk').collection('entries');
}

module.exports = router;


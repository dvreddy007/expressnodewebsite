const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient

const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

let connectionString = 'mongodb+srv://venkat1:venkat1@cluster0.vgw4f.mongodb.net/<dbname>?retryWrites=true&w=majority';


// adding mongo client to get connected to mango db

MongoClient.connect(connectionString, (err, client) => {
  // ... do something here
  if (err) return console.error(err);
  console.log('Connected to Database');
  var db = client.db('testdb')
  var userCollection = db.collection('userdetails')
	 app.post('/userdetails', (req, res) => {
	  console.log('user details are ....'); 
	  console.log(req.body);
	  userCollection.insertOne(req.body)
		.then(result => {
		  console.log(result)
		  res.redirect('/userform');
		})
		.catch(error => console.error(error))
	});
})



//app.use('views', __dirname);

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


router.get('/userform',function(req,res){
  res.sendFile(path.join(__dirname+'/userform.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
  //__dirname : It will resolve to your project folder.
});


app.use('/', router);
app.listen(process.env.port || 3200);

console.log('Running at Port 3200');

module.exports = app;
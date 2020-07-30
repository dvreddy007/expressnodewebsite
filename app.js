const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient

const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')

let connectionString = 'mongodb+srv://venkat1:venkat1@cluster0.vgw4f.mongodb.net/testdb?retryWrites=true&w=majority';


// adding mongo client to get connected to mango db
/*
const uri = "mongodb+srv://venkat1:venkat1@cluster0.cn8fi.mongodb.net/testdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
}, { useNewUrlParser: true,
    useUnifiedTopology: true, });
client.connect(err => {
  let collection = client.db("gqrsdb").collection("userdetails");
  console.log('Connected to Database');
  // perform actions on the collection object
		app.post('/userdetails', (req, res) => {
		  console.log('user details are ....'); 
		  console.log(req.body);
		  collection.insertOne(req.body)
			.then(result => {
			  console.log(result)
			  // res.redirect('/userform');
			  // res.render('/views/userform.ejs', { userdetails: results })
			  
			})
			.catch(error => console.error(error))
		});
		app.get('/userdetails', (req, res) => {
		  client.db("gqrsdb").collection('userdetails').find().toArray()
			.then(results => {
				console.log(JSON.stringify(userdetails));
			  res.render('/views/userform.ejs', { userdetails: results })
			})
			.catch()
		})
  client.close();
});
*/
MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
	var db = client.db('testdb')
	  var userCollection = db.collection('userdetails')
		 app.post('/userdetails', (req, res) => {
		  console.log('user details are ....'); 
		  console.log(req.body);
		  userCollection.insertOne(req.body)
			.then(result => {
			  console.log(result)
			  res.redirect('/views/userform');
			  //res.render('/views/userform.ejs', { userdetails: results })
			  
			})
			.catch(error => console.error(error))
		});
		
		app.get('/views/userform', (req, res) => {
		  db.collection('userdetails').find().toArray()
			.then(results => {
				console.log(results);
			  res.render('userform.ejs', { userdetails: results })
			})
			.catch()
		})
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
var express = require('express'),
app         = express(),
mongoose   = require('mongoose'),
bodyParser  = require('body-parser');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//set database
mongoose.connect('mongodb://localhost/blog_app', {useMongoClient: true});
mongoose.Promise = global.Promise;

//Create Schema
var schema = new mongoose.Schema({
    name: String,
    image: String,
    content: String
});

var Blog = mongoose.model('Blog', schema);
//RESTful Routes
app.get('/', function(req, res){
    res.redirect('/blogs');
});

//INDEX route
app.get('/blogs', function(req,res){
    res.render('index');
});

//starting Server on localhost
app.listen('3000', function(){
    console.log("Blog App running on http://localhost:3000");
});
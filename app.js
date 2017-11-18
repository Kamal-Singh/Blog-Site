var express     = require('express'),
app             = express(),
mongoose        = require('mongoose'),
bodyParser      = require('body-parser'),
methodOverride = require('method-override');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//set database
mongoose.connect('mongodb://localhost/blog_app', {useMongoClient: true});
mongoose.Promise = global.Promise;

//Create Schema
var schema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', schema);
//RESTful Routes
app.get('/', function(req, res){
    res.redirect('/blogs');
});

//INDEX route
app.get('/blogs', function(req,res){
    Blog.find({}, function(err ,blogs){
        if(err)
            {
                console.log(err);
            } else {
                res.render('index', {blogs: blogs});               
            }
    })
});

//NEW Route
app.get('/blogs/new' ,function(req, res){
    res.render('new');
})
//CREATE route
app.post('/blogs', function(req, res){
    Blog.create(req.body.blog, function(err, newblog){
        if(err)
            {
                res.render('new');
            }
            else{
                res.redirect('/blogs');
            }
    });
});
//SHOW route
app.get('/blogs/:id', function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    })
});

//EDIT Route
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.render('show', {blog: foundBlog});
        }   else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

//UPDATE Route
app.put('/blogs/:id' ,function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err) {
            res.redirect('/blogs/'+req.params.id);
        } else {
            res.redirect('/blogs/'+req.params.id);
        }
    });
});

//DELETE Route
app.delete('/blogs/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, deletedBlog){
        if(err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});

//starting Server on localhost
app.listen('3000', function(){
    console.log("Blog App running on http://localhost:3000");
});
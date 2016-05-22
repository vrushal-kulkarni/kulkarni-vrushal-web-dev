/**
 * Created by Vrushal on 5/16/2016.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanblogs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/post", findAllPosts);
app.post("/api/post", createPost);
app.delete("/api/post/:id", removePost);

 var posts=[];

var PostSchema=mongoose.Schema({
    title:String,
    body:String
});

var PostModel=mongoose.model("PostModel", PostSchema);

function createPost(req, res) {
    var post=req.body;
    //posts.push(post);
    PostModel.create(post)
        .then(function (doc) {
            posts.push(doc);
            res.json(posts);
        })
}

function removePost(req,res){
    var id=req.params.id;
    PostModel.remove({_id:id})
        .then(function (stat) {
            findAllPosts(req,res);
        });
    //posts.splice(index,1);
    //res.json(posts);
}

function findAllPosts(req,res){
    PostModel
        .find()
        .then(function (docs) {
            posts=docs;
            res.send(posts);
        })
}

app.listen(3000);
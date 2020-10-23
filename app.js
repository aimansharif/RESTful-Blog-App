var bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    mongoose         = require("mongoose"),
    expressSanitizer = require("express-sanitizer"); 
    express          = require("express"),
    app              = express();

// APP CONFIG - instead of this
// mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
// var url = process.env.DATABASEURL || "mongodb://localhost:27017/restful_blog_app";

// export DATABASEURL=mongodb://localhost:27017/restful_blog_app "from cmd"
// console.log("DATABASEURL: " + url); // To see the url

// USE
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}); 
//process.env.DATABASEURL = mongodb://localhost:27017/restful_blog_app (local)
//process.env.DATABASEURL = mongodb+srv://aiman:aimansharif@blog-app-flysp.mongodb.net/test?retryWrites=true&w=majority (MongoAtlas environment variable)

// APP CONFIG
// mongoose.connect("mongodb+srv://aiman:aimansharif@blog-app-flysp.mongodb.net/test?retryWrites=true&w=majority", 
//     {useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }).then(() => {
//     console.log("Connected to DB!");
// }).catch(err => {
//     console.log("ERROR: ", err.message);
// });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//blogSchema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
});

//MONGOOSE/MODEL CONFIG
var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

//Default Route
app.get("/", function (req, res) {
    res.redirect("blogs");    
});

//INDEX ROUTE
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("Error");
        }    
        else {
            res.render("index", { blogs: blogs });
        }
    });    
});

//NEW ROUTE
app.get("/blogs/new", function (req, res) {
    res.render("new");    
});

//CREATE ROUTE
app.post("/blogs", function (req, res) {
    //create blog and sanitize: removes risky malicious javascript input from user 
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            //redirect to the index page
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", { blog: foundBlog });
        }
    })    
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
//PUT updates the blog
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    //Destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    });
});

// Port that the server is listening on
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("PORT: " + port);
    console.log("Server listening on port " + port);    
});

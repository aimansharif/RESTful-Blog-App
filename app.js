var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app = express();
    
//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//blogSchema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
});

//MONGOOSE/MODEL CONFIG
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog", 
//     image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=787&q=80",
//     body: "Hello this is a blog post"
// });

//RESTFUL ROUTES
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
    //create blog
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new");
        }    
        else {
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


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening on port 3000");    
});
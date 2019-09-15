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
    created: { type: Date, default: Date.now }
});

//MONGOOSE/MODEL CONFIG
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog", 
//     image: "https://images.unsplash.com/photo-1496871455396-14e56815f1f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
//     body: "Hello this is a blog post"
// });

//RESTFUL ROUTES
app.get("/", function (req, res) {
    res.redirect("blogs");    
});

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

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening on port 3000");    
});
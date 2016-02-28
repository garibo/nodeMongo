var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./router_app");

var app  = express();

app.use('/estatico', express.static('public'));
app.use(express.static('assets'));
app.use(bodyParser.json()); //para peticiones aplication/json
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: "123456hub",
	resave: false,
	saveuninitialized: false
}));

app.set("view engine","jade");

app.get("/",function(req,res) {
	res.render("index");
	console.log(req.session.user_id);
});

app.get("/signup",function(req,res) {
	User.find(function(err,doc){
	console.log(doc);
	res.render("signup");
	});
});

app.get("/login",function(req,res) {
	res.render("login");
});

app.post("/users",function(req,res) {
	var user = new User({
		email: req.body.email, 
		password: req.body.password, 
		password_confirmation: req.body.password_confirmation, 
		username: req.body.username
	});

	user.save().then(function(us){
		res.send("Guardamos el usuario exitosamente");
	},function(err){
		if(err)
		{
			console.log(String(err));
			res.send("No pudimos  guardar la informacion");
		}
	});
});


app.post("/sessions",function(req,res) {
	User.findOne({email: req.body.email, password: req.body.password}, function(err,user){
		req.session.user_id = user._id;
		res.send("Hola mundo");
	})
});

app.use("/app", router_app);

app.listen(8080);
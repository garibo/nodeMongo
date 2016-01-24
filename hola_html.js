var http = require("http");
var fs 	 = require("fs");

http.createServer(function(req, res){
	fs.readFile("./index.html",function(err,html){
		res.writeHead(200,{"Content-Type":"application/json"});
		res.write(JSON.stringify([{nombre: "Kevin", email:"garibokevin@gmail.com"}]));
		res.end();
	});
}).listen(8080);

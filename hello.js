var http = require("http");

var servidor = http.createServer(manejador);
servidor.listen(8080);

var manejador = function(policitud, respuesta){
	console.log("Hola mundo");
	respuesta.end("Recibimos una nueva peticion - HOLA MUNDO");
};

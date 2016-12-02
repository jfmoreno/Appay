var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var usuarios = require('./usuarios'); //Obtengo el archivo js de usuarios
var productos = require('./productos'); //Obtengo el archivo js de productos
var tiendas = require('./tiendas'); //Obtengo el archivo js de tiendas
var facturas = require('./facturas'); //Obtengo el archivo js de facturas
var municipios = require('./municipios'); //Obtengo el archivo js de municipios
var provincias = require('./provincias'); //Obtengo el archivo js de provincias
var comunidades = require('./comunidades'); //Obtengo el archivo js de comunidades


var connection = mysql.createConnection({ //Conexion a la BBDD de MySQL
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'Appay_bbdd',
		multipleStatements: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Llamo a los metodos de la clase usuario
usuarios.getUsuarios(app, connection);
usuarios.postUsuarios(app, connection); 
usuarios.updateUsuarios(app, connection); 


//Llamo a los metodos de la clase productos
productos.getProductos(app, connection);
productos.postProductos(app, connection);
productos.updateProductos(app, connection);


//Llamo a los metodos de la clase tiendas
tiendas.getTiendas(app, connection);
tiendas.postTiendas(app, connection);
tiendas.updateTiendas(app, connection);
tiendas.postGranSuperficie(app, connection);
tiendas.getGranSuperficie(app, connection);
tiendas.updateGranSuperficie(app, connection);
tiendas.getCoordenadas(app, connection);

//Llamo a los metodos de la clase facturas
facturas.getFacturas(app, connection);
facturas.getFacturasUsuarios(app, connection);
facturas.postFacturas(app, connection);
facturas.updateFacturas(app, connection);

//Llamos a los metodos de la clase municipios
municipios.getMunicipios(app, connection);

//Llamo a los metodos de la clase provincias
provincias.getProvincias(app, connection);

//Llamo a los metodos de la clase comunidades
comunidades.getComunidades(app, connection);


//Mensaje de que se esta conectando el puerto
http.listen(8080,function(){
	console.log("Conectado y escuchando en el puerto 8080");
});
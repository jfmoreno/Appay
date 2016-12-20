var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

//Funcion que genera el get de productos
router.get('/',comprobacionjwt,function(req,res){	
	db.getConnection(function(err, connection) {
		if (err) throw err;
		var data = {
			"Productos":""
		};
		var id = connection.escape(req.query.id); //Variable que recoje el id de los productos de la URI productos?id={num}
		console.log(id);
		var codigo = connection.escape(req.query.codigo); //Variable que recoje el codigo de barras de los productos de la URI productos?codigo={num}
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT producto.Id_producto, producto_tienda.Id_producto_tienda, producto.Codigo, producto.Nombre, producto.Precio, producto.Imagen, producto.Descripcion, producto.Stock, producto.URL_video, producto.Estado  FROM producto, tienda, producto_tienda WHERE producto.Id_producto = producto_tienda.Id_producto AND producto_tienda.Id_tienda = tienda.Id_tienda AND tienda.Id_tienda="+id;
		}else if(codigo !='NULL'){ //Si en la URI existe se crea la consulta de busqueda por codigo de barras
			var consulta="SELECT * FROM producto WHERE codigo="+codigo;
		}else{ //Si no muestra todos los productos
			var consulta = "SELECT * FROM producto";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Productos"] = rows;
				res.json(data);
				res.status(200);
				
			}else{
				data["Productos"] = 'No hay productos';
				res.json(data);
			}
		});
	connection.release();
	});
});

//Funcion que genera el POST de Productos
router.post('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		if (err) throw err;
		var Codigo = connection.escape(req.body.codigo);
		var Nombre = connection.escape(req.body.nombre);
		var Precio = connection.escape(req.body.precio);
		var Imagen = connection.escape(req.body.imagen);
		var Descripcion = connection.escape(req.body.descripcion);
		var Stock = connection.escape(req.body.stock);
		var URL_video = connection.escape(req.body.url_video);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var data = {
			"Productos":""
		};
		var consulta = "INSERT INTO producto (";
		var i=0;
		if(Nombre != 'NULL'){
			consulta  += "Nombre";
			i++;
		}
		if(Codigo != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Codigo";
			i++;
		}
		if(Precio != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Precio";
			i++;
		}
		if(Imagen != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Imagen";
			i++;
		}
		if(Descripcion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Descripcion";
			i++;
		}
		if(Stock != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Stock";
			i++;
		}
		if(URL_video != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "URL_video";
			i++;
		}
		
		consulta+=", Estado, Eliminado) VALUES (";
		var i=0;
		if(Nombre != 'NULL'){
			consulta  += Nombre;
			i++;
		}
		if(Codigo != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Codigo;
			i++;
		}
		if(Precio != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Precio;
			i++;
		}
		if(Imagen != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Imagen;
			i++;
		}
		if(Descripcion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Descripcion;
			i++;
		}
		
		if(Stock != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Stock;
			i++;
		}
		if(URL_video != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += URL_video;
			i++;
		}
	
		consulta+=", '1', '0')";
		connection.query(consulta,function(err, rows, fields){
			if(err){
				res.status(400).json({ error: err });
				console.log(err);
			}else{
				var Id_producto = rows.insertId; //Cojemos el id del producto para insertarlo en la tienda
				//Tengo que insertar en producto_tienda el producto para asociarla a una tienda
				var consulta2="INSERT INTO producto_tienda (Id_tienda, Id_producto) VALUES("+Id_tienda+","+Id_producto+")";
				connection.query(consulta2,function(err, rows, fields){
					if(err){
						res.status(400).json({ error: err });
						console.log(err);
					}else{
						data["Productos"] = "Datos insertados correctamente!";
						res.status(200);
					}
					res.json(data);
				});
			}
		});
	connection.release();
	});
});


//Funcion que genera el PUT (Update) de Productos
router.put('/',comprobacionjwt,function(req,res){
	console.log("VA GUAY");
	db.getConnection(function(err, connection) {
		if (err) throw err;
		var ID = connection.escape(req.body.id);
		var Codigo = connection.escape(req.body.codigo);
		var Nombre = connection.escape(req.body.nombre);
		var Precio = connection.escape(req.body.precio);
		var Imagen = connection.escape(req.body.imagen);
		var Descripcion = connection.escape(req.body.descripcion);
		var Stock = connection.escape(req.body.stock);
		var URL_video = connection.escape(req.body.url_video);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var data = {
			"Productos":""
		};
			if(ID == "''"){
				ID = "null.null.null"
			}
			var consulta = "UPDATE producto SET ";
			if(ID != 'NULL'){
				if(Codigo != 'NULL'){
					consulta = consulta + "Codigo="+Codigo;
				}
				if(Nombre != 'NULL'){
					consulta = consulta + " Nombre="+Nombre;
				}
				if(Precio != 'NULL'){
					consulta = consulta + " Precio="+Precio;
				}
				if(Imagen != 'NULL'){
					consulta = consulta + " Imagen="+Imagen;
				}
				if(Descripcion != 'NULL'){
					consulta = consulta + " Descripcion="+Descripcion;
				}
				if(Stock != 'NULL'){
					consulta = consulta + " Stock="+Stock;
				}
				if(URL_video != 'NULL'){
					consulta = consulta + " URL_video="+URL_video;
				}
				if(Estado != 'NULL'){
					consulta = consulta + " Estado="+Estado;
				}
				if(Eliminado != 'NULL'){
					consulta = consulta + " Eliminado="+Eliminado;
				}
				
				consulta = consulta + " WHERE Id_producto="+ID;
				console.log(consulta);
				
				
			}

			connection.query(consulta,function(err, rows, fields){
					if(err){
						res.status(400).json({ error: err });
						console.log(err);
					}else{
						data["Productos"] = "Actualizado correctamente!";
						res.status(200);
					}
					res.json(data);
				});
			
	connection.release();
	});		
});



module.exports = router; 
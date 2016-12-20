var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

//GET de tiendas
router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var data = {
			"Tiendas":""
		};

		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la URI tienda?id={num}
        console.log(id);
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT t.Id_Tienda, t.NIF, t.Nombre, t.Direccion, m.Municipio, p.Provincia, c.Comunidad, t.Latitud, t.Longitud, t.Id_gran_superficie, t.Estado, t.Eliminado FROM tienda t  JOIN municipios m ON t.Municipio=m.Id JOIN comunidades c ON t.Comunidad=c.Id JOIN provincias p ON t.Provincia=p.Id WHERE Id_Tienda="+id;
		}else{ //Si no muestra todas las tiendas
			var consulta = "SELECT t.Id_Tienda, t.NIF, t.Nombre, t.Direccion, m.Municipio, p.Provincia, c.Comunidad, t.Latitud, t.Longitud, t.Id_gran_superficie, t.Estado, t.Eliminado FROM tienda t  JOIN municipios m ON t.Municipio=m.Id JOIN comunidades c ON t.Comunidad=c.Id JOIN provincias p ON t.Provincia=p.Id";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Tiendas"] = rows;
				res.status(200);
			}else{
				data["Tiendas"] = 'No hay tiendas';
			}
			res.json(data);
		});
	connection.release();
	});
});

//post de tiendas
router.post('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
    if (err) throw err;
		var Nombre = connection.escape(req.body.nombre);
		var Direccion = connection.escape(req.body.direccion);
		var Provincia = connection.escape(req.body.provincia);
		var Localidad = connection.escape(req.body.localidad);
		var Comunidad = connection.escape(req.body.comunidad);
		var Longitud = connection.escape(req.body.longitud);
		var Latitud = connection.escape(req.body.latitud);
		var ID_granSuperficie = connection.escape(req.body.gransuperficie);
		var NIF = connection.escape(req.body.nif);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Tiendas":""
		};
		var consulta = "INSERT INTO tienda (";
		var i=0;
		if(Nombre != 'NULL'){
			consulta  += "Nombre";
			i++;
		}
		if(Direccion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Direccion";
			i++;
		}
		if(Provincia != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Provincia";
			i++;
		}
		if(Localidad != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Municipio";
			i++;
		}
		if(Comunidad != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Comunidad";
			i++;
		}
		if(Longitud != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Longitud";
			i++;
		}
		if(Latitud != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "Latitud";
			i++;
		}
		if(ID_granSuperficie != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "id_gran_superficie";
			i++;
		}
		if(NIF != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "NIF";
			i++;
		}
		if(Estado != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Estado";
			i++;
		}
		if(Eliminado != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Eliminado";
			i++;
		}
		consulta+=") VALUES (";
		var i=0;
		if(Nombre != 'NULL'){
			consulta  += Nombre;
			i++;
		}
		if(Direccion != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Direccion;
			i++;
		}
		if(Provincia != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Provincia;
			i++;
		}
		if(Localidad != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Localidad;
			i++;
		}
		if(Comunidad != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Comunidad;
			i++;
		}
		if(Longitud != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Longitud;
			i++;
		}
		if(Latitud != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Latitud;
			i++;
		}
		if(ID_granSuperficie != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += ID_granSuperficie;
			i++;
		}
		if(NIF != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += NIF;
			i++;
		}
		if(Estado != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Estado;
			i++;
		}
		if(Eliminado != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Eliminado;
			i++;
		}
		consulta+=")"
		connection.query(consulta,function(err, rows, fields){
			if(err){
				res.status(400).json({ error: err });
				console.log(err);
			}else{
				data["Tiendas"] = "Datos insertados correctamente!";
				res.status(200);
			}
			res.json(data);
		});
	connection.release();
	});
});


//put de tiendas
router.put('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
    	var ID = connection.escape(req.body.id_tienda);
		var Nombre = connection.escape(req.body.nombre);
		var Direccion = connection.escape(req.body.direccion);
		var Provincia = connection.escape(req.body.provincia);
		var Localidad = connection.escape(req.body.localidad);
		var Comunidad = connection.escape(req.body.comunidad);
		var Longitud = connection.escape(req.body.longitud);
		var Latitud = connection.escape(req.body.latitud);
		var ID_granSuperficie = connection.escape(req.body.gransuperficie);
		var NIF = connection.escape(req.body.nif);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Tiendas":""
		};
		var consulta = "UPDATE tienda SET ";
		var i = 0;

			if(ID == "''"){
				ID = "null.null.null"
			}
			
			if(ID != 'NULL'){
				if(Nombre != 'NULL'){
					consulta  += "Nombre="+Nombre;
					i++;
				}
				if(Direccion != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Direccion="+Direccion;
					i++;
				}
				if(Provincia != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Provincia="+Provincia;
					i++;
				}
				if(Localidad != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Municipio="+Localidad;
					i++;
				}
				if(Comunidad != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Comunidad="+Comunidad;
					i++;
				}
				if(Longitud != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Longitud="+Longitud;
					i++;
				}
				if(Latitud != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Latitud="+Latitud;
					i++;
				}
				if(ID_granSuperficie != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "id_gran_superficie="+ID_granSuperficie;
					i++;
				}
				if(NIF != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "NIF="+NIF;
					i++;
				}
				if(Estado != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Estado="+Estado;
					i++;
				}
				if(Eliminado != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Eliminado="+Eliminado;
					i++;
				}
				
				consulta = consulta + " WHERE Id_Tienda="+ID;
			}
			console.log(consulta);
		connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
					console.log(err);
				}else{
 					data["Tiendas"] = "Actualizado correctamente!";
					res.status(200);
				}
				res.json(data);
		});
	connection.release();
	});
});


//Genera el GET de gransuperficie
router.get('/gransuperficie',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var data = {
			"Tiendas":""
		};

		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la URI tienda?id={num}
	
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT * FROM gran_superficie WHERE Id_gran_superficie="+id;
		}else{ //Si no muestra todos las grandes superficies
			var consulta = "SELECT * FROM gran_superficie";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Tiendas"] = rows;
				res.json(data);
				res.status(200);
				
			}else{
				data["Tiendas"] = 'No hay grandes superficies';
				res.json(data);
			}
		});   

	connection.release();
	});
});


//POST de gransuperficie
router.post('/gransuperficie',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var Nombre = connection.escape(req.body.nombre);
		var Imagen = connection.escape(req.body.imagen);
		
		var data = {
			"Tiendas":""
		};
		if(Nombre && Imagen){
			var consulta = "INSERT INTO gran_superficie (";
				var i=0;
				if(Nombre != 'NULL'){
					consulta  += "Nombre";
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

				consulta+=") VALUES (";
				var i=0;
				if(Nombre != 'NULL'){
					consulta  += Nombre;
					i++;
				}
				if(Imagen != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += Imagen;
					i++;
				}
				consulta+=")";
			
			connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
					console.log(err);
				}else{
					data["Tiendas"] = "Datos insertados correctamente!";
					res.json(data);
					res.status(200);
				}
			});

		}else{
			data["Tiendas"] = "Porfavor introduce todos los campos";
			res.json(data);
		}        
	connection.release();
	});
});

//PUT de gransuperficie
router.put('/gransuperficie',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
    	var ID = connection.escape(req.body.id);
		var Nombre = connection.escape(req.body.nombre);
		var Imagen = connection.escape(req.body.imagen);
		var data = {
			"Tiendas":""
		};

		var consulta = "UPDATE gran_superficie SET ";
			if(ID != 'NULL'){
				var i = 0;
				if(Nombre != 'NULL'){
					consulta  += "Nombre="+Nombre;
					i++;
				}
				if(Imagen != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Imagen="+Imagen;
					i++;
				}
				
				consulta = consulta + " WHERE Id_gran_superficie="+ID;
			}

		connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
					console.log(err);
				}else{
					data["Tiendas"] = "Actualizado correctamente!";
					res.status(200);
				}
				res.json(data);
		});        

	connection.release();
	});
});


//Devuelve la visualizacion de las coordenadas
router.get('/coordenadas',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var data = {
			"Tiendas":""
		};

		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la URI tienda?id={num}
        console.log(id);
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT Latitud, Longitud FROM tienda WHERE Id_tienda="+id;
		}else{ //Si no muestra todas las tiendas
			var consulta = "SELECT Latitud, Longitud FROM tienda";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Tiendas"] = rows;
				res.status(200);	
			}else{
				data["Tiendas"] = 'No hay grandes superficies';
			}
			res.json(data);	
		});
	connection.release();
	});
});

module.exports = router;
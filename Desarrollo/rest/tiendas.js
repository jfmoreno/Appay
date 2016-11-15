/***************************************************************************
 ***************************************************************************
 ***** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LAS TIENDAS *****
 ***************************************************************************
 **************************************************************************/

//Funcion que genera el GET de Tiendas
function getTiendas (app, connection) {
    app.get('/tiendas',function(req,res){
		var data = {
			"Errores":1,
			"Tiendas":""
		};

		var id = req.query.id; //Variable que recoje el id de la tienda de la URI tienda?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT t.Id_Tienda, t.NIF, t.Nombre, t.Direccion, m.Municipio, p.Provincia, c.Comunidad, t.Latitud, t.Longitud, t.Id_gran_superficie, t.Estado, t.Eliminado FROM tienda t  JOIN municipios m ON t.Municipio=m.Id JOIN comunidades c ON t.Comunidad=c.Id JOIN provincias p ON t.Provincia=p.Id WHERE Id_Tienda="+id;
		}else{ //Si no muestra todos los usuarios
			var consulta = "SELECT t.Id_Tienda, t.NIF, t.Nombre, t.Direccion, m.Municipio, p.Provincia, c.Comunidad, t.Latitud, t.Longitud, t.Id_gran_superficie, t.Estado, t.Eliminado FROM tienda t  JOIN municipios m ON t.Municipio=m.Id JOIN comunidades c ON t.Comunidad=c.Id JOIN provincias p ON t.Provincia=p.Id";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Tiendas"] = rows;
				res.json(data);
				
			}else{
				data["Tiendas"] = 'No hay tiendas';
				res.json(data);
			}
		});
	});
}

//Funcion que genera el POST de Tiendas
function postTiendas (app, connection){
	app.post('/tiendas',function(req,res){
		var Nombre = req.body.nombre;
		var Direccion = req.body.direccion;
		var Provincia = req.body.provincia;
		var Localidad = req.body.localidad;
		var Comunidad = req.body.comunidad;
		var Longitud = req.body.longitud;
		var Latitud = req.body.latitud;
		var ID_granSuperficie = req.body.gransuperficie;
		var NIF = req.body.nif;
		var Estado = req.body.estado;
		var Eliminado = req.body.eliminado;
		var data = {
			"Errores":1,
			"Tiendas":""
		};
		var consulta = "INSERT INTO facturas (";
		var i=0;
		if(Nombre != null){
			consulta  += "'Nombre='";
			i++;
		}
		if(Direccion != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Direccion'";
			i++;
		}
		if(Provincia != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Provincia'";
			i++;
		}
		if(Localidad != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Localidad'";
			i++;
		}
		if(Comunidad != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Comunidad'";
			i++;
		}
		if(Longitud != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Longitud'";
			i++;
		}
		if(Latitud != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Latitud'";
			i++;
		}
		if(ID_granSuperficie != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'id_gran_superficie'";
			i++;
		}
		if(NIF != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'NIF'";
			i++;
		}
		if(Estado != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Estado'";
			i++;
		}
		if(Eliminado != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Eliminado'";
			i++;
		}
		consulta+=") VALUES (";
		var i=0;
		if(Nombre != null){
			consulta  += "'"+Nombre+"'";
			i++;
		}
		if(Direccion != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Direccion+"'";
			i++;
		}
		if(Provincia != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Provincia+"'";
			i++;
		}
		if(Localidad != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Localidad+"'";
			i++;
		}
		if(Comunidad != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Comunidad+"'";
			i++;
		}
		if(Longitud != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Longitud+"'";
			i++;
		}
		if(Latitud != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Latitud+"'";
			i++;
		}
		if(ID_granSuperficie != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Id_gran_superficie+"'";
			i++;
		}
		if(NIF != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+NIF+"'";
			i++;
		}
		if(Estado != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Estado+"'";
			i++;
		}
		if(Eliminado != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Eliminado+"'";
			i++;
		}
		consulta+=")"
		connection.query(consulta,function(err, rows, fields){
			if(err){
				data["Tiendas"] = "Error: puede que algun campo este mal introducido";
				console.log(err);
			}else{
				data["Errores"] = 0;
				data["Tiendas"] = "Datos insertados correctamente!";
				res.json(data);
			}
		});
	});
}


//Funcion que genera el PUT (Update) de Tiendas
function updateTiendas (app, connection){
	app.put('/tiendas',function(req,res){
    	var ID = req.body.id;
		var Nombre = req.body.nombre;
		var Direccion = req.body.direccion;
		var Provincia = req.body.provincia;
		var Localidad = req.body.localidad;
		var Comunidad = req.body.comunidad;
		var Longitud = req.body.longitud;
		var Latitud = req.body.latitud;
		var ID_granSuperficie = req.body.gransuperficie;
		var NIF = req.body.nif;
		var Estado = req.body.estado;
		var Eliminado = req.body.eliminado;
		var data = {
			"Errores":1,
			"Tiendas":""
		};
		var consulta = "UPDATE tienda SET ";
		var i = 0;
			if(ID != null){
				if(Nombre != null){
					consulta  += "Nombre='"+Nombre+"'";
					i++;
				}
				if(Direccion != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Direccion='"+Direccion+"'";
					i++;
				}
				if(Provincia != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Provincia='"+Provincia+"'";
					i++;
				}
				if(Localidad != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Localidad='"+Localidad+"'";
					i++;
				}
				if(Comunidad != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Comunidad='"+Comunidad+"'";
					i++;
				}
				if(Longitud != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Longitud='"+Longitud+"'";
					i++;
				}
				if(Latitud != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Latitud='"+Latitud+"'";
					i++;
				}
				if(ID_granSuperficie != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "id_gran_superficie='"+ID_granSuperficie+"'";
					i++;
				}
				if(NIF != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "NIF='"+NIF+"'";
					i++;
				}
				if(Estado != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Estado='"+Estado+"'";
					i++;
				}
				if(Eliminado != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Eliminado='"+Eliminado+"'";
					i++;
				}
				
				consulta = consulta + " WHERE Id_Tienda="+ID;
				console.log(consulta);
			}

		connection.query(consulta,function(err, rows, fields){
				if(err){
					data["Tiendas"] = "Error al actualizar datos compruebe que los datos estan bien introducidos";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Tiendas"] = "Actualizado correctamente!";
				}
				res.json(data);
		});
	});
}


//Funcion que genera el GET de Grandes superficies
function getGranSuperficie (app, connection) {
    app.get('/tiendas/gransuperficie',function(req,res){
		var data = {
			"Errores":1,
			"Tiendas":""
		};

		var id = req.query.id; //Variable que recoje el id de la tienda de la URI tienda?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT * FROM gran_superficie WHERE Id_gran_superficie="+id;
		}else{ //Si no muestra todos las grandes superficies
			var consulta = "SELECT * FROM gran_superficie";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Tiendas"] = rows;
				res.json(data);
				
			}else{
				data["Tiendas"] = 'No hay grandes superficies';
				res.json(data);
			}
		});
	});
}

//Funcion que genera el POST de Grandes superficies
function postGranSuperficie (app, connection){
	app.post('/tiendas/gransuperficie',function(req,res){
		var Nombre = req.body.nombre;
		var Imagen = req.body.imagen;
		
		var data = {
			"Errores":1,
			"Tiendas":""
		};
		if(Nombre && Imagen){
			connection.query("INSERT INTO gran_superficie VALUES('',?,?)",[Nombre, Imagen],function(err, rows, fields){
				if(err){
					data["Tiendas"] = "Error: puede que algun campo este mal introducido";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Tiendas"] = "Datos insertados correctamente!";
					res.json(data);
				}
			});

		}else{
			data["Tiendas"] = "Porfavor introduce todos los campos";
			res.json(data);
		}
	});
}


//Funcion que genera el PUT (Update) de Grandes superficies
function updateGranSuperficie (app, connection){
	app.put('/tiendas/gransuperficie',function(req,res){
    	var ID = req.body.id;
		var Nombre = req.body.nombre;
		var Imagen = req.body.imagen;
		var data = {
			"Errores":1,
			"Tiendas":""
		};

		var consulta = "UPDATE gran_superficie SET ";
			if(ID != null){
				
				if(Nombre != null){
					consulta = consulta + "Nombre='"+Nombre+"'";
				}
				if(Imagen != null){
					consulta = consulta + " Imagen='"+Imagen+"'";
				}
				
				consulta = consulta + " WHERE Id_gran_superficie="+ID;
				console.log(consulta);
			}


		connection.query(consulta,function(err, rows, fields){
				if(err){
					data["Tiendas"] = "Error al actualizar datos compruebe que los datos estan bien introducidos";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Tiendas"] = "Actualizado correctamente!";
				}
				res.json(data);
		});
	});


}

//Metodo que permite la visualizacion de las coordenadas
function getCoordenadas(app, connection){
	  app.get('/tiendas/coordenadas',function(req,res){
		var data = {
			"Errores":1,
			"Tiendas":""
		};

		var id = req.query.id; //Variable que recoje el id de la tienda de la URI tienda?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT Latitud, Longitud FROM tienda WHERE Id_tienda="+id;
		}else{ //Si no muestra todas las tiendas
			var consulta = "SELECT Latitud, Longitud FROM tienda";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Tiendas"] = rows;
				res.json(data);				
			}else{
				data["Tiendas"] = 'No hay grandes superficies';
				res.json(data);
			}
		});
	});
}



exports.getTiendas = getTiendas;
exports.postTiendas = postTiendas;
exports.updateTiendas = updateTiendas;
exports.postGranSuperficie = postGranSuperficie;
exports.getGranSuperficie = getGranSuperficie;
exports.updateGranSuperficie = updateGranSuperficie;
exports.getCoordenadas = getCoordenadas;
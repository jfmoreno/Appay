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
			var consulta="SELECT * FROM tienda WHERE Id_Tienda="+id;
		}else{ //Si no muestra todos los usuarios
			var consulta = "SELECT * FROM tienda";
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
		var data = {
			"Errores":1,
			"Tiendas":""
		};
		if(Nombre && Direccion && Provincia && Localidad && Comunidad && Longitud && Latitud && ID_granSuperficie){
			connection.query("INSERT INTO tienda VALUES('',?,?,?,?,?,?,?,?)",[Nombre, Direccion, Provincia, Localidad, Comunidad, Longitud, Latitud, ID_granSuperficie],function(err, rows, fields){
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
		var data = {
			"Errores":1,
			"Tiendas":""
		};

		var consulta = "UPDATE tienda SET ";
		var sets = [];
		var i = 0;
			if(ID != null){
				if(Nombre != null){
					sets[i]  = "Nombre='"+Nombre+"'";
					i++;
				}
				if(Direccion != null){
					sets[i]  = "Direccion='"+Direccion+"'";
					i++;
				}
				if(Provincia != null){
					sets[i]  = "Provincia='"+Provincia+"'";
					i++;
				}
				if(Localidad != null){
					sets[i]  = "Localidad='"+Localidad+"'";
					i++;
				}
				if(Comunidad != null){
					sets[i]  = "Comunidad='"+Comunidad+"'";
					i++;
				}
				if(Longitud != null){
					sets[i]  = "Longitud='"+Longitud+"'";
					i++;
				}
				if(Latitud != null){
					sets[i]  = "Latitud='"+Latitud+"'";
					i++;
				}
				if(ID_granSuperficie != null){
					sets[i]  = "id_gran_superficie='"+ID_granSuperficie+"'";
					i++;
				}
				
				var prueba ="";
					for(var j = 0; j<sets.length; j++){
						if((j + 1) != sets.length){
							consulta = consulta + sets[j] + ", ";
						}else{
							consulta = consulta + sets[j];
						}
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
		}else{ //Si no muestra todos los usuarios
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



exports.getTiendas = getTiendas;
exports.postTiendas = postTiendas;
exports.updateTiendas = updateTiendas;
exports.postGranSuperficie = postGranSuperficie;
exports.getGranSuperficie = getGranSuperficie;
exports.updateGranSuperficie = updateGranSuperficie;

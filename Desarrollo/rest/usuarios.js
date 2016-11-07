/**************************************************************************
 **************************************************************************
 **** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LOS USUARIOS ****
 **************************************************************************
 **************************************************************************/

//Funcion que genera el GET de Usuarios
function getUsuarios (app, connection) {
	app.get('/usuarios',function(req,res){
		var data = {
			"Errores":1,
			"Usuarios":""
		};

		var id = req.query.id; //Variable que recoje el id del usuario de la URI usuarios?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT * from usuarios where Id_usuario="+id;
		}else{ //Si no muestra todos los usuarios
			var consulta = "SELECT * from usuarios";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Usuarios"] = rows;
				res.json(data);
				
			}else{
				data["Usuarios"] = 'No hay usuarios';
				res.json(data);
			}
		});
	});
}

//Funcion que genera el POST de Usuarios
function postUsuarios (app, connection) {
	app.post('/usuarios',function(req,res){
		var DNI = req.body.dni;
		var Nombre = req.body.nombre;
		var Email = req.body.email;
		var Direccion = req.body.direccion;
		var Comunidad = req.body.comunidad;
		var Provincia = req.body.provincia;
		var Localidad = req.body.localidad;
		var CP = req.body.cp;
		var Telefono = req.body.telefono;
		var Foto = req.body.foto;
		var Contra = req.body.contra;
		var Rol = req.body.rol;
		var data = {
			"Errores":1,
			"Usuarios":""
		};
		if(DNI && Nombre && Email && Direccion && Comunidad && Provincia && Localidad && CP && Telefono && Foto && Contra && Rol){
			connection.query("INSERT INTO usuarios VALUES('',?,?,?,?,?,?,?,?,?,?,?,?,'1','0')",[DNI,Email,Nombre,Direccion,Comunidad,Provincia,Localidad,CP,Telefono,Foto,Contra,Rol],function(err, rows, fields){
				if(err){
					data["Usuarios"] = "Error: Puede ser que el DNI ya exista o que algun campo este mal introducido";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Usuarios"] = "Datos insertados correctamente!";
				}
				res.json(data);
			});
		}else{
			data["Usuarios"] = "Porfavor introduce todos los campos";
			res.json(data);
		}
	});
}

//Funcion que genera el PUT (Update) de Usuarios
function updateUsuarios (app, connection){
	app.put('/usuarios',function(req,res){
		var ID = req.body.id;
		var DNI = req.body.dni;
		var Nombre = req.body.nombre;
		var Email = req.body.email;
		var Direccion = req.body.direccion;
		var Comunidad = req.body.comunidad;
		var Provincia = req.body.provincia;
		var Localidad = req.body.localidad;
		var CP = req.body.cp;
		var Telefono = req.body.telefono;
		var Foto = req.body.foto;
		var Contra = req.body.contra;
		var Rol = req.body.rol;
		var Estado = req.body.estado;
		var Eliminado = req.body.eliminado;
		var data = {
			"Errores":1,
			"Usuarios":""
		};
			var consulta = "UPDATE usuarios SET ";
			if(ID != null){
				if(DNI != null){
					consulta = consulta + "DNI='"+DNI+"'";
				}
				if(Nombre != null){
					consulta = consulta + " Nombre='"+Nombre+"'";
				}
				if(Email != null){
					consulta = consulta + " Email='"+Email+"'";
				}
				if(Direccion != null){
					consulta = consulta + " Direccion='"+Direccion+"'";
				}
				if(Comunidad != null){
					consulta = consulta + " Comunidad='"+Comunidad+"'";
				}
				if(Provincia != null){
					consulta = consulta + " Provincia='"+Provincia+"'";
				}
				if(Localidad != null){
					consulta = consulta + " Localidad='"+Localidad+"'";
				}
				if(CP != null){
					consulta = consulta + " CP='"+CP+"'";
				}
				if(Telefono != null){
					consulta = consulta + " Telefono='"+Telefono+"'";
				}
				if(Foto != null){
					consulta = consulta + " Foto='"+Foto+"'";
				}
				if(Contra != null){
					consulta = consulta + " Contra='"+Contra+"'";
				}
				if(Rol != null){
					consulta = consulta + " Rol='"+Rol+"'";
				}
				if(Estado != null){
					consulta = consulta + " Estado='"+Estado+"'";
				}
				if(Eliminado != null){
					consulta = consulta + " Eliminado='"+Eliminado+"'";
				}
				
				consulta = consulta + " WHERE Id_usuario="+ID;
				console.log(consulta);
			}
			

			connection.query(consulta,function(err, rows, fields){
				if(err){
					data["Usuarios"] = "Error al actualizar datos compruebe que los datos estan bien introducidos";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Usuarios"] = "Actualizado correctamente!";
				}
				res.json(data);
			});
		
	});
}


//Funcion que genera el DELETE de Usuarios
/*function deleteUsuarios (app, connection){
	app.delete('/usuarios',function(req,res){
		var Id = req.body.id;
		var data = {
			"Errores":1,
			"Usuarios":""
		};
		if(Id){
			connection.query("DELETE FROM usuarios WHERE Id_usuario=?",[Id],function(err, rows, fields){
				if(rows.affectedRows == 0){
					data["Usuarios"] = "Error: El ID no existe";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Usuarios"] = "Datos eliminados correctamente!";
				}
				res.json(data);
			});
		}else{
			data["Usuarios"] = "Porfavor introduce bien los campos";
			res.json(data);
		}
	});
}*/


//Devuelvo todos los metodos
exports.getUsuarios = getUsuarios;
exports.postUsuarios = postUsuarios;
exports.updateUsuarios = updateUsuarios;
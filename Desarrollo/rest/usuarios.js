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
			var consulta="SELECT u.Id_usuario, u.DNI, u.Nombre, u.Email, u.Direccion, c.Comunidad, p.Provincia, m.Municipio, u.CP, u.Telefono, u.Foto, t.Nombre_rol, u.Estado, u.Eliminado FROM usuarios u JOIN municipios m ON m.Id = u.Municipio JOIN comunidades c ON c.Id = u.Comunidad JOIN provincias p ON p.Id = u.Provincia JOIN tipo_usuario t ON u.Rol = t.Id_tipo_usuario WHERE Id_usuario="+id;
		}else{ //Si no muestra todos los usuarios
			var consulta = "SELECT u.Id_usuario, u.DNI, u.Nombre, u.Email, u.Direccion, c.Comunidad, p.Provincia, m.Municipio, u.CP, u.Telefono, u.Foto, t.Nombre_rol, u.Estado, u.Eliminado FROM usuarios u JOIN municipios m ON m.Id = u.Municipio JOIN comunidades c ON c.Id = u.Comunidad JOIN provincias p ON p.Id = u.Provincia JOIN tipo_usuario t ON u.Rol = t.Id_tipo_usuario";
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
		var DNI = connection.escape(req.body.dni);
		var Nombre = connection.escape(req.body.nombre);
		var Email = connection.escape(req.body.email);
		var Direccion = connection.escape(req.body.direccion);
		var Comunidad = connection.escape(req.body.comunidad);
		var Provincia = connection.escape(req.body.provincia);
		var Localidad = connection.escape(req.body.localidad);
		var CP = connection.escape(req.body.cp);
		var Telefono = connection.escape(req.body.telefono);
		var Foto = connection.escape(req.body.foto);
		var Contra = connection.escape(req.body.contra);
		var Rol = connection.escape(req.body.rol);
		var data = {
			"Errores":1,
			"Usuarios":""
		};
		console.log(Nombre);
		var consulta = "INSERT INTO usuarios (";
		var i=0;
		if(DNI != null){
			consulta  += "DNI";
			i++;
		}
		if(Nombre != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Nombre";
			i++;
		}
		if(Email != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Email";
			i++;
		}
		if(Direccion != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Direccion";
			i++;
		}
		if(Comunidad != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Comunidad";
			i++;
		}
		if(Provincia != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Provincia";
			i++;
		}
		if(Localidad != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Municipio";
			i++;
		}
		if(CP != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "CP";
			i++;
		}
		if(Telefono != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Telefono";
			i++;
		}
		if(Foto != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Foto";
			i++;
		}
		if(Contra != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Contra";
			i++;
		}
		if(Rol != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Rol";
			i++;
		}
		consulta+=", Estado , Eliminado) VALUES (";
		var i=0;
		if(DNI != null){
			consulta  += "'"+DNI+"'";
			i++;
		}
		if(Nombre != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Nombre+"'";
			i++;
		}
		if(Email != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Email+"'";
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
		if(Comunidad != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Comunidad+"'";
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
		if(CP != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+CP+"'";
			i++;
		}
		if(Telefono != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Telefono+"'";
			i++;
		}
		if(Foto != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Foto+"'";
			i++;
		}
		if(Contra != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Contra+"'";
			i++;
		}
		if(Rol != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'"+Rol+"'";
			i++;
		}
		consulta+=",'1','0')"
			connection.query(consulta,function(err, rows, fields){
				if(err){
					data["Usuarios"] = "Error: Puede ser que el DNI ya exista o que algun campo este mal introducido";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Usuarios"] = "Datos insertados correctamente!";
				}
				res.json(data);
			});
	});
}

//Funcion que genera el PUT (Update) de Usuarios
function updateUsuarios (app, connection){
	app.put('/usuarios',function(req,res){
		var ID = connection.escape(req.body.id);
		var DNI = connection.escape(req.body.dni);
		var Nombre = connection.escape(req.body.nombre);
		var Email = connection.escape(req.body.email);
		var Direccion = connection.escape(req.body.direccion);
		var Comunidad = connection.escape(req.body.comunidad);
		var Provincia = connection.escape(req.body.provincia);
		var Localidad = connection.escape(req.body.localidad);
		var CP = connection.escape(req.body.cp);
		var Telefono = connection.escape(req.body.telefono);
		var Foto = connection.escape(req.body.foto);
		var Contra = connection.escape(req.body.contra);
		var Rol = connection.escape(req.body.rol);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Errores":1,
			"Usuarios":""
		};
			var consulta = "UPDATE usuarios SET ";
			if(ID != null){
				var i=0;
				if(DNI != null){
					consulta  += "DNI='"+DNI+"'";
					i++;
				}
				if(Nombre != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Nombre='"+Nombre+"'";
					i++;
				}
				if(Email != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Email='"+Email+"'";
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
				if(Comunidad != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Comunidad='"+Comunidad+"'";
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
				if(CP != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "CP='"+CP+"'";
					i++;
				}
				if(Telefono != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Telefono='"+Telefono+"'";
					i++;
				}
				if(Foto != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Foto='"+Foto+"'";
					i++;
				}
				if(Contra != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Contra='"+Contra+"'";
					i++;
				}
				if(Rol != null){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Rol='"+Rol+"'";
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
				consulta = consulta + " WHERE Id_usuario="+ID;
			}
			console.log(consulta);

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
		var Id = connection.escape(req.body.id;
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
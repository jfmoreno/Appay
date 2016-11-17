/**************************************************************************
 **************************************************************************
 **** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LOS USUARIOS ****
 **************************************************************************
 **************************************************************************/
/**
 * @api {get} /usuarios/:id Obtener información de los usuarios
 * @apiName GetUser
 * @apiGroup Usuarios
 *
 * @apiParam {Numero} id Identificador único del usuario.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

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
		var consulta = "INSERT INTO usuarios (";
		var i=0;
		if(DNI != null){
			consulta  += "'DNI'";
			i++;
		}
		if(Nombre != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Nombre'";
			i++;
		}
		if(Email != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Email'";
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
		if(Comunidad != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Comunidad'";
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
		if(CP != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'CP'";
			i++;
		}
		if(Telefono != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Telefono'";
			i++;
		}
		if(Foto != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Foto'";
			i++;
		}
		if(Contra != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Contra'";
			i++;
		}
		if(Rol != null){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += "'Rol'";
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
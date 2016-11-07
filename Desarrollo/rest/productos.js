/***************************************************************************
 ***************************************************************************
 **** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LOS PRODUCTOS ****
 ***************************************************************************
 **************************************************************************/

//Funcion que genera el GET de Productos de una tienda
function getProductos (app, connection) {
	app.get('/productos',function(req,res){
		var data = {
			"Errores":1,
			"Productos":""
		};

		var id = req.query.id; //Variable que recoje el id de la tienda de la URI tienda?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT producto.Id_producto, producto.Codigo, producto.Nombre, producto.Precio, producto.Imagen, producto.Descripcion, producto.Stock, producto.URL_video, producto.Estado  FROM producto, tienda, producto_tienda WHERE producto.Id_producto = producto_tienda.Id_producto AND             producto_tienda.Id_tienda = tienda.Id_tienda AND tienda.Id_tienda="+id;
		}else{ //Si no muestra todos los usuarios
			var consulta = "SELECT * FROM producto";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Productos"] = rows;
				res.json(data);
				
			}else{
				data["Productos"] = 'No hay productos';
				res.json(data);
			}
		});
	});
}

//Funcion que genera el POST de Productos
function postProductos (app, connection){
	app.post('/productos',function(req,res){
		var Codigo = req.body.codigo;
		var Nombre = req.body.nombre;
		var Precio = req.body.precio;
		var Imagen = req.body.imagen;
		var Descripcion = req.body.descripcion;
		var Stock = req.body.stock;
		var URL_video = req.body.url_video;
		var Id_tienda = req.body.id_tienda;
		var data = {
			"Errores":1,
			"Productos":""
		};
		if(Codigo && Nombre && Precio && Imagen && Descripcion && Stock && URL_video && Id_tienda){
			connection.query("INSERT INTO producto VALUES('',?,?,?,?,?,?,?,'1',0,)",[Codigo, Nombre, Precio, Imagen, Descripcion, Stock, URL_video],function(err, rows, fields){
				if(err){
					data["Productos"] = "Error: puede que el codigo ya exista o algun campo este mal introducido";
					console.log(err);
				}else{
					var Id_producto = rows.insertId; //Cojemos el id del producto para insertarlo en la tienda
					//Tengo que insertar en producto_tienda el producto para asociarla a una tienda
					connection.query("INSERT INTO producto_tienda VALUES('',?,?)",[Id_tienda, Id_producto],function(err, rows, fields){
						if(err){
							console.log(err)
						}else{
							data["Errores"] = 0;
							data["Productos"] = "Datos insertados correctamente!";
							res.json(data);
						}
					});
				}
			});

		}else{
			data["Productos"] = "Porfavor introduce todos los campos";
			res.json(data);
		}
	});



}
//Funcion que genera el PUT (Update) de Productos
function updateProductos (app, connection){
	app.put('/productos',function(req,res){
		var ID = req.body.id;
		var Codigo = req.body.codigo;
		var Nombre = req.body.nombre;
		var Precio = req.body.precio;
		var Imagen = req.body.imagen;
		var Descripcion = req.body.descripcion;
		var Stock = req.body.stock;
		var URL_video = req.body.url_video;
		var Estado = req.body.estado;
		var Eliminado = req.body.eliminado;
		var Id_tienda = req.body.id_tienda;
		var data = {
			"Errores":1,
			"Productos":""
		};
			var consulta = "UPDATE producto SET ";
			if(ID != null){
				if(Codigo != null){
					consulta = consulta + "Codigo='"+Codigo+"'";
				}
				if(Nombre != null){
					consulta = consulta + " Nombre='"+Nombre+"'";
				}
				if(Precio != null){
					consulta = consulta + " Precio='"+Precio+"'";
				}
				if(Imagen != null){
					consulta = consulta + " Imagen='"+Imagen+"'";
				}
				if(Descripcion != null){
					consulta = consulta + " Descripcion='"+Descripcion+"'";
				}
				if(Stock != null){
					consulta = consulta + " Stock='"+Stock+"'";
				}
				if(URL_video != null){
					consulta = consulta + " URL_video='"+URL_video+"'";
				}
				if(Estado != null){
					consulta = consulta + " Estado='"+Estado+"'";
				}
				if(Eliminado != null){
					consulta = consulta + " Eliminado='"+Eliminado+"'";
				}
				
			
				consulta = consulta + " WHERE Id_producto="+ID;
				console.log(consulta);
			}
			
			connection.query(consulta,function(err, rows, fields){
				if(err){
					data["Productos"] = "Error al actualizar datos compruebe que los datos estan bien introducidos";
					console.log(err);
				}else{
					data["Errores"] = 0;
					data["Productos"] = "Actualizado correctamente!";
				}
				res.json(data);
			});
		
	});


}



exports.getProductos = getProductos;
exports.postProductos = postProductos;
exports.updateProductos = updateProductos;
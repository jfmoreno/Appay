/**************************************************************************
 **************************************************************************
 **** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LaS FACTURAS ****
 **************************************************************************
 **************************************************************************/

//Funcion que genera el GET de Facturas (Muestra todas las facturas)
function getFacturas (app, connection) {
    app.get('/facturas',function(req,res){
		var data = {
			"Errores":1,
			"Factura":"",
			"Lineas":""
		};

		var id = req.query.id; //Variable que recoje el id de la factura de la URI factura?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id y se muestran todos los detalles de la factura
			var infoTienda = "SELECT f.Id_factura, f.Id_tienda, t.NIF, f.Fecha_factura, f.Total_factura, f.Pagada FROM factura f JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE f.Id_tienda ="+id;
			var consulta="SELECT l.Cantidad, p.Codigo, p.Nombre, p.Precio, l.Total_linea, l.Id_oferta_usuario, l.Id_oferta_producto FROM factura f JOIN linea_factura l ON l.Id_factura = f.Id_factura JOIN producto_tienda pt ON pt.Id_producto_tienda = l.Id_producto_tienda JOIN producto p ON p.Id_producto = pt.Id_producto JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE f.Id_factura="+id+";";
			
			//Consulta multiple
			connection.query(consulta+infoTienda, function(err, rows, fields){
				if(rows.length != 0){
					data["Errores"] = 0;
					data["Factura"] = rows[1];
					data["Lineas"] = rows[0];
					res.json(data);
				}else{
					data["Factura"] = 'No hay facturas';
					res.json(data);
				}
			});

		}else{ //Si no muestra todas las facturas
			var consulta = "SELECT * FROM factura";
				var data = {
					"Errores":1,
					"Facturas":""
				};
				connection.query(consulta, function(err, rows, fields){
				if(rows.length != 0){
					data["Errores"] = 0;
					data["Facturas"] = rows;
					res.json(data);
				}else{
					data["Facturas"] = 'No hay facturas';
					res.json(data);
				}
			});
		}
	});
}


//Funcion GET de facturas (Muestra las facturas de un usuario)
function getFacturasUsuarios (app, connection) {
  app.get('/facturas/usuario',function(req,res){
		var data = {
			"Errores":1,
			"Factura":"",
		};
	
	 	var id = req.query.id;
		 	var consulta="SELECT f.Id_factura, f.Id_tienda, f.Fecha_factura, f.Total_factura, f.Pagada FROM factura f JOIN factura_usuario fu ON f.Id_factura = fu.Id_factura JOIN usuarios_tienda ut ON fu.Id_usuario_tienda = ut.Id_usuario_tienda JOIN usuarios u ON ut.Id_usuario = u.Id_usuario WHERE u.Id_usuario = "+id;

		 	connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Factura"] = rows;
				res.json(data);
				
			}else{
				data["Factura"] = 'No hay facturas';
				res.json(data);
			}
		});
   });	

}

//Funcion que genera el POST de Facturas
function postFacturas (app, connection){
	app.post('/facturas',function(req,res){
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Fecha_factura = connection.escape(req.body.fecha);
		var Total_factura = connection.escape(req.body.total);
		var Pagada = connection.escape(req.body.pagada);
		var data = {
			"Errores":1,
			"Facturas":""
		};
		var consulta = "INSERT INTO factura (";
		var i=0;
		if(Id_tienda != null){
			consulta  += "Id_tienda";
			i++;
		}
		if(Fecha_factura != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_factura";
			i++;
		}
		if(Total_factura != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Total_factura";
			i++;
		}
		if(Pagada != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Pagada";
			i++;
		}
		
		consulta+=") VALUES (";
		var i=0;
		if(Id_tienda != null){
			consulta  += "'"+Id_tienda+"'";
			i++;
		}
		if(Fecha_factura != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "'"+Fecha_factura+"'";
			i++;
		}
		if(Total_factura != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "'"+Total_factura+"'";
			i++;
		}
		if(Pagada != null){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "'"+Pagada+"'";
			i++;
		}
		consulta+=")"
		connection.query(consulta,function(err, rows, fields){
			if(err){
				data["Facturas"] = "Error: puede que algun campo este mal introducido";
				console.log(err);
			}else{
				data["Errores"] = 0;
				data["Facturas"] = "Datos insertados correctamente!";
				res.json(data);
			}
		});
	});
}

//Funcion que genera el PUT (Update) de Facturas
function updateFacturas (app, connection){
	app.put('/facturas',function(req,res){
		var ID =connection.escape(req.body.id_factura);  
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Fecha_factura = connection.escape(req.body.fecha);
		var Total = connection.escape(req.body.total);
		var Pagada = connection.escape(req.body.pagada);
		var data = {
			"Errores":1,
			"Facturas":""
		};
		if(ID != null){
			var consulta = "UPDATE factura SET ";
			var i=0;
			if(Id_tienda != null){
				consulta  += "Id_tienda='"+Id_tienda+"'";
				i++;
			}
			if(Fecha_factura != null){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Fecha_factura='"+Fecha_factura+"'";
				i++;
			}
			if(Total != null){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Total_factura='"+Total+"'";
				i++;
			}
			if(Pagada != null){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Pagada='"+Pagada+"'";
				i++;
			}
			consulta = consulta + " WHERE Id_factura="+ID;
		}
		connection.query(consulta,function(err, rows, fields){
			if(err){
				data["Facturas"] = "Error al actualizar datos compruebe que los datos estan bien introducidos";
				console.log(err);
			}else{
				data["Errores"] = 0;
				data["Facturas"] = "Actualizado correctamente!";
			}
			res.json(data);
		});
		
	});
}


exports.getFacturas = getFacturas;
exports.getFacturasUsuarios = getFacturasUsuarios;
exports.postFacturas = postFacturas;
exports.updateFacturas = updateFacturas;

/*
SELECT f.Id_factura, f.Id_tienda, t.NIF, f.Fecha_factura, f.Total_factura, f.Pagada, l.Cantidad, l.Total_linea, p.Codigo, p.Nombre, p.Precio
FROM factura f
JOIN linea_factura l ON l.Id_factura = f.Id_factura
JOIN producto_tienda pt ON pt.Id_producto_tienda = l.Id_producto_tienda
JOIN producto p ON p.Id_producto = pt.Id_producto
JOIN tienda t ON t.Id_tienda = f.Id_tienda
WHERE f.Id_factura=1

*/
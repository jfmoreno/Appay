var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

//Get facturas(muestra todas las facturas)
router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
   		var data = {
			"Factura":"",
			"Lineas":""
		};

		var id = connection.escape(req.query.id); //Variable que recoje el id de la factura de la URI factura?id={num}
		console.log(id);
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id y se muestran todos los detalles de la factura
			var infoTienda = "SELECT f.Id_factura, f.Id_tienda, t.NIF, f.Fecha_factura, f.Total_factura, f.Pagada FROM factura f JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE f.Id_tienda ="+id;
			var consulta="SELECT l.Cantidad, p.Codigo, p.Nombre, p.Precio, l.Id_oferta_usuario, l.Id_oferta_producto, l.Total_linea FROM factura f JOIN linea_factura l ON l.Id_factura = f.Id_factura JOIN producto_tienda pt ON pt.Id_producto_tienda = l.Id_producto_tienda JOIN producto p ON p.Id_producto = pt.Id_producto JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE f.Id_factura="+id+";";
			console.log(infoTienda);
			console.log(consulta);
			//Consulta multiple
			connection.query(consulta+infoTienda, function(err, rows, fields){
				if(rows.length != 0){
					data["Factura"] = rows[1];
					data["Lineas"] = rows[0];
					res.status(200);
				}else{
					data["Factura"] = 'No hay facturas';
				}
				res.json(data);
			});

		}else{ //Si no muestra todas las facturas
			var consulta = "SELECT * FROM factura";
				var data = {
					"Facturas":""
				};
				connection.query(consulta, function(err, rows, fields){
				if(rows.length != 0){
					data["Facturas"] = rows;
					res.status(200);
				}else{
					data["Facturas"] = 'No hay facturas';
				}
				res.json(data);
			});
		}     
    connection.release();
	});
});

//Funcion GET de facturas (Muestra las facturas de un usuario)
router.get('/usuario',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
   		var data = {
			"Factura":"",
		};
	
	 	var id = connection.escape(req.query.id);
		 	var consulta="SELECT f.Id_factura, f.Id_tienda, f.Fecha_factura, f.Total_factura, f.Pagada FROM factura f JOIN factura_usuario fu ON f.Id_factura = fu.Id_factura JOIN usuarios_tienda ut ON fu.Id_usuario_tienda = ut.Id_usuario_tienda JOIN usuarios u ON ut.Id_usuario = u.Id_usuario WHERE u.Id_usuario = "+id;

		 	connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Factura"] = rows;
				res.status(200);
			}else{
				data["Factura"] = 'No hay facturas';
			}
			res.json(data);
		});	
    connection.release();
	});
});

//Funcion que genera el POST de Facturas
router.post('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var Id_tienda = connection.escape(req.body.id_tienda);
		var Fecha_factura = connection.escape(req.body.fecha);
		var Total_factura = connection.escape(req.body.total);
		var Pagada = connection.escape(req.body.pagada);
		var data = {
			"Facturas":""
		};
		var consulta = "INSERT INTO factura (";
		var i=0;
		if(Id_tienda != 'NULL'){
			consulta  += "Id_tienda";
			i++;
		}
		if(Fecha_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_factura";
			i++;
		}
		if(Total_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Total_factura";
			i++;
		}
		if(Pagada != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Pagada";
			i++;
		}
		
		consulta+=") VALUES (";
		var i=0;
		if(Id_tienda != 'NULL'){
			consulta  += Id_tienda;
			i++;
		}
		if(Fecha_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Fecha_factura;
			i++;
		}
		if(Total_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Total_factura;
			i++;
		}
		if(Pagada != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Pagada;
			i++;
		}
		consulta+=")"
		connection.query(consulta,function(err, rows, fields){
			if(err){
				res.status(400).json({ error: err });
				console.log(err);
			}else{
				data["Facturas"] = "Datos insertados correctamente!";
				res.status(200);
			}
			res.json(data);
		});  		
    connection.release();
	});
});

//Funcion que genera el PUT (Update) de Facturas
router.put('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var ID =connection.escape(req.body.id_factura);  
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Fecha_factura = connection.escape(req.body.fecha);
		var Total = connection.escape(req.body.total);
		var Pagada = connection.escape(req.body.pagada);
		var data = {
			"Facturas":""
		};
		if(ID != 'NULL'){
			var consulta = "UPDATE factura SET ";
			var i=0;
			if(Id_tienda != 'NULL'){
				consulta  += "Id_tienda="+Id_tienda;
				i++;
			}
			if(Fecha_factura != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Fecha_factura="+Fecha_factura;
				i++;
			}
			if(Total != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Total_factura="+Total;
				i++;
			}
			if(Pagada != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Pagada="+Pagada;
				i++;
			}
			consulta = consulta + " WHERE Id_factura="+ID;
		}
		console.log(consulta);
		connection.query(consulta,function(err, rows, fields){
			if(err){
				res.status(400).json({ error: err });
				console.log(err);
			}else{
				data["Facturas"] = "Actualizado correctamente!";
				res.status(200);
			}
			res.json(data);
		});  		
    connection.release();
	});
});


//Funcion que genera el POST de Lineas de Factura
router.post('/lineafactura',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var Id_factura = connection.escape(req.body.id_factura);  
		var Cantidad = connection.escape(req.body.cantidad);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Id_oferta_usuario = connection.escape(req.body.id_oferta_usuario);
		var Id_oferta_producto = connection.escape(req.body.id_oferta_producto);
		var Total_linea = connection.escape(req.body.total_linea);
		var data = {
			"Facturas":""
		};
	
        //Buscamos el Id de producto tienda con el producto que pasamos por parametro	
        var consulta = "INSERT INTO linea_factura (";
        var i=0;
        if(Id_factura != 'NULL'){
                consulta  += "Id_factura";
                i++;
        }
        if(Cantidad != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Cantidad";
            i++;
        }
        if(Id_producto_tienda != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            
            consulta  += "Id_producto_tienda";
            i++;
        }
        if(Id_oferta_usuario != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Id_oferta_usuario";
            i++;
        }
        if(Id_oferta_producto != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Id_oferta_producto";
            i++;
        }
        if(Total_linea != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Total_linea";
            i++;
        }

        consulta+=") VALUES (";
        var i=0;

        if(Id_factura != 'NULL'){
            consulta  += Id_factura;
            i++;
        }
        if(Cantidad != 'NULL'){
            if (i==1) {
                consulta  += ", ";				
                i--;	
            }
            consulta  += Cantidad;
            i++;
        }
        if(Id_producto_tienda != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Id_producto_tienda;
            i++;
        }
        if(Id_oferta_usuario != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Id_oferta_usuario;
            i++;
        }
        if(Id_oferta_producto != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Id_oferta_producto;
            i++;
        }
        if(Total_linea != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Total_linea;
            i++;
        }
        consulta+=")";
        console.log(consulta);
            connection.query(consulta,function(err, rows, fields){
                    if(err){
                        res.status(400).json({ error: err });
                        console.log(err);
                    }else{
                        data["Facturas"] = "Datos insertados correctamente!";
                        res.status(200);
                    }
                    res.json(data);
		});  		
    connection.release();
	});
});

//UPDATE LINEA DE FACTURA
router.put('/lineafactura',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var ID = connection.escape(req.body.id_linea_factura);
		var Id_factura = connection.escape(req.body.id_factura);  
		var Cantidad = connection.escape(req.body.cantidad);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Id_oferta_usuario = connection.escape(req.body.id_oferta_usuario);
		var Id_oferta_producto = connection.escape(req.body.id_oferta_producto);
		var Total_linea = connection.escape(req.body.total_linea);
		var data = {
			"Facturas":""
		};

		if(ID != 'NULL'){
			var consulta = "UPDATE linea_factura SET ";
			var i=0;
			if(Id_factura != 'NULL'){
				consulta  += "Id_factura="+Id_factura;
				i++;
			}
			if(Cantidad != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Cantidad="+Cantidad;
				i++;
			}
			if(Id_producto_tienda != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_producto_tienda="+Id_producto_tienda;
				i++;
			}
			if(Id_oferta_usuario != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_oferta_usuario="+Id_oferta_usuario;
				i++;
			}
			if(Id_oferta_producto != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_oferta_producto="+Id_oferta_producto;
				i++;
			}
			if(Total_linea != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Total_linea="+Total_linea;
				i++;
			}
			consulta = consulta + " WHERE Id_linea_factura="+ID;

		}

		connection.query(consulta,function(err, rows, fields){
						if(err){
							res.status(400).json({ error: err });
							console.log(err);
						}else{
							data["Facturas"] = "Datos actualizados correctamente!";
							res.status(200);
						}
						res.json(data);
				});   		
    connection.release();
	});
});


module.exports = router;
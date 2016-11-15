/**************************************************************************
 **************************************************************************
 **** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LaS FACTURAS ****
 **************************************************************************
 **************************************************************************/

//Funcion que genera el GET de Facturas
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

function postFacturas (app, connection) {
	 app.post('/facturas',function(req,res){
		var data = {
			"Errores":1,
			"Factura":"",
			"Lineas":""
		};



	 });

}



exports.getFacturas = getFacturas;


/*
SELECT f.Id_factura, f.Id_tienda, t.NIF, f.Fecha_factura, f.Total_factura, f.Pagada, l.Cantidad, l.Total_linea, p.Codigo, p.Nombre, p.Precio
FROM factura f
JOIN linea_factura l ON l.Id_factura = f.Id_factura
JOIN producto_tienda pt ON pt.Id_producto_tienda = l.Id_producto_tienda
JOIN producto p ON p.Id_producto = pt.Id_producto
JOIN tienda t ON t.Id_tienda = f.Id_tienda
WHERE f.Id_factura=1

*/
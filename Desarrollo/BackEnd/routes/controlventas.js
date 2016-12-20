var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

//Get que devuelve si los productos estan pagados o no
router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
   		var data = {
			"Factura":"",
			"Lineas":""
		};
		var Id = connection.escape(req.query.id); //Variable que recoje el codigo del producto 
		var Cod = connection.escape(req.query.cod); //Variable que recoje el codigo del producto 
		var Can = connection.escape(req.query.can); //Variable que recoje la cantidad de productos de un mismo codigo 
		var consulta="SELECT l.Cantidad, p.Codigo FROM factura f JOIN linea_factura l ON l.Id_factura = f.Id_factura JOIN producto_tienda pt ON pt.Id_producto_tienda = l.Id_producto_tienda JOIN producto p ON p.Id_producto = pt.Id_producto JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE SUBTIME(NOW(),'0:30:1.000000' ) <= f.Fecha_factura AND f.Pagada=1 AND l.cantidad >= "+Can+" AND p.Codigo = "+Cod+" AND f.Id_tienda="+Id;
		console.log(consulta);
		//Consulta multiple
		connection.query(consulta, function(err, rows, fields){
			if(rows.length != 0){
				data["Factura"] = rows;
				res.status(200);
			}else{
				data["Factura"] = "Articulo con codigo:"+Cod+" no pagado!!";
				res.status(404);
			}
			res.json(data);
		});
    connection.release();
	});
});
module.exports = router;
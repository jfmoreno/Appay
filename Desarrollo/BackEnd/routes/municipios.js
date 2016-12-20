var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"Errores":1,
			"Municipios":""
		};

		var id = req.query.id; //Variable que recoje el id de la municipios de la URI municipios?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT m.id, m.municipio, m.latitud, m.longitud, p.provincia FROM municipios m JOIN provincias p ON m.provincia_id=p.id WHERE m.id="+id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT m.id, m.municipio, m.latitud, m.longitud, p.provincia FROM municipios m JOIN provincias p ON m.provincia_id=p.id";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Municipios"] = rows;
				res.json(data);
				
			}else{
				data["Municipios"] = 'No hay municipios';
				res.json(data);
			}
		});
    connection.release();
	});
});



module.exports = router;
var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		if (err) throw err;	
    	var data = {
			"Errores":1,
			"Provincias":""
		};

		var id = req.query.id; //Variable que recoje el id de las provincias de la URI provincias?id={num}
	
		if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT p.id, p.provincia, c.comunidad FROM provincias p JOIN comunidades c ON p.comunidad_id = c.id  WHERE p.id="+id;
		}else{ //Si no muestra todos las provincias
			var consulta = "SELECT p.id, p.provincia, c.comunidad FROM provincias p JOIN comunidades c ON p.comunidad_id = c.id";
		}
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["Provincias"] = rows;
				res.json(data);
				
			}else{
				data["Provincias"] = 'No hay provincias';
				res.json(data);
			}
		});
    connection.release();
	});
});


module.exports = router;
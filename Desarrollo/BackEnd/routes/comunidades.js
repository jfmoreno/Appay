var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        var data = {
            "Errores":1,
            "Comunidades":""
        };

        var id = req.query.id; //Variable que recoje el id de las comunidades de la URI comunidades?id={num}

        if(id != null){ //Si en la URI existe se crea la consulta de busqueda por id
            var consulta="SELECT * FROM comunidades WHERE id="+id;
        }else{ //Si no muestra todos las comunidades
            var consulta = "SELECT * FROM comunidades";
        }
        
        connection.query(consulta,function(err, rows, fields){
            if(rows.length != 0){
                data["Errores"] = 0;
                data["Comunidades"] = rows;
                res.json(data);
                
            }else{
                data["Comunidades"] = 'No hay comunidades';
                res.json(data);
            }
        });
    connection.release();
	});
});



module.exports = router;
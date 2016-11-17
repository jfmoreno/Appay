/***************************************************************************
 ***************************************************************************
 *** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LAS COMUNIDADES ***
 ***************************************************************************
 **************************************************************************/

//Funcion que genera el GET de Comunidades
function getComunidades (app, connection) {
    app.get('/comunidades',function(req,res){
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
	});
}

exports.getComunidades = getComunidades;

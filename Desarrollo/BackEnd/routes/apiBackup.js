var waterfall = require('async-waterfall');

var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var db2 = require('../helpers/database2')();


router.get('/products', function(request, response) {
    var query = "SELECT * FROM productos";
    var columnas =new Array;
    var nuevos = 0;
    var actualizados = 0;
    
        //Esto es para hacerlo de forma asincrona
            waterfall([
            //Funcion que coje los datos de la base de datos de la tienda    
            function(callback){
                db2.getConnection(function(err, connection) {
                    if (err) throw err;
                    connection.query(query, function(err, rows, fields) {
                        if (err) {
                            console.log('error: ', err);
                            throw err;
                        }
                        
                        if(rows.length != 0){
                            for(var i = 0; i<rows.length; i++){
                                columnas[i] = rows[i];
                            }
                        }

                    callback(null, columnas);
                    });
                    connection.release();
                });
            },
            //Funcion que comprueba que no existe ningun producto igual en la tienda a insertar en la base de datos
            function(arg, callback){
              var productos = new Array;
              var actualizarProductos = new Array;
              var actualizar = false;
               db.getConnection(function(err, connection) {
                  if (err) throw err;
                  var Id_tienda = connection.escape(request.query.id);
                  if(arg.length > 0 && Id_tienda != "NULL"){
                      var comprobarProducto = "";
                      for(var i = 0; i<arg.length; i++){
                            comprobarProducto += "SELECT * FROM producto p JOIN producto_tienda pt ON p.Id_producto=pt.Id_producto WHERE pt.Id_tienda = "+Id_tienda+" AND p.codigo = "+arg[i].codigo+";";
                      }
                            console.log(comprobarProducto);
                            connection.query(comprobarProducto, function(err, rows, fields) {
                                if (err) {
                                    console.log('error: ', err);
                                    throw err;
                                }else{
                                    var j = 0;
                                    var k = 0;
                                    for(var i = 0; i<rows.length; i++){
                                        if(rows[i].length == 0){
                                            productos[j] = arg[i];
                                            j++;
                                            nuevos++;
                                        }else{
                                            actualizarProductos[k] = arg[i];
                                            k++;
                                            actualizados++;
                                            actualizar = true;
                                            console.log("El producto ya existe, se va a actualizar");
                                        }
                                    }
                                    //Si existen productos duplicados se van a actualizar
                                    if(actualizar){
                                      var updateProductos = "";
                                      for(var i = 0; i<actualizarProductos.length; i++){
                                            updateProductos += "UPDATE producto p JOIN producto_tienda pt ON pt.Id_producto = p.Id_producto SET p.Nombre = '"+actualizarProductos[i].nombre+"', p.Codigo = '"+actualizarProductos[i].codigo+"', p.Descripcion = '"+actualizarProductos[i].descripcion+"', p.Precio = "+actualizarProductos[i].precio+", p.Stock = "+actualizarProductos[i].stock+", p.Eliminado="+actualizarProductos[i].eliminado+" WHERE p.Codigo = '"+actualizarProductos[i].codigo+"' AND pt.Id_tienda = "+Id_tienda+";";
                                      }
                                      console.log(updateProductos);
                                      connection.query(updateProductos, function(err, rows, fields) {
                                        if (err) {
                                            console.log('error: ', err);
                                            throw err;
                                        }else{
                                            console.log("Productos actualizados correctamente");
                                        }
                                      });
                                    }
                                   
        
                                }
                                callback(null, productos);

                             });
                      
                  }
                  connection.release();
              });

            },
             //Funcion que copia en la base de datos de appay
            function(arg, callback){
                console.log(arg);
                if(arg.length > 0){
                    var query2 ="";
                    //Esta linea abria que cambiar en caso de que la base de datos del cliente fuera de otra forma
                    var fecha = new Date().toLocaleString();
                    for(var i = 0; i<arg.length; i++){
                            query2 = query2 + "INSERT INTO producto (Nombre, Codigo, Descripcion, Precio, Stock, Eliminado) VALUES ('"+arg[i].nombre+"', '"+arg[i].codigo+"', '"+arg[i].descripcion+"', '"+arg[i].precio+"', '"+arg[i].stock+"', "+arg[i].eliminado+");"
                        
                     }
                     console.log(query2);
                     db.getConnection(function(err, connection) {
                        if (err) throw err;
                        connection.query(query2, function(err, rows, fields) {
                            if (err) {
                                console.log('error: ', err);
                                throw err;
                            }else{
                                var Id_tienda = connection.escape(request.query.id); //Hay que pasarle el id de tienda para saber en que tienda se insertan los productos
                                var query3 = "";
                                if(rows.length > 0){
                                    for(var i = 0; i < rows.length; i++){
                                         query3+="INSERT INTO producto_tienda (Id_tienda, Id_producto) VALUES("+Id_tienda+","+rows[i].insertId+");";
                                    }
                                }else{
                                    query3+="INSERT INTO producto_tienda (Id_tienda, Id_producto) VALUES("+Id_tienda+","+rows.insertId+");";
                                }
                                //Añadimos la fecha de la ultima copia de la tienda
                                query3 += "UPDATE tienda SET Ultima_copia_productos='"+fecha+"' WHERE Id_tienda="+request.query.id+"";
                                connection.query(query3,function(err, rows, fields){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log("Insertado correctamente en producto_tienda");
                                    }
                                });
                            }
                        });
                        connection.release();
                    });
                    callback(null, "Productos nuevos añadidos: "+nuevos+" --- Productos actualizados: "+actualizados);
                }else{
                    callback(null, "Productos nuevos añadidos: "+nuevos+" --- Productos actualizados: "+actualizados);
                }   
            },
            
            ], function (err, result) {
                //setInterval(function(){alerta()},10000);
                response.send(result);
            });
});




module.exports = router;
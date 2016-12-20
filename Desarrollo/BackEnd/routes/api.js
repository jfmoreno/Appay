var express = require('express');
var router = express.Router();
var db = require('../helpers/database');
var db = db();

//CANTIDAD DE USUARIOS POR LOCALIZACION
//IDEA, MEDIA DE EDAD DE LOS USUARIOS
router.get('/usuarios', function(request, response) {
   var query;
   if(request.query.localidad)  query='SELECT count(*) from usuarios where localidad = '+ request.query.localidad;
   else if (request.query.comunidad) query='SELECT count(*) from usuarios where comunidad = '+ request.query.comunidad;
   else if (request.query.provincia) query='SELECT count(*) from usuarios where provincia = '+ request.query.provincia;
   else     query='SELECT count(*) from usuarios';

    console.log(query);
    db.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows, fields) {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
                response.send([rows]);
        });
        connection.release();
    });
});


//TIENDAS POR LOCALIZACION 
router.get('/tiendas', function(request, response) {
   var query;
   if(request.query.localidad)  query='SELECT * from tienda where localidad = '+ request.query.localidad;
   else if (request.query.comunidad) query='SELECT * from tienda where comunidad = '+ request.query.comunidad;
   else if (request.query.provincia) query='SELECT * from tienda where provincia = '+ request.query.provincia;
   else     query='SELECT * from tienda';
    console.log(query);
    db.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows, fields) {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            response.send([rows]);
        });
        connection.release();
    });   


});


//PRODUCTOS POR LOCALIZACION
router.get('/productos', function(request, response) {
   var query;
   if(request.query.localidad)  query='select count(p.id_producto_tienda) from producto_tienda p, tienda t where p.id_tienda= t.id_tienda && t.localidad = '+ request.query.localidad;
   else if (request.query.comunidad) query='select count(p.id_producto_tienda) from producto_tienda p, tienda t where p.id_tienda= t.id_tienda && t.comunidad = '+ request.query.comunidad;
   else if (request.query.provincia) query='select count(p.id_producto_tienda) from producto_tienda p, tienda t where p.id_tienda= t.id_tienda && t.provincia = '+ request.query.provincia;
   else     query='select count(*) from producto_tienda;';
    console.log(query);
    db.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows, fields) {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            response.send([rows]);
        });
        connection.release();
    });      
});


//FACTURACION

    //num de facturas 
router.get('/facturacion', function(request, response) {
   var query;
   if(request.query.mes) query='SELECT count(*) FROM factura WHERE MONTH(fecha_factura) = '+ request.query.mes;
   else query='select count(*) from factura;';
    console.log(query);
    db.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows, fields) {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            response.send([rows]);
        });
        connection.release();
    });      
});



    //cantidad de dinero facturado
router.get('/facturacion/:total', function(request, response) {
   var query;
   if(request.query.mes) query='  SELECT sum(total_factura) FROM factura WHERE MONTH(fecha_factura) ='+ request.query.mes;
   else query='SELECT sum(total_factura) FROM factura';
    console.log(query);
    db.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows, fields) {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            response.send([rows]);
        });
        connection.release();
    });      
});


module.exports = router;
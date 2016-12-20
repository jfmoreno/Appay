var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');
var jwt =require("jsonwebtoken");
var mySecretKey=process.env.JWT_SECRETKEY;

//Metodo login 
router.post("/", function(req,res,next){
    db.getConnection(function(err, connection) {    
        if (err) throw err;
        var username =connection.escape(req.body.username);
        var password =connection.escape(req.body.password);
        console.log("username es "+username);
        console.log("password es "+password);
        //llamamos a la base de datos para ver si el usuario es correcto o no 
    
        var consulta="SELECT * from usuarios where Email="+username+" and Contra=md5("+password+")";
        
        connection.query(consulta, function(err, rows, fields) {
            if(rows!=null && rows.length != 0){ //si es correcto
                var user=rows[0];
                var token= jwt.sign({//firmamos el token , que caduca en 7 dias
                    data: user
                }, mySecretKey, { expiresIn: '168h' });
                return res.status(200).json(token);  //lo enviamos
            }else{
                return res.status(401).json("El usuario no existe");
            }
        });
    connection.release();
    });
}); 


//info (devuelve el objeto del token)
router.post("/info", comprobacionjwt, function(req, res, next){
    console.log("Entramos en post de info");
    res.status(200).json(req.objeto_token);
});

module.exports = router;
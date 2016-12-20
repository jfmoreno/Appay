var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();

var comprobacionjwt= require ('../helpers/comprobacionjwt');
var jwt =require("jsonwebtoken");
var emailhtml= require ('../emails/htmlconfirmaremail');

var nodemailer = require('nodemailer');
const nodemailerDkim = require('nodemailer-dkim');

var mySecretKey=process.env.JWT_SECRETKEY;


//Peticion de cambio de contraseña. Se llamará cuando alguien no recuerde su contraseña
router.post('/',function(req,res){
    var encontrado=false; 
    req.body.email="emiliomaestre94@gmail.com"; //PARA HACER LAS PRUEBAS
    
    db.getConnection(function(err, connection) {
        if (err) throw err;
		var Email = connection.escape(req.body.email);
        console.log(Email);
		var consulta = "SELECT Email FROM usuarios WHERE Email="+Email;
		connection.query(consulta,function(err, rows, fields){
			if(rows != 0){ // Si que lo ha encontrado
                console.log("Usuario encontrado");
                
                var token= jwt.sign({//firmamos el token , que caduca en 24 horas
                    data: req.body.email
                    }, mySecretKey, { expiresIn: '24h' });

                var smtpTransport = nodemailer.createTransport("SMTP",{
                    service: "gmail",
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS
                    }
                });

                var htmlcorreo=emailhtml(token,req.body.email); 
                var mailOptions = {
                    from: "<appayoficial@gmail.com>", // sender address
                    to: req.body.email, //
                    subject: "Confirmar registro Appay", // Subject line
                    html: htmlcorreo
                    
                }		
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.status(300).json(error);
                    }else{
                        console.log("Correo enviado");
                        res.status(200).json("Todo bien todo correcto");
                    }
                });

			}else{
                console.log("Usuario no encontrado"); 
                 res.status(204).json("El usuario no existe");   
			}
		});
	connection.release();
	});
});




//Este get se llamara desde el cliente para ver si el token es correcto
router.get('/',function(req,res){
    var token = req.body.token;
    jwt.verify(token, mySecretKey, function(error, decoded) //verificamos que el token es correcto
    {
        if(error)
        {
            console.log(error);
            res.status(401).json(error); //error, acceso no autorizado
        }
        else
        {
            console.log("Token correcto");
            res.status(200).json(token); //en este momento guardaremos id_token en sesion
        }
    });       
});



// PUT de confirmar registro (COMPROBAR)
router.put('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		if (err) throw err;	
		var data = {
			"Usuarios":""
		};
        var consulta = "UPDATE usuarios SET Estado=1 Where Email="+req.objeto_token;
			
        console.log(consulta);
        connection.query(consulta,function(err, rows, fields){
            if(err){
                res.status(400).json({ error: err });
            }else{
                data["Usuarios"] = "Actualizado correctamente!";
                res.status(200);
            }
            res.json(data);
        });
	connection.release();
	});
});


module.exports = router; 
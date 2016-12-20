var jwt =require("jsonwebtoken");
var mySecretKey=process.env.JWT_SECRETKEY;

module.exports = function(req, res, next) {
        console.log('Entra en el middleware');
 /*
        console.log('ComprobacionJWT activada')
        var token = null;
        if(req.headers.authorization!=null){
            var authorization = req.headers.authorization.split(" "); //esto es porque en la cabecera el authorization es: Bearer espacio y el token 
            //console.log(req.headers.authorization);
            if(authorization.length === 2) //tiene la cabecera correcta
            {
                var key = authorization[0];
                var val = authorization[1];
                if(/^Bearer$/i.test(key)) //si la clave es Bearer
                {
                    token = val.replace(/"/g, "");//quitamos las comillas, se las reemplazamos por vacio 
                    jwt.verify(token, mySecretKey, function(error, decoded) //verificamos que el token es correcto
                    {
                        if(error)
                        {
                            res.status(401).json("ACCESO NO AUTORIZADO, TOKEN INCORRECTO"); //error, acceso no autorizado
                        }
                        else
                        {
                        // res.status(200).json(decoded);//le enviamos el codigo decodificado ¿SI LE QUIERO PASAR ALGO?
                            req.objeto_token=decoded;
                            console.log("Entra en decoded")
                            next();
                        }
                    })
                }
            }
            else{ 
                res.status(401).json("No bearer");
            } 
        }
        else{
             res.status(401).json("No header auth");
        }
        */
 

    console.log('comprobacionJWT desactivada');
    next();
    
};
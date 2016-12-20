module.exports = function (token,email) {

var html=`
<!DOCTYPE html>
<html>
<head>
    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>

<div>

<table bgcolor="#EEE" style="border-radius:10px;font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:16px">
    <tbody><tr style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0">  
        <td bgcolor="#003a6b" style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee"><br style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0">
            <p align="center" style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0">
                <img align="center" alt="APPAY" border="0" height="80" width="400" src="http://apis.appay.es/images/logo_web_blanco_negro%20(1).png" style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:100%;margin:0;padding:0">
            </p>
        </td>
    </tr>    
    <tr style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0">
        
        <td bgcolor="#FFFFFF" style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee">
            
            
            <div style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:600px;display:block;margin:0 auto;padding:0">
                <table style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:0">
                    <tbody><tr style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0">
                        <td style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0">
                            <p style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0">Hola ,</p>
                            <p style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0">Gracias por registrarte en appay</p>
                            <h1 style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:24px;color:#003a6b;line-height:1.2;font-weight:bold;margin:16px 0 10px;padding:0">Confirmación de registro</h1>
                            <p style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0">Queríamos comunicarte que ya formas parte oficialmente de appay. Estamos muy contentos de que hayas apostado por nosotros, así que por nuestra parte, sólo nos queda decirte que vamos a trabajar de forma incansable para que le saques el máximo partido a tu dispositivo movil para realizar tus compras de la mejor forma posible.</p>
                            <p style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0">Solo necesitamos que nos confirmes que este es tu correo (`+email+`) clickando al siguiente botón ;)</p>
                            <p style="text-align:center"><a style="border-radius:60px;text-shadow:1px 1px 3px #666666;font-family:Arial;color:#ffffff;font-size:25px;background:#003a6b;padding:5px 20px 5px 20px;border:dotted #1f628d 7px;text-decoration:none" href="http://localhost:3000/confirmarregistro?token=`+token+`">Confirmar correo</a></p>
                            <p style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0">Si el botón no funciona, por favor, copia y pega la siguiente dirección URL en tu navegador: http://localhost:3000/confirmarregistro?token=`+token+`</p>
                            <p style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0"></p>
                        </td>
                    </tr>
                </tbody></table>
            </div>
        </td>
        <td style="font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0"></td>
    </tr>
</tbody></table>
</div>
</body>
</html>
`;
return html;
};


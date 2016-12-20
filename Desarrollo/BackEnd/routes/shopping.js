var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_test_UUI3byJJ3VYLpTvFOEz3Rt1E");
var comprobacionjwt= require ('../helpers/comprobacionjwt');


router.get('/',comprobacionjwt,function(req,res){
    res.send("SHOOPING GET CORRECTO");
});


router.post('/',comprobacionjwt,function(req,res){
     console.log("ENTRA EN EL POST");
    var card_id= req.body.id;
    console.log("COSTUMER ES " + card_id);
     
    stripe.charges.create({
        amount: 10000,
        currency: 'eur',
        card: card_id
    }, 
    function(err, charge) {
        if (err) {
            console.log("ALGUN ERROR. ESPEREMOS QUE NO");
            res.json("ALGUN ERROR. ESPEREMOS QUE NO");
        } else {
            console.log("FUNCIONA CORRECTAMENTE");
            res.json("FUNCIONA CORRECTAMENTE");
        }
    });

});

module.exports = router;
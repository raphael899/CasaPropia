const path = require('path');
const express = require('express');
const app = express();
const http = require("http").Server(app);
const bodyParser = require('body-parser');
var unirest = require('unirest');
app.use(bodyParser.json());

const multer = require('multer');
const mimeTypes = require('mime-types');
const cron = require("node-cron");
const cors = require('cors');

var nombre_imagen = "";


app.use(cors());
const  storage = multer.diskStorage({

    
    destination:'public/imajenesmandar/',
    filename:function(req,file,cd){
        console.log(file);
        nombre_imagen = Date.now()+"."+mimeTypes.extension(file.mimetype);
        var res = cd("",nombre_imagen);
        console.log(res);
        
    }
});
const uppload = multer({
    storage: storage
});


var controladorsoke = "";
var access_token;

var d = new Date();
var mes = d.getMonth()+1
var fechHo = d.getFullYear()+"/"+mes+"/"+d.getDate()+" "+ d.getHours()+":"+ d.getMinutes();


/*
accountSid
produccion: 'AC9b7767beff59c92d1fbe2f9bd88dd6a2';
prueba: 'AC344ef39892c959c0b41995e332b053b2';
*/
const accountSid = 'AC9b7767beff59c92d1fbe2f9bd88dd6a2';
/*
authToken
produccion: 'a70c41345b3855abd59f060bca2b3a45';
prueba: '242369f3befd5aad4439fd7c6da1d462';
*/ 
const authToken = 'a70c41345b3855abd59f060bca2b3a45';
const client = require('twilio')(accountSid, authToken);
//const MessagingReponse = require("twilio").twiml.MessagingResponse;

//servidor





//servido
const server = app.listen(3000,()=>{
    console.log(`hola`);
});


const SocketIO = require('socket.io');
const io = SocketIO(server);






  
    
app.use(bodyParser.urlencoded({extended: true}));

unirest.post('https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.93f6856e24e40b9cf4b387e5b3865f36.91208382cae502b0d33e637a4c9df8e0&client_id=1000.WC3KEEKK12E341WJO5X5SDYNDSWLPI&client_secret=e0cfac56f74b71618d65bdf2fba21d24d116b50e23&grant_type=refresh_token')
.header('Accept', 'application/json')
.end(function (response) {

  access_token = response.body.access_token;

io.on('connection',(socket)=>{

    console.log("hola si hago conexion");
    socket.on('chat:message', (data) => {

        io.sockets.emit('chat:message', data);
        var mensewp = data.Mensage;
        var numwp = data.numclien;
        client.messages.create({
            
            from: 'whatsapp:+17863475781',
            body: mensewp,
            to: 'whatsapp:'+numwp
        }).then(message => console.log(message));
        var json ={
            
            from: 'whatsapp:+17863475781',
            body: mensewp,
            to: 'whatsapp:'+numwp
        }
        console.log(json);

    })






    /*
    app.post('/resivirsms', (req, res)=>{
        var numero_cliente = req.body.From;
        numero_cliente.substr(12,23)
        var datajs = {"mensaje":req.body.Body,"numclien":numero_cliente.substr(12,23)};
        io.sockets.emit('chat:message2', datajs);
    });
    */
    app.get('/mandarwpplantilla', (req, res) => {
        var nombre = req.query.nombre
        var numwp = req.query.numwp
        var datajs = {
            "mensaje":"Somos Visión Tecno, Partner Avanzado de Zoho, queremos mantener actualizada la información de su cuenta y productos Zoho para {"+nombre+"} Para iniciar por favor confírmenos su interés en mantenerse actualizado en Zoho contestando este mensaje.",
            "numclien":numwp
        };
        io.sockets.emit('chat:message3', datajs);
    
        client.messages.create({
            from: 'whatsapp:+17863475781',//17863475781 real // 14155238886 prueba
            body: "Somos Visión Tecno, Partner Avanzado de Zoho, queremos mantener actualizada la información de su cuenta y productos Zoho para {"+nombre+"} Para iniciar por favor confírmenos su interés en mantenerse actualizado en Zoho contestando este mensaje.",
            to: 'whatsapp:'+numwp
        }).then(message => res.send(message));
            var jsn = {
                from: 'whatsapp:+17863475781',//17863475781 real // 14155238886 prueba
                body: "Somos Visión Tecno, Partner Avanzado de Zoho, queremos mantener actualizada la información de su cuenta y productos Zoho para {"+nombre+"} Para iniciar por favor confírmenos su interés en mantenerse actualizado en Zoho contestando este mensaje.",
                to: 'whatsapp:+descargar ruaf '+numwp
            }
            res.send(jsn)
      });



      socket.on('chat:message_imagen', (data) => {
        
        
        var numcliente  = data.numclien;
        var idcliente = data.idcliente;
        var numbreimagen = data.numbreimagen;

        app.post("/files",uppload.single('avatar') ,(req, res)=>{
            //res.send("Carga perfecta");
            //console.log(uppload.single('avatar'));
            var mensewp ="https://addapptech.com/wppvisiontecnoimajenesmandar/"+nombre_imagen;//+nombre_imagen;
            var datamandar = {"idcliente":idcliente,"numclien":numcliente,"imagenmanda":mensewp,"numbreimagen":numbreimagen};

            console.log(datamandar);
            
            io.sockets.emit('chat:message_imagen', datamandar);
            if(numbreimagen == null || numbreimagen == "" || numbreimagen == undefined){
                console.log(access_token);
                unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                .header('Accept', 'application/json')
                .header('Authorization','Zoho-oauthtoken '+access_token)
                .send('{"data": [{"mensaje":"'+mensewp+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numcliente+'","responde":true,"Cliente":"'+idcliente+'","fecha_hora_wpp":"'+fechHo+'","Imagen":true}]}')
                .end(function (response) {
                    console.log("hoooooooooooooooooooooooolaaaaaaaaaaaaaaaaaaaaaaaa");
                    console.log(response.body);
                });
        
            }else {
                console.log(access_token);
                unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                .header('Accept', 'application/json')
                .header('Authorization','Zoho-oauthtoken '+access_token)
                .send('{"data": [{"mensaje":"'+mensewp+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numcliente+'","responde":true,"Cliente":"'+idcliente+'","fecha_hora_wpp":"'+fechHo+'","Imagen":true,"Mensaje_Imagen":'+numbreimagen+'}]}')
                .end(function (response) {
                    console.log("hoooooooooooooooooooooooolaaaaaaaaaaaaaaaaaaaaaaaa");
                    console.log(response.body);
                });
                
            }

        
            
            client.messages.create({
                from: 'whatsapp:+17863475781',//17863475781 real // 14155238886 prueba
                body: numbreimagen,
                mediaUrl:mensewp,
                to: 'whatsapp:'+numcliente
            }).then(message => console.log("message"));
            
        });

    })



});



/*

*/





app.post('/resivirsms', (req, res)=>{
    console.log(req.body);
    var tipomensa = req.body.NumMedia;
    var numero_cliente = req.body.From;
    
    if(tipomensa == 1){
        var mensClien = req.body.MediaUrl0;
        var tipomedia =req.body.MediaContentType0;
    }else{
        var mensClien = req.body.Body;
        var tipomedia = "";
    }
    
    var datajs = {"mensaje":mensClien,"numclien":numero_cliente.replace('whatsapp:', ''),"tipomensaje":tipomensa,"tipodemedia":tipomedia};
    console.log(datajs);
    var resio=io.sockets.emit('chat:message2', datajs);
    var numeroCli = numero_cliente.replace('whatsapp:', '');//.substr(12,23);


        
        let param = encodeURIComponent(numeroCli)
        console.log(param);
        unirest.get('https://www.zohoapis.com/crm/v2/Contacts/search?criteria=((Mobile:equals:'+param+'))')
        .header('Accept', 'application/json')
        .header('Authorization','Zoho-oauthtoken '+access_token)
        .end(function (response) {
            
            console.log(response.body);
            var respuestabus = response.status;
            console.log(respuestabus);
            if(respuestabus == 200){
                var idClien = response.body.data[0].id;



                console.log(tipomensa);
                console.log(tipomedia);

                if(tipomensa > 0){
                    if(tipomedia == "image/jpeg"){
                        unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                        .header('Accept', 'application/json')
                        .header('Authorization','Zoho-oauthtoken '+access_token)
                        .send('{"data": [{"mensaje":"'+mensClien+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numeroCli+'","responde":false,"Cliente":"'+idClien+'","fecha_hora_wpp":"'+fechHo+'","Imagen":true}]}')
                        .end(function (response) {
                            console.log(response.body);
                        });

                    }else{
                        unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                        .header('Accept', 'application/json')
                        .header('Authorization','Zoho-oauthtoken '+access_token)
                        .send('{"data": [{"mensaje":"'+mensClien+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numeroCli+'","responde":false,"Cliente":"'+idClien+'","fecha_hora_wpp":"'+fechHo+'","Audio":true}]}')
                        .end(function (response) {
                            console.log(response.body);
                        });
                    }

                }else{


                    unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                    .header('Accept', 'application/json')
                    .header('Authorization','Zoho-oauthtoken '+access_token)
                    .send('{"data": [{"mensaje":"'+mensClien+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numeroCli+'","responde":false,"Cliente":"'+idClien+'","fecha_hora_wpp":"'+fechHo+'"}]}')
                    .end(function (response) {
                        console.log(response.body);
                    });
                }





                
            }else{
                unirest.get('https://www.zohoapis.com/crm/v2/Leads/search?criteria=((Mobile:equals:'+param+'))')
                .header('Accept', 'application/json')
                .header('Authorization','Zoho-oauthtoken '+access_token)
                .end(function (response2) {
                    
                    var respuestabus2 = response2.status;
                    console.log(respuestabus2);
                    if(respuestabus2 == 200){
                        
                        if(tipomensa > 0){
                            if(tipomedia == "image/jpeg"){

                                var idClien = response2.body.data[0].id;
                                unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                                .header('Accept', 'application/json')
                                .header('Authorization','Zoho-oauthtoken '+access_token)
                                .send('{"data": [{"mensaje":"'+mensClien+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numeroCli+'","responde":false,"Posible_Cliente":"'+idClien+'","fecha_hora_wpp":"'+fechHo+'","Imagen":true}]}')
                                .end(function (response3) {
                                });

                            }else{


                                var idClien = response2.body.data[0].id;
                                unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                                .header('Accept', 'application/json')
                                .header('Authorization','Zoho-oauthtoken '+access_token)
                                .send('{"data": [{"mensaje":"'+mensClien+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numeroCli+'","responde":false,"Posible_Cliente":"'+idClien+'","fecha_hora_wpp":"'+fechHo+'","Audio":true}]}')
                                .end(function (response3) {
                                });
                            }

                        }else{

                            var idClien = response2.body.data[0].id;
                            unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                            .header('Accept', 'application/json')
                            .header('Authorization','Zoho-oauthtoken '+access_token)
                            .send('{"data": [{"mensaje":"'+mensClien+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numeroCli+'","responde":false,"Posible_Cliente":"'+idClien+'","fecha_hora_wpp":"'+fechHo+'"}]}')
                            .end(function (response3) {
                            });
                        }


                    }else {
                        unirest.post('https://www.zohoapis.com/crm/v2/Leads')
                        .header('Accept', 'application/json')
                        .header('Authorization','Zoho-oauthtoken '+access_token)
                        .send('{"data": [{"Email":"posiblecliente@gmail.com","Owner": "461888000021433001","Mobile":"'+numeroCli+'","Last_Name":"Contacto","First_Name":"WhatsApp"}]}')
                        .end(function (response) {
                        });


                        unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                        .header('Accept', 'application/json')
                        .header('Authorization','Zoho-oauthtoken '+access_token)
                        .send('{"data": [{"mensaje":"'+mensClien+'","Owner": "461888000021433001","numero_cliente":"'+'cel'+numeroCli+'","responde":false,"fecha_hora_wpp":"'+fechHo+'"}]}')
                        .end(function (response4) {
                        });

                        respuestabus2 = 200;
                    }
                }); 
            }
        });  
    
    });

});

app.get('/mandarwppperido', (req, res) => {
    console.log(req);
    var mensewp = req.query.mensewp;
    var numwp = req.query.numwp;
        client.messages.create({
            from: 'whatsapp:+17863475781',//17863475781 real // 14155238886 prueba
            body: mensewp,
            to: 'whatsapp:+57'+numwp
        }).then(message => {
            console.log(req);
            res.send('hola');
        });
        res.send('hola');
});



app.post('/pruebaConsumo', (req, res)=>{
    var nombreempresa = req.query.nombreempresa;
    var nombrecandidato = req.query.nombrecandidato;
    res.send('Saludos Cordiales y bendiciones '+nombrecandidato+' ya estas a poco de ser parte del quipo de desarrolladores de '+nombreempresa+' te deseamos muchos éxitos');

});





/*

app.get('/mensajetext',(req, res)=>{
client.messages.create({ 
         body: 'hola don jaime', 
         from: '+12058097502',       
         to: '+573155337490' 
       }) 
      .then(message => res.send(message)) 
      .done();
})

*/

//archivos estaticos que van al navegador
app.use(express.static(path.join(__dirname,'public')));
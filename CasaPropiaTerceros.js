const path = require('path');
const express = require('express');
const app = express();
const http = require("http").Server(app);
const bodyParser = require('body-parser');
//var unirest = require('unirest');
app.use(bodyParser.json());

const multer = require('multer');
const mimeTypes = require('mime-types');
const cron = require("node-cron");
const cors = require('cors');

const server = app.listen(3013,()=>{
    console.log("http://localhost:3013/");
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

app.use(bodyParser.urlencoded({extended: true}));

var dbConn = require('./config/db.config');
// define a root route
app.use(express.static(path.join(__dirname,'public')));

const accountSid = "AC5bd81154d94c4813810a92551ce24aee";
const authToken = "ec3d797688d29c24cd8d208e870e6c95";
const client = require('twilio')(accountSid, authToken);

io.on('connection',(socket)=>{
    /*
    socket.on('consulta:consultaFuncion', (data) => {
        dbConn.query("SELECT * FROM funciones order by fu_nombre", function (err, res) {
            if(err) {
                console.log("error: ", err);
                //result(null, err);
            }
            else{
                var jsonmandcon ={"res":res,}
                dbConn.query("SELECT * FROM Empresa order by em_nombre", function (err, res) {
                    var jsonmandcon1 ={"res1":res}
                    dbConn.query("select * from Integrcion order by in_nombre", function (err, res) {
                        var jsonmandcon2 ={"res2":res}
                        var jsonmandartodo ={"data_funiones":jsonmandcon, "data_empresa":jsonmandcon1, "data_integracion":jsonmandcon2};
                        io.sockets.emit('consulta:consultaFuncion', jsonmandartodo);
                        
                    });
                });
            }
        });
    })
    socket.on('consulta:consultasqlintergracion', (data) => {
        console.log(data);
        dbConn.query("SELECT * FROM Empresa order by em_nombre", function (err, res) {
            if(err) {
                console.log("error: ", err);
                //result(null, err);
            }
            else{
                //console.log('employees : ', res);
                io.sockets.emit('consulta:consultasqlintergracion', res);
                //result(null, res);
            }
        });
    })


    socket.on('consulta:consultasIntegracionFunciones', (data) => {
        console.log(data);
        dbConn.query("select * from Integrcion order by in_nombre", function (err, res) {
            if(err) {
                console.log("error: ", err);
                //result(null, err);
            }
            else{
                //console.log('employees : ', res);
                io.sockets.emit('consulta:consultasIntegracionFunciones', res);
                //result(null, res);
            }
        });
    })

    socket.on('consulta:consultasqlfunciones', (data) => {
        console.log(data);
        dbConn.query("SELECT * FROM Empresa order by em_nombre", function (err, res) {
            if(err) {
                console.log("error: ", err);
                //result(null, err);
            }
            else{
                //console.log('employees : ', res);
                io.sockets.emit('consulta:consultasqlfunciones', res);
                //result(null, res);
            }
        });
    })
    socket.on('consulta:consultasql', (data) => {
        console.log(data);
        dbConn.query("SELECT * FROM Empresa order by em_nombre", function (err, res) {
            if(err) {
                console.log("error: ", err);
                //result(null, err);
            }
            else{
                //console.log('employees : ', res);
                io.sockets.emit('consulta:consultasql', res);
                //result(null, res);
            }
        });
    })
    */
    /*
    socket.on('consulta:guardarproyectosql', (data) => {
        console.log(data.nombreProyecto);
        console.log(data.correoProyecto);
        console.log(data.contrasenaProyecto);
        console.log(data.descripcionProyecto);
        console.log("INSERT INTO Empresa (em_nombre, em_contrasena, em_correo, em_descripcion) values('"+data.nombreProyecto+"', '"+data.contrasenaProyecto+"', '"+data.correoProyecto+"','"+data.descripcionProyecto+"')");
        dbConn.query("INSERT INTO Empresa (em_nombre, em_contrasena, em_correo, em_descripcion) values('"+data.nombreProyecto+"', '"+data.contrasenaProyecto+"', '"+data.correoProyecto+"','"+data.descripcionProyecto+"')", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{

                io.sockets.emit('consulta:guardarproyectosql', res.insertId);
                console.log(res.insertId);
            }
        });
        
    })
    */
    /*
    socket.on('consulta:eliminarproyecto',(data)=>{
        console.log(data);
        dbConn.query("DELETE FROM Empresa WHERE id_empresa ="+data+" ", function (err, res) {
            if(err) {
                console.log("error: ", err);
            }
            else{
                io.sockets.emit('consulta:eliminarproyecto', res);
            }
        }); 
        

    })//
    */
    /*
    socket.on('consulta:actualizarproyectosql', (data) => {  

        dbConn.query("UPDATE Empresa SET em_nombre='"+data.nombreProyecto+"',em_contrasena='"+data.contrasenaProyecto+"',em_correo='"+data.correoProyecto+"',em_descripcion='"+data.descripcionProyecto+"' WHERE id_empresa = "+data.id+"",function (err, res) {
            if(err) {
                console.log("error: ", err);
                
            }else{   
                console.log(err);
                io.sockets.emit('consulta:actualizarproyectosql', res);
            }
        });
        
    })

    */
    /*
    socket.on('consulta:guardarintegracionsql', (data) => {

        var in_nombre = data.in_nombre;
        var in_tipo = data.in_tipo;
        var in_provedor = data.in_provedor;
        var in_url = data.in_url;
        var in_descripcion = data.in_descripcion;
        var id_empresa = data.id_empresa;
        

        dbConn.query("INSERT INTO Integrcion (in_nombre, in_tipo, in_provedor, in_url, in_descripcion, id_empresa) values('"+in_nombre+"', '"+in_tipo+"', '"+in_provedor+"', '"+in_url+"', '"+in_descripcion+"', '"+id_empresa+"')", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{

                io.sockets.emit('consulta:guardarintegracionsql', res.insertId);
                console.log(res.insertId);
            }
        });
        
    })
    */
    ///consulta:consultasqlwhere
    socket.on('consulta:consultasqlwhere', (data) => {
        console.log(data);
        dbConn.query("SELECT * FROM Integrcion WHERE id_empresa = "+data+" ", function (err, res) {
            if(err) {
                console.log("error: ", err);
                //result(null, err);
            }
            else{
                console.log('employees : ', res);
                io.sockets.emit('consulta:consultasqlwhere', res);
                //result(null, res);
            }
        });
    })

    /*
    socket.on('consulta:actualizarIntegracionsql', (data) => {  

        console.log(data);
        dbConn.query("UPDATE Integrcion SET in_nombre='"+data.in_nombre+"',in_tipo='"+data.in_tipo+"',in_provedor='"+data.in_provedor+"',in_url='"+data.in_url+"',in_descripcion = '"+data.in_descripcion+"' WHERE id_integracion = "+data.id_integracion+"",function (err, res) {
            if(err) {
                console.log("error: ", err);
                
            }else{   
                console.log(err);
                io.sockets.emit('consulta:actualizarIntegracionsql', res);
            }
        });
        
    })
    */
    //eliminarIntegracion
    /*
    socket.on('consulta:eliminarIntegracion',(data)=>{
        console.log(data);
        dbConn.query("DELETE FROM Integrcion WHERE id_integracion ="+data+" ", function (err, res) {
            if(err) {
                console.log("error: ", err);
            }
            else{
                io.sockets.emit('consulta:eliminarIntegracion', res);
            }
        }); 
    })
    */
    /*
    socket.on('consulta:guardarFuncionsql', (data) => {

        var fu_nombre = data.fu_nombre;
        var fu_descripcion = data.fu_descripcion;
        var fu_objetivo = data.fu_objetivo;
        var fu_lugar_desarrollo = data.fu_lugar_desarrollo;
        var fu_tipo = data.fu_tipo;
        var fu_codigo = data.fu_codigo;
        var id_integracion = data.id_integracion;
        var id_empresa = data.id_empresa;

        dbConn.query("INSERT INTO funciones (fu_nombre, fu_descripcion, fu_objetivo, fu_lugar_desarrollo, fu_tipo, fu_codigo, id_integracion, id_empresa) values('"+fu_nombre+"', '"+fu_descripcion+"', '"+fu_objetivo+"', '"+fu_lugar_desarrollo+"', '"+fu_tipo+"', '"+fu_codigo+"', '"+id_integracion+"', '"+id_empresa+"')", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{

                io.sockets.emit('consulta:guardarFuncionsql', res.insertId);
                console.log(res.insertId);
            }
        });
        
    })
    */
    /*
    socket.on('consulta:eliminarFuncion',(data)=>{
        console.log(data);
        dbConn.query("DELETE FROM funciones WHERE fu_id ="+data+" ", function (err, res) {
            if(err) {
                console.log("error: ", err);
            }
            else{
                io.sockets.emit('consulta:eliminarFuncion', res);
            }
        }); 
    })
    */
    /*
    socket.on('consulta:actualizarFuncionsql', (data) => {  
        var fu_codigo = data.fu_codigo;
        var fu_descripcion = data.fu_descripcion;
        var fu_id = data.fu_id;
        var fu_lugar_desarrollo = data.fu_lugar_desarrollo;
        var fu_nombre = data.fu_nombre;
        var fu_objetivo = data.fu_objetivo;
        var fu_tipo = data.fu_tipo;
        var id_empresa = data.id_empresa;
        var id_integracion = data.id_integracion;
        dbConn.query("UPDATE funciones SET fu_codigo = '"+fu_codigo+"', fu_descripcion = '"+fu_descripcion+"', fu_lugar_desarrollo = '"+fu_lugar_desarrollo+"', fu_nombre = '"+fu_nombre+"', fu_objetivo = '"+fu_objetivo+"', fu_tipo = '"+fu_tipo+"', id_empresa = '"+id_empresa+"', id_integracion = '"+id_integracion+"' WHERE fu_id = "+fu_id+"",function (err, res) {
            if(err) {
                console.log("error: ", err);
                
            }else{   
                console.log(err);
                io.sockets.emit('consulta:actualizarFuncionsql', res);
            }
        });
        
    })
    
    */
    socket.on('consulta:consultaSQL', (data) => {  
        console.log("holaaaa");
        dbConn.query("SELECT * FROM tbl_terceros ", function (err, res) {
            if(err) {
                console.log("error: ", err);
                io.sockets.emit('consulta:consultaSQL', err);
                //result(null, err);
            }
            else{
                io.sockets.emit('consulta:consultaSQL', res);
            }
        });
        
    })



})


app.get('/consulta', (req, res1) =>{
    var query = "";


});

app.post('/prueba', (req, res) => {
    console.log(req.body.ter_nombre);
    var ter_nombre = req.body.ter_nombre;
    var ter_tipo_servicio = req.body.ter_tipo_servicio;
    var ter_fuente = req.body.ter_fuente;
    var ter_estado_fase = req.body.ter_estado_fase;
    var ter_pais = req.body.ter_pais;
    var ter_canal_ventas = req.body.ter_canal_ventas;
    var ter_fecha_creacion = req.body.ter_fecha_creacion;
    var ter_fechas_conversion = req.body.ter_fechas_conversion;
    var ter_propietario = req.body.ter_propietario;
    var ter_co_propietario = req.body.ter_co_propietario;
    var ter_interes_montizacion = req.body.ter_interes_montizacion;
    var ter_interes_venta = req.body.ter_interes_venta;
    var ter_interes_credito = req.body.ter_interes_credito;
    var ter_id_CRM_ZOHO = req.body.ter_id_CRM_ZOHO;
    var ter_email = req.body.ter_email;
    var ter_apellido = req.body.ter_apellido;
    var ter_movil = req.body.ter_movil;
    var ter_movilwhatsapp = req.body.ter_movilwhatsapp;
    var ter_estado = req.body.ter_estado;
    var ter_ciudad = req.body.ter_ciudad;
    var ter_detallefuente = req.body.ter_detallefuente;
    var ter_ede = req.body.ter_ede;
    var ter_ciudadinteres = req.body.ter_ciudadinteres;
    var ter_sexo = req.body.ter_sexo;
    var ter_motivoPospusoCompra = req.body.ter_motivoPospusoCompra;
    var ter_profesion = req.body.ter_profesion;
    var ter_estadocivil = req.body.ter_estadocivil;
    var ter_isConverted = req.body.ter_isConverted;
    var ter_ConvertedTime = req.body.ter_ConvertedTime;
    var ter_asistenteDeFeria = req.body.ter_asistenteDeFeria;
    var ter_avanceDeNegocio = req.body.ter_avanceDeNegocio;
    var ter_noParticipanCorreoEletronico = req.body.ter_noParticipanCorreoEletronico;
    var ter_anoPaisResidencia = req.body.ter_anoPaisResidencia;
    var ter_MedioPrefiereContactado = req.body.ter_MedioPrefiereContactado;
    var ter_propsitoCompra = req.body.ter_propsitoCompra;
    var ter_tipoDeVivienda = req.body.ter_tipoDeVivienda;
    var ter_zona = req.body.ter_zona;
    var ter_motivo = req.body.ter_motivo;
    var ter_puntuacionVisitante = req.body.ter_puntuacionVisitante;
    var ter_primeraPaginaVisitada = req.body.ter_primeraPaginaVisitada;
    var ter_tipoter = req.body.ter_tipoter;
    var ter_idase = req.body.ter_idase;
    
    dbConn.query("INSERT INTO tbl_terceros (ter_nombre, ter_tipo_servicio, ter_fuente, ter_estado_fase, ter_pais, ter_canal_ventas, ter_fecha_creacion, ter_fechas_conversion, ter_propietario, ter_co_propietario, ter_interes_montizacion, ter_interes_venta, ter_interes_credito, ter_id_CRM_ZOHO, ter_email, ter_apellido, ter_movil, ter_movilwhatsapp, ter_estado, ter_ciudad, ter_detallefuente, ter_ede, ter_ciudadinteres, ter_sexo, ter_motivoPospusoCompra, ter_profesion, ter_estadocivil, ter_isConverted, ter_ConvertedTime, ter_asistenteDeFeria, ter_avanceDeNegocio, ter_noParticipanCorreoEletronico, ter_anoPaisResidencia, ter_MedioPrefiereContactado, ter_propsitoCompra, ter_tipoDeVivienda, ter_zona, ter_motivo, ter_puntuacionVisitante, ter_primeraPaginaVisitada, ter_tipoter, ter_idase) values('"+ter_nombre+"', '"+ter_tipo_servicio+"', '"+ter_fuente+"', '"+ter_estado_fase+"', '"+ter_pais+"', '"+ter_canal_ventas+"', '"+ter_fecha_creacion+"', '"+ter_fechas_conversion+"', '"+ter_propietario+"', '"+ter_co_propietario+"', '"+ter_interes_montizacion+"', '"+ter_interes_venta+"', '"+ter_interes_credito+"', '"+ter_id_CRM_ZOHO+"', '"+ter_email+"', '"+ter_apellido+"', '"+ter_movil+"', '"+ter_movilwhatsapp+"', '"+ter_estado+"', '"+ter_ciudad+"', '"+ter_detallefuente+"', '"+ter_ede+"', '"+ter_ciudadinteres+"', '"+ter_sexo+"', '"+ter_motivoPospusoCompra+"', '"+ter_profesion+"', '"+ter_estadocivil+"', '"+ter_isConverted+"', '"+ter_ConvertedTime+"', '"+ter_asistenteDeFeria+"', '"+ter_avanceDeNegocio+"', '"+ter_noParticipanCorreoEletronico+"', '"+ter_anoPaisResidencia+"', '"+ter_MedioPrefiereContactado+"', '"+ter_propsitoCompra+"', '"+ter_tipoDeVivienda+"', '"+ter_zona+"', '"+ter_motivo+"', '"+ter_puntuacionVisitante+"', '"+ter_primeraPaginaVisitada+"', '"+ter_tipoter+"','"+ter_idase+"')", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            //io.sockets.emit('consulta:guardarFuncionsql', res.insertId);
            console.log(res.insertId);
        }
    });
    //var mensewp = req.query.mensewp;
    
    res.send('hola');
});


app.post('/resivirsms', (req, res)=>{

    var hoy = new Date();
    var ano_actual = hoy.getFullYear();
    var  mes_actual = ( hoy.getMonth() + 1 );
    var dia_Actual = hoy.getDate();
    var hora_Actual = hoy.getHours();
    var minutos_actual = hoy.getMinutes();
    var segundos_Actual = hoy.getSeconds();

    if(hora_Actual > 10){
        hora_Actual = "0"+hora_Actual;
    }

    if(minutos_actual > 10){
        minutos_actual = "0"+minutos_actual;
    }


    if(segundos_Actual > 10){
        segundos_Actual = "0"+segundos_Actual;
    }



    if(mes_actual < 10){
        mes_actual = "0"+mes_actual;
    }

    if(dia_Actual < 10){
        dia_Actual = "0"+dia_Actual;
    }



    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fecha_actual = ano_actual+"-"+mes_actual+"-"+dia_Actual;
    var hora_actula2 = hora_Actual+":"+minutos_actual+":"+segundos_Actual;
    console.log(fecha_actual);
    var fechaYHora = fecha_actual + ' ' + hora_actula2;

    dbConn.query("SELECT * FROM tbl_WhatsApp WHERE wpp_numero = '"+req.body.WaId+"' ORDER BY wpp_clave_int DESC LIMIT 1", function (err, res) {
        if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else{
            if(res.length > 0){
                dbConn.query("SELECT * FROM tbl_WhatsApp WHERE wpp_numero = '"+req.body.WaId+"' and wpp_canalsel > 0 ORDER BY wpp_clave_int DESC LIMIT 1", function (err, res) {
                    if(err) {
                        console.log("error: ", err);
                        //result(null, err);
                    }
                    else{
                        if(res.length > 0){


                            
                        }else{
                            var respuesta  = req.body.Body;
                            console.log(respuesta +"!="+ 1);
                             if(respuesta  == 1 || respuesta == 2 || respuesta == 3){
                                 var credito = 0;
                                 var monetizacion = 0;
                                 var venta = 0;
                                 
                                 if(req.body.Body == 1){
                                     credito = 1;
                                 }else if(req.body.Body == 2){
                                     monetizacion = 1;
                                 }else if(req.body.Body == 3){
                                     venta = 1;
                                 }
                                 
                                 dbConn.query("INSERT INTO tbl_WhatsApp (wpp_credito, wpp_venta, wpp_monitaion, wpp_respuesta, wpp_numero, wpp_asesor,wpp_fecha,wpp_canalsel) values('"+credito+"', '"+venta+"', '"+monetizacion+"', '"+req.body.Body+"', '"+req.body.WaId+"', '0', '"+fechaYHora+"',"+respuesta+")", function (err, res) {
                                     if(err) {
                                         console.log("error: ", err);
                                         result(err, null);
                                     }
                                     else{
                                         var mensaje1 = "";
                                         mensaje1 = mensaje1+`De acuerdo con tu solicitud uno de nuestros asesores especializados te contactará cuanto antes vía WhatsApp.\n`;
                                         mensaje1 = mensaje1+`Gracias por escribirnos. Con Casa Propia Colombia, estar en casa de nuevo es posible. 🇨🇴💰`;
                                         client.messages
                                             .create({
                                                 from: 'whatsapp:+14155238886',
                                                 body: mensaje1,
                                                 to: 'whatsapp:+573016912275'
                                         }).then(message => {
                         
                                         });
                                     }
                                 });
             
             
                             }else{
                         
                                 var mensaje1 = "";
             
                                 mensaje1 = mensaje1+`La opción que seleccionaste no es correcta\n`; 
                                 mensaje1 = mensaje1+`Marca uno de los siguientes números para ayudarte con tu solicitud. ¿En qué servicio estas interesado?:\n`; 
                                 mensaje1 = mensaje1+`1.	Compra de vivienda🏡\n`; 
                                 mensaje1 = mensaje1+`2.	Financiación de vivienda en Colombia💰\n`; 
                                 mensaje1 = mensaje1+`3.	Asesoría en compra y financiación de vivienda en Colombia🏠💰\n\n`; 
                                 
                                 mensaje1 = mensaje1+`Con el número de solicitud que seleccionas no es posible asesorarte. Te recomendamos buscar otro canal de atención\n`; 
                                 mensaje1 = mensaje1+`en el siguiente link: https://www.casapropiaenlinea.co para poderte ayudar 🏠💰 \n`
             
                                     
                                 client.messages
                                 .create({
                                     from: 'whatsapp:+14155238886',
                                     body: mensaje1,
                                     to: 'whatsapp:+573016912275'
                                 }).then(message => {
             
                                 });
                             }
                        }
                    }
                });

            }else{
                var credito = 0;
                var monetizacion = 0;
                var venta = 0;

     
                dbConn.query("INSERT INTO tbl_WhatsApp (wpp_credito, wpp_venta, wpp_monitaion, wpp_respuesta, wpp_numero, wpp_asesor,wpp_fecha) values('"+credito+"', '"+venta+"', '"+monetizacion+"', '"+req.body.Body+"', '"+req.body.WaId+"', '0', '"+fechaYHora+"')", function (err, res) {
                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else{
                        console.log(res.insertId);
                    }
                });
  
                var mensaje1 = "";

                mensaje1 = mensaje1+`¡Hola! Somos Casa Propia Colombia 🏡, propiedad de las constructoras Amarilo, Colpatria y Marval y canal\n`;
                mensaje1 = mensaje1+`autorizado en el exterior de los bancos más importantes del país. Soy tu asistente virtual 🤖 y estoy para \n`;
                mensaje1 = mensaje1+`ayudarte a cumplir tu sueño de tener casa propia en Colombia🇨🇴. \n\n`;
                mensaje1 = mensaje1+`Marca uno de los siguientes números para ayudarte con tu solicitud. ¿En qué servicio estas interesado?:\n\n`;
                mensaje1 = mensaje1+`1.	Compra de vivienda🏠\n\n`;
                mensaje1 = mensaje1+`2.	Financiación de vivienda en Colombia💰 \n\n`;
                mensaje1 = mensaje1+`3.	Asesoría en compra y financiación de vivienda en Colombia🏠💰`;


                client.messages
                    .create({
                        from: 'whatsapp:+14155238886',
                        body: mensaje1,
                        to: 'whatsapp:+573016912275'
                }).then(message => {

                });
            }
        }
    });
});
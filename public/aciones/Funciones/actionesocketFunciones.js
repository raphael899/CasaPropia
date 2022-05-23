
function consultaFuncionesProyecto(){
    socket.emit('consulta:consultasqlfunciones','consultar');
    socket.emit('consulta:consultasIntegracionFunciones','consultar');
}

socket.on('consulta:consultasqlfunciones',function(data){
    console.log(data);
    var nummax = data.length;
    for(var i = 0 ; i < nummax ; i++){
        var em_id = data[i].id_empresa;
        var em_correo = data[i].em_correo;
        var em_nombre = data[i].em_nombre;
        var em_contrasena = data[i].em_contrasena;
        var em_descripcion = data[i].em_descripcion;
        $("#selProyecto").append('<option value="'+em_id+'" onchange=consultarIntegracion('+em_id+')>'+em_nombre+'</option>');
    }
});



socket.on('consulta:consultasIntegracionFunciones',function(data){
    console.log(data);
    var nummax = data.length;
    for(var i = 0 ; i < nummax ; i++){
        var id_integracion = data[i].id_integracion;
        var in_nombre = data[i].in_nombre;
        $("#selIntegraciones").append('<option value="'+id_integracion+'">'+in_nombre+'</option>');
    }
});


function GuardarFuncion(){
    var fu_nombre = $("#numbreFuncion").val();
    var fu_descripcion = $("#descripcionFuncion").val();
    var fu_objetivo = $("#bjetivoFuncion").val();
    var fu_lugar_desarrollo = $("#lugarFuncion").val();
    var fu_tipo = $("#TipoFuncion").val();
    var fu_codigo = $("#codigoFuncion").val();
    var id_integracion = $("#selIntegraciones").val();
    var id_empresa = $("#selProyecto").val();

    var datosaguardar = {"fu_nombre":fu_nombre,"fu_descripcion":fu_descripcion,"fu_objetivo":fu_objetivo,"fu_lugar_desarrollo":fu_lugar_desarrollo,"fu_tipo":fu_tipo,"fu_codigo":fu_codigo,"id_integracion":id_integracion,"id_empresa":id_empresa}

    console.log(datosaguardar);

    
    socket.emit('consulta:guardarFuncionsql', datosaguardar);



    socket.on('consulta:guardarFuncionsql',function(data){
        if(data > 0){
            consultarfunciones();
            Swal.fire(
                'Guardado',
                'Funcion ingresado correctamente',
                'success',
            )
        }
        
    })
    $("#numbreFuncion").val('');
    $("#descripcionFuncion").val('');
    $("#bjetivoFuncion").val('');
    $("#lugarFuncion").val('');
    $("#TipoFuncion").val('');
    $("#codigoFuncion").val('');
}   


function selselcion(fu_id, id_empresa, id_integracion){
    


    setTimeout(function () {
        console.log(fu_id);
        $("#selProyecto_"+fu_id+" option[value="+ id_empresa +"]").attr("selected",true);
        $("#selIntegraciones_"+fu_id+" option[value="+ id_integracion +"]").attr("selected",true);     
    }, 1000);
}

function consultarfunciones(){
    socket.emit('consulta:consultaFuncion',"id_empresa");
    socket.on('consulta:consultaFuncion',function(data){
        console.log(data);
        var nummax = data.data_funiones.res.length;
        //tablacontenidointegracion
        var htmltabla = '';
       

        for(var i = 0 ; i < nummax ; i++){
            var fu_id =data.data_funiones.res[i].fu_id;

            var id_empresa = data.data_funiones.res[i].id_empresa;
            var id_integracion = data.data_funiones.res[i].id_integracion;
            selselcion(fu_id, id_empresa, id_integracion);

            htmltabla = htmltabla+'<div class="container"  style="background-color: #0000006e; border: solid 2px; border-radius: 5px; border-color: #000000;">';
                htmltabla = htmltabla+'<style> ';
                    htmltabla = htmltabla+'#infoclien_'+fu_id+'{display: none;}';
                htmltabla = htmltabla+'</style>';

                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<a class="btn btn-block btn-xs" onclick="verinfo('+fu_id+')" style="font-size: 20px; color: #fff6f6;"><p style="float:left;">funcion: '+data.data_funiones.res[i].fu_nombre+' &nbsp;</p></a>';
                htmltabla = htmltabla+'</div>';
        
                htmltabla = htmltabla+'<div class="row"  id="infoclien_'+fu_id+'">';
                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Proyecto &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<select name="selProyecto_'+fu_id+'" id="selProyecto_'+fu_id+'" class="inputTextSele">';
                            var nummax2 = data.data_empresa.res1.length;
                            htmltabla = htmltabla+ '<option value="0">Seleccionar...</option>';
                            for(var j = 0; j < nummax2 ; j++){
                                htmltabla = htmltabla+ '<option value="'+data.data_empresa.res1[j].id_empresa+'">'+data.data_empresa.res1[j].em_nombre+'</option>';
                            }
                        htmltabla = htmltabla+'</select>';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';

                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Integracion &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<select name="selIntegraciones_'+fu_id+'" id="selIntegraciones_'+fu_id+'" class="inputTextSele">';
                            var nummax2 = data.data_integracion.res2.length;
                            htmltabla = htmltabla+ '<option value="0">Seleccionar...</option>';
                            for(var p = 0; p < nummax2 ; p++){
                                htmltabla = htmltabla+ '<option value="'+data.data_integracion.res2[p].id_integracion+'">'+data.data_integracion.res2[p].in_nombre+'</option>';
                            }
                        htmltabla = htmltabla+'</select>';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';

                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Nombre función &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<input class="inputTextSele" type="text" name="fu_nombre'+fu_id+'" id="fu_nombre'+fu_id+'" value = "'+data.data_funiones.res[i].fu_nombre+'">';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Objetivo función &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<input class="inputTextSele" type="text" name="fu_objetivo'+fu_id+'" id="fu_objetivo'+fu_id+'" value = "'+data.data_funiones.res[i].fu_objetivo+'">';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Lugar de desarrollo &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<input class="inputTextSele" type="text" name="fu_lugar_desarrollo'+fu_id+'" id="fu_lugar_desarrollo'+fu_id+'" value = "'+data.data_funiones.res[i].fu_lugar_desarrollo+'">';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Tipo función &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<input class="inputTextSele" type="text" name="fu_tipo'+fu_id+'" id="fu_tipo'+fu_id+'" value = "'+data.data_funiones.res[i].fu_tipo+'">';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Codigo &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<textarea class="inputTextSele" name="fu_codigo'+fu_id+'" id="fu_codigo'+fu_id+'">'+data.data_funiones.res[i].fu_codigo+'</textarea>';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'<div class="row">';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<label for="">Descripción función &nbsp;</label>';
                    htmltabla = htmltabla+'</div>';
                    htmltabla = htmltabla+'<div class="col-md-6">';
                        htmltabla = htmltabla+'<textarea class="inputTextSele" name="fu_descripcion'+fu_id+'" id="fu_descripcion'+fu_id+'">'+data.data_funiones.res[i].fu_descripcion+'</textarea>';
                    htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'</div>';
                htmltabla = htmltabla+'<a class="btn btn-block btn-danger btn-xs"  title="Eliminar Función" onclick="EliminarFuncion('+fu_id+')" style="width: 3%;"><i class="fa fa-trash"></i></a>';
                htmltabla = htmltabla+'<a class="btn btn-block btn-warning btn-xs" title="Editar Función"   onclick="ActualizarFuncion('+fu_id+')" style="width: 3%;"><i class="fa fa-edit"></i></a>';
            htmltabla = htmltabla+'</div>';
        htmltabla = htmltabla+'</div>';
        }

        $("#tbl_funciones").html(htmltabla);
    });
    
}

function verinfo(id){
    $("#infoclien_"+id).slideToggle("slow");
};

function EliminarFuncion(id_funcion){
    
    swal({
        title: "Realmente desea eliminar la integración",
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No eliminar!'
    }).then(function (result) {
        if (result.value) {
            console.log(id_funcion);
            socket.emit('consulta:eliminarFuncion', id_funcion);
            socket.on('consulta:eliminarFuncion',function(data){
                consultarfunciones();
                
            })
        }
    });
    
}

function ActualizarFuncion(id_funcion){

    var fu_codigo = $("#fu_codigo"+id_funcion).val();
    var fu_descripcion = $("#fu_descripcion"+id_funcion).val();
    var fu_id = id_funcion;
    var fu_lugar_desarrollo = $("#fu_lugar_desarrollo"+id_funcion).val();
    var fu_nombre = $("#fu_nombre"+id_funcion).val();
    var fu_objetivo = $("#fu_objetivo"+id_funcion).val();
    var fu_tipo = $("#fu_tipo"+id_funcion).val();
    var id_empresa = $("#selProyecto_"+id_funcion).val();
    var id_integracion = $("#selIntegraciones_"+id_funcion).val();


    var datosactualizar= {"fu_codigo":fu_codigo,"fu_descripcion":fu_descripcion,"fu_id":fu_id,"fu_lugar_desarrollo":fu_lugar_desarrollo,"fu_nombre":fu_nombre,"fu_objetivo":fu_objetivo,"fu_tipo":fu_tipo,"id_empresa":id_empresa, "id_integracion":id_integracion}

    socket.emit('consulta:actualizarFuncionsql', datosactualizar);
    socket.on('consulta:actualizarFuncionsql',function(data){
        if(data.affectedRows > 0){
            Swal.fire(
                'Actualizado',
                '',
                'success',
            )
        }
    })
    console.log(datosactualizar);
}
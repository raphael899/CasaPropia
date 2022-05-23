
function consultaIntegracionProyecto(){
    socket.emit('consulta:consultasqlintergracion','consultar');
}
socket.on('consulta:consultasqlintergracion',function(data){
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

function GuardarIntegracion(){
    var id_empresa = $("#selProyecto").val()
    var in_nombre = $("#in_nombre").val();
    var in_tipo = $("#in_tipo").val();
    var in_proveedor = $("#in_proveedor").val();
    var in_url = $("#in_url").val();
    var in_descripcion = $("#in_descripcion").val();

    var datosaguardar = {"in_nombre":in_nombre,"in_tipo":in_tipo,"in_provedor":in_proveedor,"in_url":in_url, "in_descripcion":in_descripcion,"id_empresa":Number(id_empresa)}

    console.log(datosaguardar);


    socket.emit('consulta:guardarintegracionsql', datosaguardar);



    socket.on('consulta:guardarintegracionsql',function(data){
        if(data > 0){
            console.log("si entro");
            //consulta();
            consultarIntegracion();
            Swal.fire(
                'Guardado',
                'Proyecto ingresado correctamente',
                'success',
            )
        }
        
    })
    $("#in_nombre").val('');
    $("#in_tipo").val('');
    $("#in_proveedor").val('');
    $("#in_url").val('');
    $("#in_descripcion").val('');

}


function consultarIntegracion(){
    var id_empresa = $("#selProyecto").val()
    console.log(id_empresa);


    socket.emit('consulta:consultasqlwhere',id_empresa);

    socket.on('consulta:consultasqlwhere',function(data){
        console.log(data);
        var nummax = data.length;
        //tablacontenidointegracion
        var htmltabla = '';
       
        htmltabla = htmltabla +'<table class="table">';
        htmltabla = htmltabla +'<thead>';
            htmltabla = htmltabla +'<tr>';
                htmltabla = htmltabla +'<th scope="col">Nombre</th>';
                htmltabla = htmltabla +'<th scope="col">Tipo</th>';
                htmltabla = htmltabla +'<th scope="col">Proveedor</th>';
                htmltabla = htmltabla +'<th scope="col">URL</th>';
                htmltabla = htmltabla +'<th scope="col">Descripcion</th>';
                htmltabla = htmltabla +'<th scope="col"></th>';
                htmltabla = htmltabla +'<th scope="col"></th>';
            htmltabla = htmltabla +'</tr>';
        htmltabla = htmltabla +'</thead>';
        htmltabla = htmltabla +'<tbody>';
        for(var i = 0 ; i < nummax ; i++){
            //data[i].id_empresa
            /*
            data[i].id_integracion
            data[i].in_descripcion
            data[i].in_nombre
            data[i].in_provedor
            data[i].in_tipo
            data[i].in_url
            */
            var intipo =data[i].in_tipo;
            var id_integracion = data[i].id_integracion;

            //var in_descripcion ='<input class="inputTextSele" type="text" name="in_descripcion_'+id_integracion+'" id="in_descripcion_'+id_integracion+'" value = '+data[i].in_descripcion+'>';
            var in_nombre ='<input class="inputTextSele" type="text" name="in_nombre_'+id_integracion+'" id="in_nombre_'+id_integracion+'" value = "'+data[i].in_nombre+'">';
            var in_provedor ='<input class="inputTextSele" type="text" name="in_provedor_'+id_integracion+'" id="in_provedor_'+id_integracion+'" value = "'+data[i].in_provedor+'">';
            var in_tipo ='<input class="inputTextSele" type="text" name="in_tipo_'+id_integracion+'" id="in_tipo_'+id_integracion+'" value = "'+intipo+'">';
            var in_url ='<input class="inputTextSele" type="text" name="in_url_'+id_integracion+'" id="in_url_'+id_integracion+'" value = "'+data[i].in_url+'">';
            var in_descripcion ='<textarea class="inputTextSele" name="in_descripcion_'+id_integracion+'" id="in_descripcion_'+id_integracion+'">'+data[i].in_descripcion+'</textarea>';



            var EliminarIntegracion ="<a class='btn btn-block btn-danger btn-xs'  title='Eliminar proyecto' onclick='EliminarIntegracion("+id_integracion+")' ><i class='fa fa-trash'></i></a>";

        
            var ActualizarIntegracion ="<a class='btn btn-block btn-warning btn-xs' title='Editar proyecto'   onclick='ActualizarIntegracion("+id_integracion+")'><i class='fa fa-edit'></i></a>";
    

            htmltabla = htmltabla +'<tr>';
                htmltabla = htmltabla +'<td>'+in_nombre+'</th>';
                htmltabla = htmltabla +'<td>'+in_tipo+'</td>';
                htmltabla = htmltabla +'<td>'+in_provedor+'</td>';
                htmltabla = htmltabla +'<td>'+in_url+'</td>';
                htmltabla = htmltabla +'<td>'+in_descripcion+'</td>';

                htmltabla = htmltabla +'<td>'+EliminarIntegracion+'</td>';
                htmltabla = htmltabla +'<td>'+ActualizarIntegracion+'</td>';
            htmltabla = htmltabla +'</tr>';
        }
        htmltabla = htmltabla +'</tbody>';
        htmltabla = htmltabla +'</table>';
        $("#tablacontenidointegracion").html(htmltabla);
    });
    
}
function EliminarIntegracion(id_integracion){
    console.log(id_integracion);
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
            
            socket.emit('consulta:eliminarIntegracion', id_integracion);
            socket.on('consulta:eliminarIntegracion',function(data){
                console.log(data);
                //consulta();
                consultarIntegracion();
            })
        }
    });
    
}

function ActualizarIntegracion(id_integracion){
    console.log(id_integracion);
    var in_nombre = $("#in_nombre_"+id_integracion).val();
    var in_tipo = $("#in_tipo_"+id_integracion).val();
    var in_proveedor = $("#in_provedor_"+id_integracion).val();
    var in_url = $("#in_url_"+id_integracion).val();
    var in_descripcion = $("#in_descripcion_"+id_integracion).val();


    var datosactualizar= {"in_nombre":in_nombre,"in_tipo":in_tipo,"in_provedor":in_proveedor,"in_url":in_url, "in_descripcion":in_descripcion,"id_integracion":id_integracion}

    console.log(datosactualizar);


    socket.emit('consulta:actualizarIntegracionsql', datosactualizar);


    socket.on('consulta:actualizarIntegracionsql',function(data){
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
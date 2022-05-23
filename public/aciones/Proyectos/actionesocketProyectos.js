
function consulta(){
    socket.emit('consulta:consultasql','consultar');
}



function ok(msn) {


    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })

}

function info(msn) {
	toast({
		type: 'success',
		title: msn
	})
}

function error(msn) {
	/*swal({ title: msn,  		
			type: "error",
			confirmButtonColor: "#337AB7",
			showConfirmButton: true});*/

	toast({
		type: 'error',
		title: msn
	})
}

socket.on('consulta:consultasql',function(data){
    console.log(data);
    var nummax = data.length;
    var ddData = [];
    for(var i = 0 ; i < nummax ; i++){
        var vari2 ="<a class='btn btn-block btn-danger btn-xs'  title='Eliminar proyecto' onclick='EliminarProyecto("+data[i].id_empresa+")' ><i class='fa fa-trash'></i></a>";

        var vari4 ="<a class='btn btn-block btn-primary btn-xs' title='ver detalles'  onclick='VisualizarProyecto()'><i class='fa fa-eye'></i></a>";
    
        var vari3 ="<a class='btn btn-block btn-warning btn-xs' title='Editar proyecto'   onclick='ActualizarProyecto("+data[i].id_empresa+")'><i class='fa fa-edit'></i></a>";



        var em_correo ='<input class="inputTextSele" type="text" name="correoProyecto_'+data[i].id_empresa+'" id="correoProyecto_'+data[i].id_empresa+'" value = "'+data[i].em_correo+'">';

        var em_nombre = '<input class="inputTextSele" type="text" name="nombreProyecto_'+data[i].id_empresa+'" id="nombreProyecto_'+data[i].id_empresa+'" value = "'+data[i].em_nombre+'">';

        var em_contrasena ='<input class="inputTextSele" type="text" name="contrasenaProyecto_'+data[i].id_empresa+'" id="contrasenaProyecto_'+data[i].id_empresa+'" value = "'+data[i].em_contrasena+'">';

        var em_descripcion = '<textarea class="inputTextSele" name="descripcionProyecto_'+data[i].id_empresa+'" id="descripcionProyecto_'+data[i].id_empresa+'">'+data[i].em_descripcion+'</textarea>';

        var jsonProyectos = {
            "id":data[i].id_empresa,
            "contraseña":em_contrasena,
            "correo":em_correo,
            "descripcion":em_descripcion,
            "nombre":em_nombre,
            "ediproyecto":vari4,
            "actproyecto":vari2,
            "eliproyecto":vari3,
        };
        
        ddData.push(jsonProyectos);

    }

    var datos = {
        "data": ddData
    };
    $(document).ready(function() {

        var table = $('#proyectos-vt').DataTable( {
            stateSave: true,
            "bDestroy": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "responsive": true,
            "pagingType": "simple_numbers",
            "lengthMenu": [[10,15,20,-1], [10,15,20,"Todos"]],
            "language": {
            "lengthMenu": "Ver _MENU_ registros",
            "zeroRecords": "No se encontraron datos",
            "info": "Resultado _START_ - _END_ de _TOTAL_ registros",
            "infoEmpty": "No se encontraron datos",
            "infoFiltered": "",
            "paginate": {"previous": "Anterior","next":"siguiente"},
            "search":"",
            "sSearchPlaceholder":"Busqueda"
            },	
            "data": datos.data,
            "columns": [
                { "data": "nombre"},
                { "data": "correo" },
                { "data": "contraseña"},
                { "data": "descripcion" },
                { "data": "actproyecto"},
                { "data": "eliproyecto"}

            ],
            "order": [[0, 'asc']],
            "rowCallback": function( row, data ) {
                var Color = "";
                var msn = "";
               
                if(data.Semaforo == "En_proceso"){
                    Color = "#f1c40f4d";
                }
                else if (data.Semaforo == "Cumplida"){
                    Color = "#2ecc714d";
                }
                else if (data.Semaforo == "No_cumplida"){
                    Color = "rgb(252 24 0 / 76%)";
                }
      
                $('td:eq(0)', row).css('background-color',Color);
                $('td:eq(1)', row).css('background-color',Color);
            }
        } );
        $('#example tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                var rowData = table.row( $(this).closest('tr') ).data();
                
                if(rowData != undefined){
                    format(rowData);
                    // Open this row
                    row.child( '<div class="row" ><div class="col-md-12" id = "detalle_'+rowData.id+'"> <script>format('+rowData+')</script></div></div>' ).show();
                    //format(rowData)
                    tr.addClass('shown');
                }
            }
        } );

    } );

});

function GuardarProyecto(){
    var nombreProyecto = $("#nombreProyecto").val();
    var correoProyecto = $("#correoProyecto").val();
    var contrasenaProyecto =$("#contrasenaProyecto").val();
    var descripcionProyecto = $("#descripcionProyecto").val();

    var datosaguardar = {"nombreProyecto":nombreProyecto,"correoProyecto":correoProyecto,"contrasenaProyecto":contrasenaProyecto,"descripcionProyecto":descripcionProyecto}

    socket.emit('consulta:guardarproyectosql', datosaguardar);

    console.log(nombreProyecto);
    console.log(correoProyecto);
    console.log(contrasenaProyecto);
    console.log(descripcionProyecto);



    socket.on('consulta:guardarproyectosql',function(data){
        if(data > 0){
            console.log("si entro");
            consulta();
            Swal.fire(
                'Guardado',
                'Proyecto ingresado correctamente',
                'success',
            )
        }
        
    })
    $("#nombreProyecto").val('');
    $("#correoProyecto").val('');
    $("#contrasenaProyecto").val('');
    $("#descripcionProyecto").val('');

}
function EliminarProyecto(id){
    swal({
        title: "Realmente desea eliminar el proyecto",
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No eliminar!'
    }).then(function (result) {
        if (result.value) {
            console.log(id);
            
            socket.emit('consulta:eliminarproyecto', id);
            socket.on('consulta:eliminarproyecto',function(data){
                console.log(data);
                consulta();
            })
        }
    });
}

function ActualizarProyecto(id){
    console.log(id);


    var nombreProyecto = $("#nombreProyecto_"+id).val();
    var correoProyecto = $("#correoProyecto_"+id).val();
    var contrasenaProyecto =$("#contrasenaProyecto_"+id).val();
    var descripcionProyecto = $("#descripcionProyecto_"+id).val();

    var datosactualizar = {"nombreProyecto":nombreProyecto,"correoProyecto":correoProyecto,"contrasenaProyecto":contrasenaProyecto,"descripcionProyecto":descripcionProyecto,"id":id}

    socket.emit('consulta:actualizarproyectosql', datosactualizar);


    socket.on('consulta:actualizarproyectosql',function(data){
        if(data.affectedRows > 0){
            Swal.fire(
                'Actualizado',
                '',
                'success',
            )
        }
    })


}
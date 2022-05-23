const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
})
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function mespres(mes_name){ return meses[mes_name]}

function consultaFuncionesProyecto(){
    socket.emit('consulta:consultaSQL','consultar');
}
socket.on('consulta:consultaSQL',function(data){
    console.log(data);
    var table = $('#example').DataTable( {
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "stateSave": true,
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
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "Nombre"  },
            { "data": "Tipo_Servicio"  },
            { "data": "Fuente"  },
            { "data": "Estado_Fase"  },
            { "data": "Tip_Tercero"  },
            { "data": "Pais"  },
            { "data": "Canal_Venta"  },
            { "data": "Fecha_Creaci_n"  },
            { "data": "Fecha_Conversi_n"  },
            { "data": "Propietario"  },
            { "data": "Co_ropietario"  },
            { "data": "Interes_Monetizaci_n"  },
            { "data": "Interes_Venta"  },
            { "data": "Interes_Cr_dito"  }

        ],
        'columnDefs': [
            {
                'targets': [1],
                'orderable': false
            },
        ],
        
        "order": [[1, 'asc']],
        "rowCallback": function( row, data ) {
            var Color = "";
            if(data.modulos == 1){
                if(data.Estado_Fase == "Descartado"){
                    Color = "#f10f0f4d";
                }else{
                    Color = "#f1c40f4d";
                }
                
            }else{
                Color = "#49f78373";
            }
            $('td:eq(0)', row).css('background-color',Color);
            $('td:eq(1)', row).css('background-color',Color);
        },
    } );
    table.columns( [12,13,14] ).visible( false );
 
    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            var rowData = table.row($(this).closest('tr')).data();
            console.log(rowData);
            if(rowData != undefined){
                format(rowData);
                // Open this row
                var htmdetalle = `
                <div class="row" id = "detalle_${rowData.id}">
                    <div class = "col-md-12" style = "text-align: center;"><img src="unnamed.gif"></div>
                </div>
                <script>format('+rowData+')</script>`;
                row.child(htmdetalle).show();
                //format(rowData)
                tr.addClass('shown');
            }
        }
    } );
});

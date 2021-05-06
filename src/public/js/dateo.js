
document.addEventListener('DOMContentLoaded', function() {
var elems = document.querySelectorAll('select');
var instances = M.FormSelect.init(elems); });
document.addEventListener('DOMContentLoaded', function() {
var elems = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(elems);});
document.addEventListener('DOMContentLoaded', function() { M.AutoInit(); });




reportDep()

async function reportDep(){

    try {
        document.getElementById('query_table').innerHTML=""
        let datatable=[];
        /*for(let x=0; x<valores2.length;x++){
          datatable.push([    valores2[x].unidad, valores2[x].lider,
                              valores2[x].identificacion, valores2[x].servidor,
                              valores2[x].fecha_inicio, valores2[x].fecha_fin,
                              valores2[x].compromisos, valores2[x].avance,
                              valores2[x].descripcion, valores2[x].num_horas,
                              valores2[x].observacion, valores2[x].anexos
                          ])
          }
          // console.log("valores para la tabla:",datatable);
          // valores2.sort((b, a) =>  a.avance - b.avance )*/
          var dataSet = [
            
        ];
         var table= $('#query_table').DataTable( {
          data: dataSet,
          columns: [
            { title: "Cod_Fondo",   className: "text-center"},
            { title: "Fondo",       className: "text-center"},
            { title: "Cod_Fuente",  className: "text-center"},
            { title: "Fuente",      className: "text-center"},
            { title: "Cod_Dep",     className: "text-center"},
            { title: "EsPP",        className: "text-center"},
            { title: "Cod_proyecto",className: "text-center"},
            { title: "Proyecto",    className: "text-center"},
            { title: "pago",        className: "text-center"},
            { title: "Factura",     className: "text-center"},
            { title: "Compromiso",  className: "text-center"},
            { title: "Ejecución",   className: "text-center"},
            { title: "GEO",         className: "text-center"},
            { title: "Reportar",    className: "text-center"},


          ] ,   
          scrollCollapse: true, 
          fixedColumns: {
            heightMatch: 'none'
        }, fixedHeader: true,
           stateSave: true,
             "language": {
              "lengthMenu": "Mostrar _MENU_ registros por página",
              "zeroRecords": "Nothing found - sorry",
              "info": "Vistas página _PAGE_ of _PAGES_",
              "infoEmpty": "No hay registros Disponibles",
              "infoFiltered": "(filtered from _MAX_ total registros)", 
              paginate: {
                first: "Primera",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
              },
              sProcessing:"Procesando..."
            },
            responsive:"true",
            dom:'Bfrtip',
            buttons:[
              {
                extend: 'excelHtml5',
                text  : '<i class="fa fa-file-excel-o"></i>' ,
                title : "Reportes_Actividad",
                tittleAttr: 'Exportar a Excel',
                className: 'btn btn-success',
                autoFilter: true,
                sheetName: 'Reportes Actividad'
               },
               {
                extend: 'pdfHtml5',
                text  : '<i class="fa fa-file-pdf-o"></i>' ,
                title : "Reportes_Actividad",
                tittleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                messageTop: 'PDF created by Unidad de SegumientoPlan de Desarrollo-DAP.'
               },
               {
                extend: 'print',
                text  : '<i class="fa fa-print"></i>' ,
                title : "Reportes_Actividad",
                tittleAttr: 'Imprimir',
                className: 'btn btn-info'
               },  {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text"></i>',
                title : "Reportes_Actividad",
                className: 'btn btn-warning',
                exportOptions: {
                    modifier: {
                        search: 'none'
                    }
                }
            }],
            columnDefs: [
            {/*cod_fondo      */  width: "10px",   targets: 0,  className: "text-center"},
            {/*fondo          */  width: "70px",   targets: 1,  className: "text-center"},
            {/*cod_fuente     */  width: "10px",   targets: 2,  className: "text-center"},
            {/*fuente         */  width: "70px",   targets: 3,  className: "text-center"},
            {/*cod_dep        */  width: "70px",   targets: 4,  className: "text-center"},
            {/*espp           */  width: "10px",   targets: 5,  className: "text-center"},
            {/*cod_proyecto   */  width: "50px",   targets: 6,  className: "text-justify"},
            {/*proyecto       */  width: "300px",  targets: 7,  className: "text-center"},
            {/*pago           */  width: "100px",  targets: 8,  className: "text-justify"}, 
            {/*facturas       */  width: "100px",  targets: 9,  className: "text-center"}, 
            {/*compromisos    */  width: "80px",   targets: 10, className: "text-justify"},
            {/*eejecucion     */  width: "80px",   targets: 11, className: "text-justify"},
            {/*geo            */  width: "80px",   targets: 12, className: "text-justify"},
            {/*Reportar       */  width: "10px",   targets: 13, className: "text-justify"}
        

            ],        
            order: [[ 1, 'asc' ]], createdRow: function(row, data){          },
            bDestroy: true
      });
      $('#query_table tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
      } );
     } catch (error) {
      console.error('Error reportDate ', error)
     }
  }
  
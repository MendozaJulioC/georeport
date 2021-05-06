

/*
$(function () {
    $("#fecha_i").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date());
});

async function datos(){
    let fecha=$("#fecha_i").datepicker( "getDate" )
    let mes = 1 + parseInt(fecha.getMonth());
    if(mes<10){mes= '0'+mes}
    let year = fecha.getFullYear()
    let dia = fecha.getDate()
    let fechaQ= dia+'-'+mes+'-'+year
    console.log(fechaQ);
    let user= document.getElementById('user').value
    fetch(`/consulta/user/fecha/fecha=${fechaQ}&user=${user}`)
    .then(res=> res.json())
    .then(response=>{
    
        let valores= response.data
        reportDate(valores)
    })
}
async function alldatos(){
  let user= document.getElementById('user').value
  fetch(`/consulta/user/${user}`)
  .then(res=> res.json())
  .then(response=>{
    let valores= response.data
    let dateo = response.compro
    reportDate(valores)
    graficamain(dateo)
  })
}

async function graficamain(dateo){
  const dataSource = {
    chart: {
      caption: "Seguimiento Compromios",
      subcaption: "Reportes",
      xaxisname: "Compromisos",
      theme: "ocean"
    },
      data: dateo
  };
  FusionCharts.ready(function() {
    var myChart = new FusionCharts({
      type: "column2d",
      renderAt: "chart-container",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource
    }).render();
  });
}

async function reportDate(valores2){
  try {
      document.getElementById('query_table').innerHTML=""
      let datatable=[];
      for(let x=0; x<valores2.length;x++){
        datatable.push([    valores2[x].unidad, valores2[x].lider,
                            valores2[x].identificacion, valores2[x].servidor,
                            valores2[x].fecha_inicio, valores2[x].fecha_fin,
                            valores2[x].compromisos, valores2[x].avance,
                            valores2[x].descripcion, valores2[x].num_horas,
                            valores2[x].observacion, valores2[x].anexos
                        ])
        }
        // console.log("valores para la tabla:",datatable);
        // valores2.sort((b, a) =>  a.avance - b.avance )
       var table= $('#query_table').DataTable( {
        data: datatable,
        columns: [
            { title: "Unidad" },
            { title: "Líder" }, 
            { title: "Identificación" },
            { title: "Servidor" },
            { title: "Fecha Inicio" },
            { title: "Fecha Fin" },
            { title: "Compromiso" },
            { title: "Avance" },
            { title: "Evidencia" },
            { title: "Horas" },
            { title: "Observaciones" },
            { title: " Anexos" },
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
            {/*unidad     /  width: "200px", targets: 0,  className: "text-center"},
            {/*lider      /  width: "200px", targets: 1,  className: "text-center"},
            {/*id         /  width: "70px",  targets: 2,  className: "text-center"},
            {/*servidor   /  width: "100px", targets: 3,  className: "text-center"},
            {/*fecha 1    /  width: "70px",  targets: 4,  className: "text-center"},
            {/*fecha 2    /  width: "70px",  targets: 5,  className: "text-center"},
            {/*compromiso /  width: "200px", targets: 6,  className: "text-justify"},
            {/*avance      /  width: "70px",  targets: 7,  className: "text-center"},
            {/*evidencia    /  width: "200px", targets: 8,  className: "text-justify"}, 
            {/*horas        /  width: "70px",  targets: 9,  className: "text-center"}, 
            {/*observaciones/  width: "100px", targets: 10, className: "text-justify"},
            {/*anexos       /  width: "100px", targets: 11, className: "text-justify"},/*
          ],        
          order: [[ 1, 'asc' ]], createdRow: function(row, data){          },
          bDestroy: true
    });
    $('#query_table tbody').on( 'click', 'button', function () {
      var data = table.row( $(this).parents('tr') ).data();
    } );
   } catch (error) {
    console.error('Error alertasGraph ', error)
   }
}

$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#query_alerta tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

async function actualizando(){
  swal({
      title: "Estas seguro?",
      text: "Estas seguro que deseas actualizar el registro seleccionado!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willUpdate) => {
      if(willUpdate){
          swal("Favor esperar mientras editamos el registro!", {
              buttons: false,
              icon:'info',
              closeOnClickOutside: false,
              timer: 9000,
          })
          .then(results=>{
              console.log(results);
              swal("Registro actualizado!", {
                  buttons: false,
                  icon:'success',
                  closeOnClickOutside: false,
                  timer: 10000,
              });
              window.location='/'
          })
      }
  });
}

*/

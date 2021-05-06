
$(function () {
    $("#fecha_inicio").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date());
});
$(function () {
    $("#fecha_fin").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date());
});


ClassicEditor
    .create( document.querySelector( '#evidencia' ), {
        removePlugins: [ 'Heading', 'Link' ],
        toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList' ]
    } )
    .catch( error => {
        console.error( error );
} );

ClassicEditor
    .create( document.querySelector( '#observaciones' ) , {
        removePlugins: [ 'Heading', 'Link' ],
        toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList' ]
    } )
    .catch( error => {
        console.error( error );
} );

ClassicEditor
    .create( document.querySelector( '#anexo1' ) , {
        removePlugins: [ 'Heading', 'Link' ],
        toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList' ]
    } )
    .catch( error => {
      console.error( error );
} );


async function dep_estado(value){
    alert(value)
}

async function deleterow(row){
    swal({
        title: "Estas seguro?",
        text: "Estas seguro que deseas borrar el registro seleccionado!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if(willDelete){
            swal("Favor esperar mientras editamos el registro!", {
                buttons: false,
                icon:'info',
                closeOnClickOutside: false,
                timer: 8000,
            })
           
            .then(results=>{
                console.log(results);
                swal("Registro borrado!", {
                    buttons: false,
                    icon:'error',
                    closeOnClickOutside: false,
                    timer: 15000,

                });
                window.location='/' 
            })
           
        }
     
      });
}

async function updaterow(row){
    swal( {
        title:"AppRegistroActividades",
        text:"Espere un momento mientras iniciamos el proceso de actualización del reporte!",
        buttons: false,
        icon:'info',
        closeOnClickOutside: false,
        timer: 9000
    });
}


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
                timer: 8000,
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

async function waitsave(){
    swal( {
        title:"AppRegistroActividades",
        text:"Espere un momento mientras iniciamos el proceso de actualización del reporte!",
        buttons: false,
        icon:'info',
      //  closeOnClickOutside: false,
        timer: 10000
    });
}

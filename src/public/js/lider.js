async function onloadswal(val){
     
    if(val==3){
        swal("Problemas!", `Debes llenar todos los campos! `, "warning");
        window.onload = function() {
            init();
        };
    }
    if(val==1){
        swal({
            title: "Excelente!",
            text: "Espera mientras guardamos tú registro!",
            icon: "success",
            button: false,
});
        setTimeout(function(){  location.href="/admin/lider"   }, 5000);
       
       
     
    }

 }
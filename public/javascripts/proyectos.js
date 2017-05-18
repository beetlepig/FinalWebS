let urlimg;
let id_usu;
let jsonUsu;
if(!sessionStorage.datos){
    window.location.replace('/');
} else {
    jsonUsu=JSON.parse(sessionStorage.datos);
    urlimg= "http://localhost:3000/Users/"+jsonUsu.profilePic;
    id_usu= jsonUsu.correo;
    console.log(jsonUsu);
}

jQuery(document).ready(function() {
    solicutarProyectos();
});



function solicutarProyectos() {
    postAjax("/api/proyectos",{creador:id_usu}).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            window.alert("correcto");
            console.log(data);
            let listi= $('#listin');
            listi.empty();
            $.each(data,(i,value)=>{
                let item= $('<li>').append("<button>"+value.nombre+"</button>");
                listi.append(item);
            });



        }
    })
}




//PETICIONES
function postAjax(url,data) {
    console.log(data);
    return $.ajax({
                      dataType : "json",
                      contentType: "application/json; charset=utf-8",
                      url: url,
                      data: JSON.stringify(data),
                      processData: false,
                      type: 'POST',
                  });
}
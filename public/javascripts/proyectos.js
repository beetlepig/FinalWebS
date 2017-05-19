let urlimg;
let id_usu;
let jsonUsu;

const formitoCrear=$('#crearposti');

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

            //data contiene un array con los proyectos, el parametro nombre es el nombre del proyecto

            listi.empty();
            $.each(data,(i,value)=>{
                let item= $('<li>').append("<button>"+value.nombre+"</button>");
                listi.append(item);
            });



        }
    })
}



//LISTENERS
formitoCrear.submit((event)=>{
    event.preventDefault();
    const url= formitoCrear.prop('action');
    const formito= new FormData(formitoCrear[0]);
    formito.append("creador",id_usu);
    for (let pair of formito.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    postAjaxFormData(url,formito).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            window.alert("correcto");
            solicutarProyectos();
        }
    })

});




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

function postAjaxFormData(url,data) {
    return $.ajax({
                      url: url,
                      data: data,
                      processData: false,
                      type: 'POST',
                      contentType:false
                  });
}
/**
 * Created by sky_k on 19/05/2017.
 */
let urlimg;
let id_usu;
let jsonUsu;
let proyectoSel;

const formitoCrear= $('#formitoCrear');



//VERIFICA SI HE INICIADO SESION
if(!sessionStorage.datos){
    window.location.replace('/');
} else if(!sessionStorage.proyectoSel){
    window.location.replace('/proyectos');
} else {
    jsonUsu=JSON.parse(sessionStorage.datos);
    urlimg= "http://localhost:3000/Users/"+jsonUsu.profilePic;
    id_usu= jsonUsu.correo;
    proyectoSel= JSON.parse(sessionStorage.proyectoSel);
    console.log(proyectoSel);
    init();
}



function init() {
    $('#nombreProyecto').text(proyectoSel.nombre);
    $('#myRol').text(proyectoSel.rol);
    solicitarMiembros();

}


function solicitarMiembros() {
    console.log("entro");
    postAjax("/api/miembros",{id_proyecto:proyectoSel.id}).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            console.log(data);
            let listi= $('#listin');
            listi.empty();
            $.each(data,(i,value)=>{
                let hfive= $("<h5>"+value.id_user+"</h5>");
                let item= $('<li>').append(hfive);
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
    formito.append("id_proyecto",proyectoSel.id);
    for (let pair of formito.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    postAjaxFormData(url,formito).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            window.alert("correcto");
            solicitarMiembros();
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
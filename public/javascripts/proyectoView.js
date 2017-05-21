/**
 * Created by sky_k on 19/05/2017.
 */
let urlimg;
let id_usu;
let jsonUsu;
let proyectoSel;
let memberSel;

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
    $('#formTarea').hide();
    init();
}

//--------------------------------------------------


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
                let hfive= $("<button>"+value.id_user+"</button>").click(function () {
                    abrirMiembro(value.id_user);
                    $('#formTarea').show();
                });
                let item= $('<li>').append(hfive);
                listi.append(item);
            });
        }
    })
}


function abrirMiembro(id_member) {
    console.log(id_member);
    memberSel= id_member;
    postAjax("/api/miembros/view",
             {
                 id_proyecto:proyectoSel.id,
                 memberCorrein:id_member

              }
    ).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            console.log(data);
            let divi= $('#tareas');
            divi.empty();
            $.each(data,(i,value)=>{
                let hfiveTarea= $("<h5>"+'tarea: '+value.tarea+"</h5>");
                let fecha= value.fecha_entrega.split("T")[0];
                let hora= value.fecha_entrega.split("T")[1];
                let hfiveEntrega= $("<h5>"+'Entrega: '+fecha+"</h5>");
                let hfiveHora= $("<h5>"+'Hora: '+hora+"</h5>");

                divi.append(hfiveTarea);
                divi.append(hfiveEntrega);
                divi.append(hfiveHora);

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

$('#formTarea').submit(function (event) {
   event.preventDefault();
    crearTarea($(this).serializeArray(),$(this).attr('action'));
});

//-------------------------------------------------------------------------------------------------

function crearTarea(array,url) {
    //NO CAMBIAR LAS POSICIONES DEL ARRAY
    let fechaCompleta= array[1].value+" "+array[2].value+":00";
    let tarea= array[0].value;
    const miembro= memberSel;
    const proyecto= proyectoSel.id;
    let direccion= url;
    console.log("tarea: "+tarea);
    console.log("hora: "+fechaCompleta);
    console.log("miembro: "+miembro);
    console.log("proyecto: "+proyecto);
    console.log("direccion: "+direccion);
    postAjax(direccion,{
        "memberCorrein": miembro,
        "id_proyecto": proyecto,
        "tarea": tarea,
        "fecha": fechaCompleta
    }).always((data,status)=>{
        if(status==="error"){
            window.alert(data.responseText);
        } else {
            console.log(data);
            abrirMiembro(memberSel);
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



function postAjaxFormData(url,data) {
    return $.ajax({
                      url: url,
                      data: data,
                      processData: false,
                      type: 'POST',
                      contentType:false
                  });
}
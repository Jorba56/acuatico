const cita = document.getElementById('cita');
const add=document.getElementById("add");
add.addEventListener('click', agregarTarea);
/*function obtenerDatos(){
fetch('https://zenquotes.io/api/today')
        .then(response => response.json())  
        .then(json => {
            printQuote(json);
        });
}
function printQuote(json) {
    cita.innerHTML = `
        <div class="quote-card">
        <p>"${json[0].q}"</p>
        <p>- ${json[0].a}</p>
        </div>
    `;
}
no funciona porque la red no carga la api*/
let tareas=[];
let savedtareas = localStorage.getItem("tareas");  
if (savedtareas) {
    tareas = JSON.parse(savedtareas); 
}

function agregarTarea(){
    const lista=document.getElementById("lista");
    let tarea1=(document.getElementById("tarea").value);
    tareas.push(tarea1); // Creamos el li
    lista.innerHTML="";
    for(let i=0; i<tareas.length;i++) {
        lista.innerHTML+=`
        <li>${tareas[0]}</li>
        <input type="button" id="eliminar${i}" value="eliminar tarea" onclick="eliminarTarea()">
        `;
    };

}



function eliminarTarea(){
    const lista=document.getElementById("tarea");
    
    let tareaEliminar="";
    tareaEliminar=lista.parentNode;

}


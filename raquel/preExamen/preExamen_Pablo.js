//constantes
const contenedorLista = document.getElementById("listaTareas");
const tarea = document.getElementById("tarea");
const aTAreas = [];
const containerFrase = document.getElementById("titulo2");
const usuarioId = Math.floor(Math.random() * 10) + 1;
const idFrase = Math.floor(Math.random() * 10) + 1 + (usuarioId - 1) * 10;

//funcion anonima para añadir al localStorage
let local = function (aTareas) {
  localStorage.setItem("tareas", JSON.stringify(aTareas));
};

/*
funcion mostrarlista que sino existe el ul lo genera, genera dentreo del ul un li por cada tarea que se pasa por parametro
 y la muestra ademas genra el boton para eliminar el padre de ese nodo es decir el li en el que se encuentre 
*/
function mostrarLista (textoTarea) {
  let lista = contenedorLista.querySelector("ul");

  // Buscamos si ya hay una <ul> dentro del div
  // Si NO existe (es la primera tarea), la creamos
  if (!lista) {
    lista = document.createElement("ul");
    contenedorLista.appendChild(lista);
  }

  let item = document.createElement("li");
  item.textContent = textoTarea;
  item.innerHTML +=  <input type="button" value="X" class="botonBorar"> ;
  lista.appendChild(item);

  contenedorLista.appendChild(lista);

  let boton = item.querySelector(".botonBorar");

  boton.onclick = function () {
    let elementoABorrar = this.parentElement;
    elementoABorrar.parentElement.removeChild(elementoABorrar);

    aTAreas.forEach((element) => {
      if (element.trim() === elementoABorrar.innerText.trim()) {
        aTAreas.splice(aTAreas.indexOf(element), 1);
      }
    });

    local(aTAreas);
  };
}


let datosLocal = localStorage.getItem("tareas");
if (datosLocal) {
  try {
    let tareasLocal = JSON.parse(datosLocal);

    if(tareasLocal.length > 0){
      tareasLocal.forEach(tarea => {
        aTAreas.push(tarea);
        mostrarLista(tarea);
      });
    
    }
  } catch (e) {
    console.log(e);
  }
}

//evento anadir que al pulsar el boton se recupera el valor del nodo tarea, se añade al array, se actualiza el localStorage y luego se llama a la funcion mostrarLista
document.getElementById("anadir").onclick = () => {
  let valorTarea = tarea.value;

  aTAreas.push(valorTarea);

  local(aTAreas);

  mostrarLista(valorTarea);
};


//llamada a la API
fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then((response) => response.json())
  .then((json) => {
    // const aUsuarios = json;
    pintarFrase(json);
  });


//funcion anonima que pinta una frase aleatoria de un autor aleatorio 
let pintarFrase = (usuarios) => {

  let contenidoFrase = "no muestra nada";

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].userId === usuarioId && usuarios[i].id === idFrase) {
      contenidoFrase = usuarios[i].body;
      break;
    }
  }

  localStorage.setItem("frase Usuario" + usuarioId, contenidoFrase);

  containerFrase.innerHTML = `
        <h2>${contenidoFrase}</h2>
  `;
}


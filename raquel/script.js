//Parte 1
let arrayJBR=[];
const palabraClave_JBR=(document.getElementById("clave").value);
let modo_JBR=(document.querySelector("input[name='option']:checked").value);
let container = document.getElementById("salida");
let content="";
//usamos let para variables dinámicas (cambian su valor) y const para constantes (no cambian su valor)
obtenerDatos();

//Parte 2
function obtenerDatos(){
fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())  
        .then(json => {
            printUser_JBR(json);
        });
}

let contador = 0;
function printUser_JBR(usuario) {

  for (let i = 0; i < usuario.length; i++) {
    if (usuario[i].name.toLowerCase().includes(palabraClave_JBR.toLowerCase())) {
      content += usuario[i].name;
      contador ++;
      arrayJBR.push(usuario[i]);
    }
  }
  //Pregunta 2: almacena la informacion de la url en un archivo .json para poder manejarlo mejor
  //Pregunta 3: Porque es un método de acceso más fácil y rápido, que nos permite insertar código html y usar nuestras variables en js.

  container.innerHTML = `
            <div class="salida">
                <p>Usuarios encontrados: ${content}</p>
                <p>Total de usuarios encontrados: ${contador}</p>
            </div>
        `;
}

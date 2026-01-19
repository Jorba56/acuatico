let carro=[];
import productos from './productos.js';
let lista=document.getElementById('productos2');
let listaCarro=document.getElementById('carrito2');
let searchInput = document.getElementById('searchInput');
searchInput.addEventListener("keyup", function() {  filterData(productos);
});
function pintarProductos(array){
lista.innerHTML="";
    for(let i=0; i<array.length;i++) {
        lista.innerHTML+=`
        <div class="tarjeta">
        <div class="producto${i+1}">
            <img src="${array[i].imagen}">
            <h3 id="name_prod">${array[i].name_prod}</h3>
            <p id="precio">${array[i].precio}€</p>
            <button id="addProd${i+1}">Añadir al carro</button>
            <br>
        </div>
        </div>
        `;
    };

  }
function leerCantidades(){
  pintarProductos(productos);
    for (let i=0;i<productos.length;i++){
        const boton = document.getElementById(`addProd${i+1}`);
        boton.addEventListener('click', ()=>{
          if (productos[i].cantidad>=1){
            productos[i].cantidad+=1;
          }else{
            carro.push(productos[i]);
            productos[i].cantidad=1;
          }
            console.log(carro);
            pintarCarro(carro);
        });
    };
  }
function pintarCarro(carro){
listaCarro.innerHTML="";
if (carro.length===0){
    listaCarro.innerHTML+="<p>No hay productos en tu carro.</p>";
  }else {
    for(let i=0; i<carro.length;i++) {
        listaCarro.innerHTML+=`
        <div class="tarjeta">
        <div class="carro${i+1}">
            <h3 id="name_prod">${carro[i].name_prod}</h3>
            <p id="precio">${carro[i].precio}€</p>
            <p id="cantidad">Cantidad: ${carro[i].cantidad}</p>
            <button id="sumar${i+1}">+</button>
            <button id="restar${i+1}">-</button>
            <br>
        </div>
        </div>
        `;
    };
    listaCarro.innerHTML+=`<h3>Precio total del carrito: ${carro.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2)}€</h3>`;
  }
    actualizarCarro(carro);
}
function actualizarCarro(carro){
  for (let i=0;i<carro.length;i++){
       const mas = document.getElementById(`sumar${i+1}`);
        mas.addEventListener('click', ()=>{
          if (carro[i].cantidad>=1){
            carro[i].cantidad+=1;
            console.log(carro);
          }
            pintarCarro(carro);
        });
        const menos = document.getElementById(`restar${i+1}`);
        menos.addEventListener('click', ()=>{
          if (carro[i].cantidad>=1){
            carro[i].cantidad-=1;
            console.log(carro);
          }if(carro[i].cantidad===0){
            carro.splice(i,1);
          }
            pintarCarro(carro);
        });   
  }
}
document.addEventListener('DOMContentLoaded', leerCantidades);
function filterData(productos) {
  let text = searchInput.value.toLowerCase().trim() ;
  var filtered = [];
  for (let i = 0; i < productos.length; i++) {
    let prod = productos[i];
    // Search in multiple properties
    if (prod.name_prod.toLowerCase().includes(text) ||
    prod.precio.toString().includes(text)) 
                filtered.push(prod);
   }
  // Render filtered results to the list element 
  pintarProductos(filtered);
  leerCantidades();
}
searchInput.addEventListener("keyup", function() {  filterData(productos);
});
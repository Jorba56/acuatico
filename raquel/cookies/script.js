let carro=[];
import productos from './productos.js';
let lista=document.getElementById('productos2');
let listaCarro=document.getElementById('carrito2');
function pintarProductos(){
lista.innerHTML="";
    for(let i=0; i<productos.length;i++) {
        lista.innerHTML+=`
        <div class="tarjeta">
        <div class="producto${i+1}">
            <img src="${productos[i].imagen}">
            <h3 id="name_prod">${productos[i].name_prod}</h3>
            <p id="precio">${productos[i].precio}€</p>
            <button id="addProd${i+1}">Añadir al carro</button>
            <br>
        </div>
        </div>
        `;
    };
    
  }
function leerCantidades(){
  pintarProductos();
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
            pintarCarro();
        });
    };
    
  }

function pintarCarro(){

listaCarro.innerHTML="";
if (carro.length>0){
    for(let i=0; i<carro.length;i++) {
      let precioTotal=carro[i].precio*carro[i].cantidad;
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
  }else{
    listaCarro.innerHTML="<p>No hay productos en tu carro.</p>";
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
            
            pintarCarro();
        });
        const menos = document.getElementById(`restar${i+1}`);
        menos.addEventListener('click', ()=>{
          if (carro[i].cantidad>=1){
            carro[i].cantidad-=1;
            console.log(carro);
          }if(carro[i].cantidad===0){
            carro.splice(i,1);
          }
            pintarCarro();
        });
        
  }
}
document.addEventListener('DOMContentLoaded', leerCantidades);
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


/*<div class="producto2">
            <img src="https://thumb.pccomponentes.com/w-530-530/articles/1046/10467406/1647-logitech-g413-se-teclado-mecanico-gaming-retroiluminado-caracteristicas.jpg" alt="teclado">
            <h3 id="name_prod">Teclado</h3>
            <p id="precio">29.90€ </p>
            <button id="addProd">Añadir al carro</button>
            <br>
            </div>
    import productos from './productos.js';

let carro = [];

// Asegura que cada producto tenga cantidad inicial
productos.forEach(p => { if (typeof p.cantidad !== 'number') p.cantidad = 0; });

document.addEventListener('DOMContentLoaded', () => {
  // Botones que usan data-index (índice en el array) o data-id (id del producto)
  const botones = document.querySelectorAll('button[data-index], button[data-id]');

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const idxAttr = btn.getAttribute('data-index');
      const idAttr = btn.getAttribute('data-id');

      let producto;
      if (idxAttr !== null) {
        const idx = Number(idxAttr);
        producto = productos[idx];
      } else if (idAttr !== null) {
        producto = productos.find(p => String(p.id) === idAttr);
      }

      if (!producto) {
        console.warn('Producto no encontrado para el botón', btn);
        return;
      }

      // incrementar cantidad y añadir al carro
      producto.cantidad = (producto.cantidad || 0) + 1;
      carro.push(producto);

      console.log('Producto incrementado:', producto);
      console.log('Carro:', carro);

      // actualizar contador en DOM si existe un elemento .cantidad con el mismo data-index/data-id
      const selector = idxAttr !== null
        ? `.cantidad[data-index="${idxAttr}"]`
        : `.cantidad[data-id="${idAttr}"]`;
      const qtyEl = document.querySelector(selector);
      if (qtyEl) qtyEl.textContent = producto.cantidad;
    });
  });

  // Compatibilidad con botón único antiguo id="addProd" (si existe)
  const legacy = document.getElementById('addProd');
  if (legacy) {
    legacy.addEventListener('click', () => {
      const idx = 3; // comportamiento anterior: producto índice 3
      if (productos[idx]) {
        productos[idx].cantidad = (productos[idx].cantidad || 0) + 1;
        carro.push(productos[idx]);
        console.log('Carro (legacy):', carro);
        const qtyEl = document.querySelector(`.cantidad[data-index="${idx}"], .cantidad[data-id="${productos[idx].id}"]`);
        if (qtyEl) qtyEl.textContent = productos[idx].cantidad;
      }
    });
  }
});
// ...existing code */
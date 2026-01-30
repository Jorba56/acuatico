import productos from './productos.js';

// Variables Globales
let carro = [];
let filtered = [];
let cupon = false; // Estado del cupón
const CODIGO_CUPON = "10descuento"; // El código secreto

// Elementos del DOM
let lista = document.getElementById('productos2');
let listaCarro = document.getElementById('carrito2');
let searchInput = document.getElementById('searchInput');

// Elementos de Zona Usuario (Login y Caja)
const loginContainer = document.getElementById('login-container');
const cajaContainer = document.getElementById('caja-container');
const btnLogin = document.getElementById('btnLogin');
const errorLogin = document.getElementById('error-login');
const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');
const nombreUsuarioSpan = document.getElementById('nombre-usuario');
const btnComprarFinal = document.getElementById('btnComprarFinal');
const inputCupon = document.getElementById('cupon');
const addDesc = document.getElementById('aplicarDes'); // Asegúrate de tener este botón en el HTML
let valor=0;
// Users list
const users = [
    { username: "alumno", password: "agora" },
    { username: "admin", password: "1234" }
];

// Coupons list
const cupons = [
    { code: "DISCOUNT10", discount: 10 },
    { code: "CHRISTMAS20", discount: 20 },
    { code: "BLACKFRIDAY30", discount: 30 }
];

// ----------------------------------------------------------------
// 1. INICIALIZACIÓN
// ----------------------------------------------------------------

// Evento: Carga inicial de la página
document.addEventListener('DOMContentLoaded', () => {
    pintarProductos(productos);
    pintarCarro(carro); // Pintamos el carro vacío al inicio para ver el mensaje
});

// ----------------------------------------------------------------
// 2. LÓGICA DE PRODUCTOS Y BÚSQUEDA
// ----------------------------------------------------------------

// Evento: Buscador
searchInput.addEventListener("keyup", function() {  
    filterData(productos);
});

function filterData(productos) {
    let text = searchInput.value.toLowerCase().trim();
    filtered = []; // ¡IMPORTANTE! Limpiamos el array antes de rellenarlo
  
    for (let i = 0; i < productos.length; i++) {
        let prod = productos[i];
        if (prod.name_prod.toLowerCase().includes(text) || prod.precio.toString().includes(text)) {
            filtered.push(prod);
        }
    }
    pintarProductos(filtered);
}

function pintarProductos(array){
    lista.innerHTML = ""; // Limpiamos la lista antes de pintar
    
    for(let i=0; i<array.length; i++) {
        // Usamos insertAdjacentHTML para no romper los eventos de los botones anteriores
        lista.insertAdjacentHTML('beforeend', `
        <div class="tarjeta">
            <div class="producto${i+1}">
                <img src="${array[i].imagen}">
                <h3 id="name_prod">${array[i].name_prod}</h3>
                <p id="precio">${array[i].precio}€</p>
                <button id="addProd${i+1}">Añadir al carro</button>
                <br>
            </div>
        </div>
        `);

        // Añadimos el evento al botón recién creado
        const boton = document.getElementById(`addProd${i+1}`);
        boton.addEventListener('click', () => {
            // Comprobamos si ya existe en el carro
            if (array[i].cantidad >= 1){
                array[i].cantidad += 1;
            } else {
                array[i].cantidad = 1;
                carro.push(array[i]);
            }
            console.log(carro);
            pintarCarro(carro);
        });
    }
}

// ----------------------------------------------------------------
// 3. LÓGICA DEL CARRITO
// ----------------------------------------------------------------

function pintarCarro(carro){
    listaCarro.innerHTML = "";

    // 1. Cálculo matemático (números puros)
    let totalNumerico = carro.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    if (carro.length === 0){
        listaCarro.innerHTML += "<p>No hay productos en tu carro.</p>";
    } else {
        // Pintamos cada elemento del carro
        for(let i=0; i<carro.length; i++) {
            listaCarro.innerHTML += `
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
        }

        // 2. Aplicamos descuento si el cupón es válido
        let textoDescuento = "";
        if (cupon) {
            totalNumerico = totalNumerico * (1-valor); 
            textoDescuento = " <span style='color:green; font-weight:bold;'>("+valor*100+"% DTO)</span>";
        }

        // 3. Convertimos a texto (string) al final para mostrarlo
        let precFinal = totalNumerico.toFixed(2);
        listaCarro.innerHTML += `<h3>Precio total del carrito: ${precFinal}€ ${textoDescuento}</h3>`;
    }

    // Reasignamos los eventos de sumar/restar
    actualizarCarro(carro);
}

function actualizarCarro(carro){
    for (let i=0; i<carro.length; i++){
        // Botón Sumar
        const mas = document.getElementById(`sumar${i+1}`);
        if(mas) {
            mas.addEventListener('click', () => {
                carro[i].cantidad += 1;
                pintarCarro(carro);
            });
        }
        
        // Botón Restar
        const menos = document.getElementById(`restar${i+1}`);
        if(menos) {
            menos.addEventListener('click', () => {
                if (carro[i].cantidad > 1){
                    carro[i].cantidad -= 1;
                } else {
                    carro[i].cantidad = 0; // Reseteamos la cantidad antes de borrarlo
                    carro.splice(i, 1);    // Lo borramos del array
                }
                pintarCarro(carro);
            });   
        }
    }
}

// ----------------------------------------------------------------
// 4. LÓGICA DE USUARIO (LOGIN, CUPÓN Y PAGO)
// ----------------------------------------------------------------

// A) Login
btnLogin.addEventListener('click', () => {
    const user = userInput.value.trim();
    const pass = passInput.value.trim();
    let login=false;
    for (let i=0;i<users.length;i++){
        if (user ===users[i].username && pass === users[i].password) {
            login=true;
        } else {
            login=false;
        }
    }if(login){
        loginContainer.style.display = 'none';
        cajaContainer.style.display = 'block';
        nombreUsuarioSpan.textContent = user;
        errorLogin.style.display = 'none';
    }else{
        errorLogin.style.display = 'block';
    }
});

// B) Botón de Aplicar Cupón (INDEPENDIENTE)
if (addDesc) { // Verificamos que el botón existe para evitar errores
    addDesc.addEventListener('click', (cupons) => {
        const codigoIntroducido = inputCupon.value.trim();
        let cupon_valido="";
        if (carro.length === 0) {
            alert("Añade productos antes de usar un cupón.");
            return;
        }
         cupons.forEach(cuponArr => {
             if (codigoIntroducido.toLowerCase().trim() === cuponArr.code.toLowerCase().trim()) {
                /*alert(`¡Cupón '${cupones[i].code}' aplicado correctamente!`);
                pintarCarro(carro); // Actualizamos el precio visualmente*/
                cupon_valido=cuponArr.code;
                valor=(cuponArr.discount/100);
                cupon=true;
            } else {
                /*alert("El código de cupón no es válido.");
                pintarCarro(carro);*/
                cupon=false;
            };
         });{
            
        };
        if (cupon){
            alert(`¡Cupón '${cupon_valido}' aplicado correctamente!`);
            pintarCarro(carro); // Actualizamos el precio visualmente
        }else{
            alert("El código de cupón no es válido.");
            pintarCarro(carro);
        }
    })
}

// C) Botón Finalizar Compra
btnComprarFinal.addEventListener('click', () => {
    if (carro.length === 0) {
        alert("Tu carrito está vacío. Añade productos antes de pagar.");
    } else {
        alert("¡Compra realizada con éxito!");
            if(cupon){
             alert("Has ahorrado un "+(valor*100)+"% en tu compra.");
            };
        }
        
        

        // Reset completo
        carro.forEach(p => p.cantidad = 0); // Reseteamos cantidades de los objetos originales
        carro = [];
        cupon = false;
        inputCupon.value = "";
        pintarCarro(carro);
});

// -----------------------------
// IMPORT MODULES
// -----------------------------
// Import Express framework and CORS middleware
const express = require("express");
// CORS is used to allow cross-origin requests
const cors = require("cors");

// -----------------------------
// CREATE EXPRESS APP
// -----------------------------
const app = express();

// Enable CORS so the frontend can connect
app.use(cors());

// Enable JSON parsing in request bodies
app.use(express.json());

// -----------------------------
// DATABASE SIMULATION
// -----------------------------


// -----------------------------
// LOGIN ENDPOINT
// -----------------------------
// Handle POST requests to /login
app.post("/login", (req, res) => {

    // Get username and password from request body
    const { username, password } = req.body;

  // Check if the user exists in the list
    let validUser = null;

    for (let i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                validUser = users[i];
                break; // stop the loop once we find the user
            }
        }

    if (validUser) 
        res.json({ ok: true });
     else 
        res.json({ ok: false, message: "Incorrect username or password" });
    
});

// -----------------------------
// COUPON VALIDATION ENDPOINT
// -----------------------------
app.get("/coupon/:code", (req, res) => {

    // Get the coupon code from URL and make it uppercase
    const code = req.params.code.toUpperCase();

    // Check if the coupon exists in the list
    let couponFound  = null;

    for (let i = 0; i < coupons.length; i++) {
        if (coupons[i].code === code) {
            couponFound = coupons[i];
            break; // stop the loop once we find the coupon
        }
    }

    if (couponFound) {
        res.json({ valid: true, discount: couponFound.discount });
    } else {
        res.json({ valid: false });
    }
});
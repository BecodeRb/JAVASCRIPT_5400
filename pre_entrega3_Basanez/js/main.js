/*
const inventarioPizza = {
    1: { producto: "Margarita Clásica", tipo: "Margarita", precio: 190 },
    2: { producto: "Margarita Pesto", tipo: "Margarita", precio: 210 },
    3: { producto: "Margarita New York", tipo: "Margarita", precio: 250 },
    4: { producto: "Peperoni Clásica", tipo: "Pepperoni", precio: 210},
    5: { producto: "Peperoni Chicago", tipo: "Pepperoni", precio: 320},
    6: { producto: "Peperoni con anchoas", tipo: "Pepperoni", precio: 230},
    7: { producto: "4 Quesos Clásica",tipo: "4 Quesos", precio: 200 },
    8: { producto: "4 Quesos con Blue Cheese",tipo: "4 Quesos", precio: 220 },
    9: { producto: "Jamon Clásica",tipo: "Jamon", precio: 215},
    10: { producto: "Jamon Italiana",tipo: "Jamon", precio: 240},
*/


let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

//lamamos con DOM (DOCUMENT OBJECT MODEL)
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
let aside = document.querySelector("#aside");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

//funcion para llamar productos de array
function cargarProductos(productosElegidos){

    //vacia productos a mostrar
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div")

        div.classList.add("producto");
        //<div class="producto"> CONECTADO CON div.classList.add("producto"); EN FUNCION cargarProductos
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
    `;

    contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

//para cargar todos los productos 
if (e.currentTarget.id != "todos") {
    //encontrar nombre categoria para mostrar
    const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
    tituloPrincipal.innerText = productoCategoria.categoria.nombre;

    //filtrar categorias para cargar
    const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
    cargarProductos(productosBoton);
} else {
    tituloPrincipal.innerText = "Todos los productos";
    cargarProductos(productos);
}
        


    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #40BF16, #33821A)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
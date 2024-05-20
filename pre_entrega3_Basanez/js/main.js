

// Inventario de pizzas

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
    9: { producto: "Jamon Clásica",tipo: "Jamon", precio: 210},
    10: { producto: "Jamon Italiana",tipo: "Jamon", precio: 240},
};

*/

// PRODUCTOS
const productos = [
    // Pizzas
    {
        id: "Pizza Margarita",
        titulo: "Margarita Clásica",
        imagen: ".//img/productos/pizza_margarita_clasica-01.jpg",
        categoria: {
            nombre: "Margarita",
            id: "margarita"
        },
        precio: 190
    },
    {
        id: "Pizza Margarita",
        titulo: "Margarita Pesto",
        imagen: ".//img/productos/pizza_margarita_clasica-01.jpg",
        categoria: {
            nombre: "Margarita",
            id: "margarita"
        },
        precio: 210
    },
    {
        id: "Pizza Margarita",
        titulo: "Margarita New York",
        imagen: ".//img/productos/pizza_margarita_clasica-01.jpg",
        categoria: {
            nombre: "Margarita",
            id: "margarita"
        },
        precio: 250
    },
    {
        id: "Pizza Pepperoni",
        titulo: "Peperoni Clásica",
        imagen: ".//img/productos/pizza_margarita_clasica-01.jpg",
        categoria: {
            nombre: "Pepperoni",
            id: "pepperoni"
        },
        precio: 210
    },
    {
        id: "Pizza Pepperoni",
        titulo: "Peperoni Chicago",
        imagen: ".//img/productos/pizza_margarita_clasica-01.jpg",
        categoria: {
            nombre: "Pepperoni",
            id: "pepperoni"
        },
        precio: 320
    }
    
];

//lamamos con DOM (DOCUMENT OBJECT MODEL)
const contenedorProductos = document.querySelector("#contenedor-productos");



//funcion para llamar productos de array
function cargarProductos(){

    productos.forEach(producto => {

         let div = document.createElement("div")

        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
    `;

    contenedorProductos.append(div)

    })

}

cargarProductos();

/*

<div class="producto"> CONECTADO CON div.classList.add("producto"); EN FUNCION cargarProductos
<img class="producto-imagen" src="./img/pizza/01.jpg" alt="*>
<div class="producto-detalles"›
<h3 class="producto-titulo">PIZZA</h3>
<p class="producto-precio"≥$100</p›
<button class="producto-agregar"›Agregar</button>
</div>
</div>

*/
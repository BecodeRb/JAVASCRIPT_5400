
let productos = [];

fetch(".//productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

//lamamos con DOM (DOCUMENT OBJECT MODEL)
const contenedorProductos = document.querySelector("#contenedor-productos");

const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal");



//funcion para llamar productos de array
function cargarProductos(productosElegidos){

    //vacia productos a mostrar
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div")

        div.classList.add("producto");
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
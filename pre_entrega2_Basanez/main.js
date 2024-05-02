// Definición de constantes para apellido y habitación
const Apellido_Correcto = 'MESSI';
const Habitacion_Correcta = 280;

// Función principal para validar el acceso
function validarAcceso() {
    let txtUsuario, txtHabitacion;
    do {
        txtUsuario = prompt("Ingrese Apellido de reserva").trim().toUpperCase();
        txtHabitacion = parseInt(prompt("Ingrese número de habitación"), 10);

        // Validación de apellido
        if (txtUsuario !== Apellido_Correcto) {
            alert("Apellido incorrecto");
        } else {
            console.log("Usuario correcto");
        }

        // Validación de habitación
        if (isNaN(txtHabitacion) || txtHabitacion !== Habitacion_Correcta) {
            alert("Habitación inválida");
        } else {
            console.log("Habitación correcta");
        }

    } while (txtUsuario !== Apellido_Correcto || isNaN(txtHabitacion) || txtHabitacion !== Habitacion_Correcta);

    // Bienvenida al usuario
    alert(`Bienvenido ${txtUsuario} de la habitación ${txtHabitacion}.\nEste es el menú de pizzas del hotel.\nHaga su pedido`);

}

// Inventario de pizzas
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

let carrito = [];

// Función para agregar pizza al carrito
function agregarPizza() {
    const tipo = prompt("Ingrese el tipo de pizza para filtrar (Margarita, Pepperoni, 4 Quesos, Jamón) o deje en blanco para ver todas:");
    let menu = "Seleccione la Pizza 🍕:\n";

    // Filtra las pizzas por tipo si el usuario ha ingresado un filtro
    const pizzasFiltradas = tipo ? Object.values(inventarioPizza).filter(pizza => pizza.tipo.toLowerCase() === tipo.toLowerCase()) : Object.values(inventarioPizza);


    // Genera el menú en base a las pizzas filtradas
    pizzasFiltradas.forEach((pizza, index) => {
        menu += `${index + 1} - ${pizza.producto} ($${pizza.precio})\n`;
    });

    // Asegura que hay opciones disponibles después del filtro
    if (pizzasFiltradas.length === 0) {
        alert("No hay pizzas disponibles para el filtro proporcionado. Mostrando todas las opciones.");
        return agregarPizza(); // Vuelve a mostrar todas las pizzas si el filtro no coincide
    }

    let pizzaSeleccionada;
    do {
        pizzaSeleccionada = parseInt(prompt(menu), 10);
    } while (isNaN(pizzaSeleccionada) || pizzaSeleccionada < 1 || pizzaSeleccionada > pizzasFiltradas.length);

    // Ajusta el índice de selección basado en el filtro aplicado
    const pizzaRealIndex = tipo ? Object.values(inventarioPizza).indexOf(pizzasFiltradas[pizzaSeleccionada - 1]) + 1 : pizzaSeleccionada;

    carrito.push(inventarioPizza[pizzaRealIndex]);
}

// Función para manejar el proceso de agregar pizzas
function manejarCarrito() {
    let preguntaAdd;
    do {
        agregarPizza();
        preguntaAdd = parseInt(prompt("¿Desea continuar agregando al carrito? 1: Sí, 2: No"), 10);
    } while (preguntaAdd === 1);

    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    document.write("Tu orden: 🍕🍕🍕PIZZAS🍕🍕🍕");
    carrito.forEach((pizza, index) => {
        document.write(`<br>${index + 1} - ${pizza.producto} ($${pizza.precio})`);
    });
}

// Iniciar validación de acceso
validarAcceso();
// Manejar proceso de carrito después de la validación
manejarCarrito();
















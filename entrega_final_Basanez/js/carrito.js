const apellido_correcto = "MESSI";
const habitacion_correcta = 280;

const alertaAgregandoProducto = (operacion, mensaje) => {
  const color = operacion == "+" ? "#4fbe87" : "#e74c3c";

  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: color,
    },
  }).showToast();
};

/* const pagar = () => {
  let apellido = document.getElementById("apellido");
  let habitacion = document.getElementById("habitacion");
  const carrito = obtenerCarrito();


  if (apellido.value == apellido_correcto) {
    apellido.classList.remove("is-invalid");
    apellido.classList.add("is-valid");
  } else {
    apellido.classList.remove("is-valid");
    apellido.classList.add("is-invalid");
  }

  if (habitacion.value == habitacion_correcta) {
    habitacion.classList.remove("is-invalid");
    habitacion.classList.add("is-valid");
  } else {
    habitacion.classList.remove("is-valid");
    habitacion.classList.add("is-invalid");
  }
  if (
    apellido.value == apellido_correcto &&
    habitacion.value == habitacion_correcta && carrito.length > 0
  ) {
    eliminarProductoDelCarrito();
    alertaAgregandoProducto("+", "Compra cargada a la Habitacion");
    
  }
}; */

// refactorizacion de codigo pagar

const resetearFormulario = () => {
  let apellido = document.getElementById("apellido");
  let habitacion = document.getElementById("habitacion");

  apellido.value = "";
  habitacion.value = "";

  removerClase(apellido, "is-valid");
  removerClase(apellido, "is-invalid");
  removerClase(habitacion, "is-valid");
  removerClase(habitacion, "is-invalid");
};

const agregarClase = (elemento, clase) => {
  elemento.classList.add(clase);
};

const removerClase = (elemento, clase) => {
  elemento.classList.remove(clase);
};

//validacion de si es correcto nombre y habitacion autorizadas

const validarElemento = (elemento, valor_correcto) => {
  if (elemento.value.toUpperCase() == valor_correcto) {
    removerClase(elemento, "is-invalid");
    agregarClase(elemento, "is-valid");
    return true;
  } else {
    removerClase(elemento, "is-valid");
    agregarClase(elemento, "is-invalid");
    return false;
  }
};

const pagar = () => {
  let apellido = document.getElementById("apellido");
  let habitacion = document.getElementById("habitacion");
  const carrito = obtenerCarrito();

  if (carrito.length) {
    const apellidoValido = validarElemento(apellido, apellido_correcto);
    const habitacionValida = validarElemento(habitacion, habitacion_correcta);

    if (apellidoValido && habitacionValida && carrito.length > 0) {
      eliminarProductoDelCarrito();
      alertaAgregandoProducto("+", "Compra cargada a la Habitacion");
      resetearFormulario();
    }
  } else {
    alertaAgregandoProducto("-", "El carrito está vacío");
  }
};

const obtenerCarrito = () => {
  const carrito = localStorage.getItem("carrito");

  return carrito ? JSON.parse(carrito) : [];
};

const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));

  obtenerPizzas();
};

const eliminarProductoDelCarrito = (id) => {
  if (id == undefined) {
    // Eliminar el carrito del localStorage
    const carrito = obtenerCarrito();
    if (carrito.length > 0) {
      localStorage.removeItem("carrito");
      obtenerPizzas();
    }
  } else {
    // Obtener el carrito del localStorage
    let carrito = obtenerCarrito();

    // Filtrar el carrito para eliminar el producto con el id especificado
    carrito = carrito.filter((producto) => producto.id != id);
    // Guardar el carrito actualizado en el localStorage
    guardarCarrito(carrito);
    alertaAgregandoProducto("-", "Producto eliminado del carrito");
  }
};

const vaciarCarrito = () => {
  const carrito = obtenerCarrito();
  if (carrito.length > 0) {
    eliminarProductoDelCarrito();
    alertaAgregandoProducto("-", "El carrito está vacío");
  }
};

const obtenerPizzas = () => {
  // Llama a esta función para actualizar el total del carrito en la interfaz de usuario

  fetch("js/productos.json")
    .then((response) => {
      return response.json();
    })
    .then((productos) => {
      //LLAMAR AL ID DEL HTML
      const elemento_html_productos = document.getElementById("carrito");

      let contenido = "";
      //obtenemos el valor del localstorage
      let carrito = obtenerCarrito();

      let total = 0;
      // FUNCION PARA PINTAR PRODUCTOS EN HTML
      console.log(carrito);
      carrito.forEach((producto_carrito) => {
        /*  productos.find(producto => producto.id === id); */
        let producto = productos.find(
          (producto) => producto.id == producto_carrito.id
        );
        producto.cantidad = producto_carrito.cantidad;
        producto.subtotal = producto_carrito.cantidad * producto.precio;

        total += producto.subtotal;
        contenido += componenteProducto(producto);
      });

      elemento_html_productos.innerHTML = contenido;

      total > 0
        ? componenteTotal(`$${total} MXN`)
        : componenteTotal("$0.00 MXN");
    })

    //avisa de errror si existe alguno en JSON por consola
    .catch((error) => {
      console.error("error en el json de productos", error);
    });
};

obtenerPizzas();

// Función para agregar o actualizar un item en el carrito
const actulizarCarrito = (id, operacion) => {
  let carrito = obtenerCarrito();

  //documentacion findIndex https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  const pizza_id = carrito.findIndex((pizza) => pizza.id == id);

  if (pizza_id != -1) {
    // Si la pizza existe, actualiza la cantidad
    if (operacion == "+") {
      //agregamos elementos a la pizza
      carrito[pizza_id].cantidad += 1;
      alertaAgregandoProducto("+", "Producto agregado del carrito");
    } else if (operacion == "-") {
      //quitamos elementos a la pizza
      carrito[pizza_id].cantidad -= 1;
      // Si la cantidad es cero o menor, remueve la pizza del carrito
      if (carrito[pizza_id].cantidad <= 0) {
        carrito.splice(pizza_id, 1);
      }

      alertaAgregandoProducto("-", "Producto eliminado del carrito");
    }
  } else {
    // Si la pizza no existe, agrega uno nuevo

    if (operacion == "+") {
      carrito.push({ id, cantidad: 1 });
      alertaAgregandoProducto("+", "Producto agregado del carrito");
    }
  }

  // Guarda el carrito actualizado en localStorage
  guardarCarrito(carrito);
};

const componenteTotal = (texto) => {
  document.getElementById("total").innerHTML = texto;
};

const componenteProducto = (producto) => {
  return `<div class="card mb-3">
    <div class="row g-0">
        <div class="col-md-1">
            <img src="${producto.imagen}"
                class="img-fluid rounded-start img-product" alt="...">
        </div>
        <div class=" col-md-4 align-content-space-evenly">

            <div class="p-2 ">
                <p class="p-0 m-0">Titulo</p>
                <strong>${producto.producto}</strong>
            </div>


        </div>
        <div class="col-md-2 align-content-space-evenly text-center">
            <div class="p-2 ">
                <p class="p-0 m-0">Cantidad</p>
                <div class="input-group">
                    <button class="btn btn-outline-secondary btn-main-color" type="button"
                        id="button-addon1"  onClick="actulizarCarrito(${producto.id},'-')">-</button>
                    <input type="text" class="form-control text-center" min="0" value="${producto.cantidad}" disabled>
                    <button class="btn btn-outline-secondary btn-main-color" type="button"  onClick="actulizarCarrito(${producto.id},'+')">+</button>
                </div>
            </div>

        </div>
        <div class="col-md-2 align-content-space-evenly">

            <div class="p-2 ">
                <p class="p-0 m-0">Precio</p>
                <strong>$${producto.precio} MXN</strong>
            </div>
        </div>
        <div class="col-md-2 align-content-space-evenly">
            <div class="p-2 ">
                <p class="p-0 m-0">Subtotal</p>
                <strong>$${producto.subtotal} MXN</strong>
            </div>
        </div>
        <div class="col-md-1 align-content-space-evenly text-center">
            <button class="btn-trash btn bi bi-trash-fill" onClick="eliminarProductoDelCarrito(${producto.id})" ></button>
        </div>
    </div>
</div>`;
};

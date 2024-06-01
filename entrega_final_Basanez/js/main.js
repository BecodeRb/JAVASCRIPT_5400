const obtenerCarrito = () => {
  const carrito = localStorage.getItem("carrito");

  /*   if (carrito) {
    return JSON.parse(carrito);
  } else {
    return [];
  } */

  //refactor
  return carrito ? JSON.parse(carrito) : [];
};

const alertaAgregandoProducto = (operacion, mensaje) => {
  const color =
    operacion == "+"
      ? "#4fbe87"
      : "#e74c3c";

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

const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const mostrarCantidadTotal = () => {
  const carrito = obtenerCarrito();
  let cantidad_total = 0;

  // Recorrer el carrito y sumar las cantidades
  carrito.forEach((item) => {
    cantidad_total += item.cantidad;
  });

  document.getElementById("total_carrito").innerHTML = cantidad_total;
};

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

  // Actualiza el valor del input correspondiente
  const input_element = document.getElementById(`pizza-${id}`);
  //verifico si existe el elemento para poder actulizar el input
  if (input_element) {
    const _pizza_id = carrito.find((pizza) => pizza.id == id);

    input_element.value = _pizza_id ? _pizza_id.cantidad : 0;
  }
  // Llama a esta función para actualizar el total del carrito en la interfaz de usuario
  mostrarCantidadTotal();
};

// Inventario de pizzas
/*
const inventario_pizza = {
  1: { producto: "Margarita Clásica", tipo: "Margarita", precio: 190 },
  2: { producto: "Margarita Pesto", tipo: "Margarita", precio: 210 },
  3: { producto: "Margarita New York", tipo: "Margarita", precio: 250 },
  4: { producto: "Peperoni Clásica", tipo: "Pepperoni", precio: 210},
  5: { producto: "Peperoni Chicago", tipo: "Pepperoni", precio: 320},
  6: { producto: "Peperoni con anchoas", tipo: "Pepperoni", precio: 230},
  7: { producto: "4 Quesos Clásica",tipo: "4 Quesos", precio: 200 },
  8: { producto: "4 Quesos con Blue Cheese",tipo: "4 Quesos", precio: 220 },
  9: { producto: "Jamon Clásica",tipo: "Jamon", precio: 210},
*/

//PRODUCTOS

//BAJAR PRODUCTOS DE JSON ("API LOCAL")
const obtenerPizzas = (categoria_id) => {
  // Llama a esta función para actualizar el total del carrito en la interfaz de usuario
  mostrarCantidadTotal();

  fetch("js/productos.json")
    .then((response) => {
      return response.json();
    })
    .then((productos) => {
      //LLAMAR AL ID DEL HTML
      const elemento_html_productos = document.getElementById("productos");

      let contenido = "";
      //obtenemos el valor del localstorage
      let carrito = obtenerCarrito();
      // FUNCION PARA PINTAR PRODUCTOS EN HTML

      productos.forEach((producto) => {
        //verificamos si la pizza esta agregado al carrito
        const pizza_id = carrito.findIndex((pizza) => pizza.id == producto.id);
        //si se encuentra agregada modificamos el valor del input si no le agregamos 0
        let valor = pizza_id != -1 ? carrito[pizza_id].cantidad : 0;

        if (categoria_id == undefined) {
          contenido += componenteTarjetaProducto(producto, valor);
        } else {
          if (producto.categoria.id == categoria_id) {
            contenido += componenteTarjetaProducto(producto, valor);
          }
        }
      });

      elemento_html_productos.innerHTML = contenido;
    })

    //avisa de errror si existe alguno en JSON por consola
    .catch((error) => {
      console.error("error en el json de productos", error);
    });
};

obtenerPizzas();

//-----------------------//

//CATEGORIAS

//BAJAR CATEGORIAS DE JSON ("API LOCAL")
const obtenerCategorias = () => {
  fetch("js/categorias.json")
    .then((response) => {
      return response.json();
    })
    .then((categorias) => {
      //LLAMAR AL ID DEL HTML
      const elemento_html_catagoria = document.getElementById("categorias");

      let contenido = "";

      categorias.forEach((categoria) => {
        // funcion para pintar categorias en html con la info de la categoria correspondiente
        contenido += componenteBotonCategoria(categoria);
      });
      //elemento_html_catagoria.innerHTML = contenido;

      //solucion para poner los productos abajo de "Todos del producto" https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
      elemento_html_catagoria.insertAdjacentHTML("beforeend", contenido);
    })
    //AVISA SI HAY ERROR EN JSON DE CATEGORIAS
    .catch((error) => {
      console.error("error en el json de categorias", error);
    });
};

obtenerCategorias();

const componenteBotonCategoria = (data) => {
  return `<button type="button" class="list-group-item list-group-item-action btn-main-color" onClick="obtenerPizzas(${data.id})" >${data.nombre}</button>`;
};

const componenteTarjetaProducto = (data, cantidad) => {
  return ` <div class="col-4">
        <div class="card  mb-2">
          <img src="${data.imagen}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.producto}</h5>
            <p class="card-text">${data.categoria.nombre}</p>
            <p class="card-text">$${data.precio} MXN</p>
            <div class="input-group">
              <button class="btn btn-outline-secondary btn-main-color" type="button" id="button-addon1" onClick="actulizarCarrito(${data.id},'-')">-</button>
              <input  id="pizza-${data.id}" type="text" class="form-control text-center" min="0" value="${cantidad}" disabled>
              <button class="btn btn-outline-secondary btn-main-color" type="button" onClick="actulizarCarrito(${data.id},'+')">+</button>
            </div>
          </div>
        </div>
      </div>`;
};

//verificar que el DOM este cargado totalmente
document.addEventListener("DOMContentLoaded", () => {
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
      10: { producto: "Jamon Italiana",tipo: "Jamon", precio: 240},
  */
  
    window.obtenerPizzas = (categoria_id) => {
      fetch("js/productos.json")
        .then((response) => {
          return response.json();
        })
        .then((productos) => {
          const elemento_html_productos = document.getElementById("productos");
  
          let contenido = "";
  
          productos.forEach((producto) => {
            if (categoria_id == undefined) {
              contenido += vistaTarjetaProducto(producto);
            } else {
              if (producto.categoria.id == categoria_id) {
                contenido += vistaTarjetaProducto(producto);
              }
            }
          });
  
          elemento_html_productos.innerHTML = contenido;
        })
        .catch((error) => {
          console.error("error en el json de productos", error);
        });
    };
  
    obtenerPizzas();
  
    const obtenerCategorias = () => {
      fetch("js/categorias.json")
        .then((response) => {
          return response.json();
        })
        .then((categorias) => {
          const elemento_html_catagoria = document.getElementById("categorias");
  
          let contenido = "";
  
          categorias.forEach((categoria) => {
            contenido += vistaBotonCategoria(categoria);
          });
          //elemento_html_catagoria.innerHTML = contenido;
  
          //solucion para poner los productos abajo de "Todos del producto" https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
          elemento_html_catagoria.insertAdjacentHTML("beforeend", contenido);
        })
        .catch((error) => {
          console.error("error en el json de categorias", error);
        });
    };
  
    obtenerCategorias();
  
    const vistaBotonCategoria = (data) => {
      return `<button type="button" class="list-group-item list-group-item-action btn-main-color" onClick="obtenerPizzas(${data.id})" >${data.nombre}</button>`;
    };
  
    const vistaTarjetaProducto = (data) => {
      return ` <div class="col-4">
      <div class="card  mb-2">
        <img src="./img/productos/pizza_margarita_clasica-01.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.producto}</h5>
          <p class="card-text">${data.categoria.nombre}</p>
          <p class="card-text">$${data.precio} MXN</p>
          <div class="input-group">
            <button class="btn btn-outline-secondary btn-main-color" type="button" id="button-addon1">-</button>
            <input type="text" class="form-control text-center" min="0" value="0" disabled>
            <button class="btn btn-outline-secondary btn-main-color" type="button">+</button>
          </div>
        </div>
      </div>
    </div>`;
    };
  });
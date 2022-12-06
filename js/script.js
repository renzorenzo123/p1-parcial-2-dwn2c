const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  let img = document.createElement("img");
  img.src = `${product.img}`;
  content.appendChild(img);
  let h3 = document.createElement("h3");
  h3.textContent = `${product.nombre}`;
  content.appendChild(h3);
  let p = document.createElement("p");
  p.textContent = `${product.descripcion}`;
  content.appendChild(p);
  let p2 = document.createElement("p");
  p2.textContent = `${product.categoria}`;
  content.appendChild(p2);
  let p3 = document.createElement("p");
  p3.className = "price";
  p3.textContent = `$ ${product.precio}`;
  content.appendChild(p3);

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some(
      (repeatProduct) => repeatProduct.id === product.id
    );

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      carritoCounter();
      saveLocal();
    }
  });
});

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));

carritoCounter();

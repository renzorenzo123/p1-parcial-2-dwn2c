const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  let headcarrito = document.createElement("h1");
  headcarrito.className = "modal-header-title";
  headcarrito.textContent = "Carrito";
  modalHeader.appendChild(headcarrito);

  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "X";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";

    let img = document.createElement("img")
    img.src = `${product.img}`
    carritoContent.appendChild(img)
    let h3 = document.createElement("h3")
    h3.textContent = `${product.nombre}`
    carritoContent.appendChild(h3)
    let p = document.createElement("p")
    p.textContent = `$ ${product.precio}`
    carritoContent.appendChild(p)
    let span = document.createElement("span")
    span.className = "restar"
    span.textContent = `➖`
    carritoContent.appendChild(span)
    let p2 = document.createElement("p")
    p2.textContent = `Cantidad: ${product.cantidad}`
    carritoContent.appendChild(p2)
    let span2 = document.createElement("span")
    span2.className = "sumar"
    span2.textContent = `➕`
    carritoContent.appendChild(span2)
    let p3 = document.createElement("p")
    p3.textContent = `Total: ${product.cantidad * product.precio}`
    carritoContent.appendChild(p3)
    let span3 = document.createElement("span")
    span3.className = "delete-product"
    span3.textContent = `❌`
    carritoContent.appendChild(span3)

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");

    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
 let totalcompra = document.createElement("p")
 totalcompra.textContent = `total a pagar: ${total} $`;
 totalBuying.appendChild(totalcompra)
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundid = carrito.find((element) => element.id === id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundid;
  });
  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

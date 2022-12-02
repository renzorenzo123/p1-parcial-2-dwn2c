const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carrito</h1>
      `;
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
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>${product.precio} $</p>
      <spam class="restar"> ➖ </spam>
      <p>Cantidad: ${product.cantidad}</p>
      <spam class="sumar"> ➕ </spam>
      <p>Total: ${product.cantidad * product.precio}</p>
       <span class="delete-product"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

    

    let restar = carritoContent.querySelector(".restar")

restar.addEventListener("click", () => {
  if(product.cantidad !== 1){
  product.cantidad--
  }
  saveLocal();
  pintarCarrito();
});

let sumar = carritoContent.querySelector(".sumar")

sumar.addEventListener("click", () => {
  product.cantidad++
  saveLocal();
  pintarCarrito();
});

let eliminar = carritoContent.querySelector(".delete-product");
eliminar.addEventListener("click", () => {
  eliminarProducto(product.id);
})

  // let eliminar = document.createElement("spam");
  //   eliminar.innerText = "❌";
  //   eliminar.className = "delete-product";
  //   carritoContent.append(eliminar);

  //   eliminar.addEventListener("click", eliminarProducto);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `total a pagar: ${total} $`;
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

localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

};


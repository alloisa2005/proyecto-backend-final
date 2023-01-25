
document.addEventListener("DOMContentLoaded", () => {  
  let products_container = document.getElementsByClassName('products_container')[0];
  loadProducts();
 
    

  // Cargo grilla inicial con los productos
  async function loadProducts() {

    try {
      let response = await fetch('/api/productos');
      let data = await response.json();

      if(data.status === 'OK'){
        for (let i = 0; i < data.result.length; i++) {
          const product = data.result[i];
          let product_card = `
            <div class="border border-black overflow-hidden hover:cursor-pointer rounded-md hover:shadow-xl hover:scale-105 duration-200">  
              <p class="prod_id hidden id_product">${product._id} </p>
              <p class="prod_codigo hidden">${product.codigo}</p>
              <p class="prod_stock hidden"> ${product.stock}</p>
              <img class="prod_img h-[230px] w-full object-cover" src="${product.foto}"  alt="">
              <div class="p-2">
                <p class="prod_nombre font-bold text-xl">${product.nombre}</p>
                <p class="prod_desc font-bold text-gray-700">${product.descripcion}</p>
                <div class="flex justify-between items-center">
                  <p class="prod_precio font-bold text-gray-700"> Precio ($): ${product.precio}</p>                                   
                  <img class="btn_add w-[24px] hover:cursor-pointer hover:bg-red-500 rounded-full" src="./images/add-icon.png" alt="Add Icon">
                </div>
              </div>
            </div>`;
          products_container.innerHTML += product_card;
        }

        let btns_add = document.getElementsByClassName('btn_add');
        for (let i = 0; i < btns_add.length; i++) {
          const button = btns_add[i];
          button.addEventListener('click', addToCart)
        }    

        cartQuantity();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function cartQuantity(){
    try {
      let response = await fetch('/api/carrito/cant');    
      let data = await response.json();                  

      if(data.status === 'OK'){
        document.getElementById('cart_quantity').innerText = data.cantidad;        
      } 
    } catch (error) {
      console.log(error);
    }    
  }

  async function addToCart(event) {
    let product_card = event.target.parentElement.parentElement.parentElement;

    let prod_id = product_card.getElementsByClassName('prod_id')[0].innerText;
    let prod_nombre = product_card.getElementsByClassName('prod_nombre')[0].innerText;
    let prod_desc = product_card.getElementsByClassName('prod_desc')[0].innerText;
    let prod_codigo = product_card.getElementsByClassName('prod_codigo')[0].innerText;
    let prod_foto = product_card.getElementsByClassName('prod_img')[0].src;
    let prod_precio = parseFloat(product_card.getElementsByClassName('prod_precio')[0].innerText.replace('Precio ($):',''));
    let prod_stock = parseInt(product_card.getElementsByClassName('prod_stock')[0].innerText);

    let producto = {
      product_id: prod_id,
      quantity: 1,
      price: prod_precio,
      nombre: prod_nombre,
      descripcion: prod_desc,
      codigo: prod_codigo,
      foto: prod_foto,
      stock: prod_stock
    }

    let response = await fetch('/api/carrito', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({producto}) 
    });
    let data = await response.json();
    
    if(data.status === 'OK') {    
      //alert('Producto agregado al carrito');    
      swal(prod_nombre, "¡añadido al carrito!", "success", {
        button: "Aceptar",
      });
    }
    cartQuantity();
  }

});
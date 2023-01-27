
document.addEventListener("DOMContentLoaded", () => {

  cartCantidad();

  let btns_add = document.getElementsByClassName('btn_add');
  for (let i = 0; i < btns_add.length; i++) {
    const button = btns_add[i];    
    button.addEventListener('click', addToCart)   
  } 

  let btn_search = document.getElementById('btn_search');
  btn_search.addEventListener('click', searchProduct)

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
      swal(prod_nombre, "¡añadido al carrito!", "success", {
        button: "Aceptar",
      });
    }  

    cartCantidad();
  }

  async function cartCantidad() {

    let response = await fetch('/api/carrito/cant');
    let data = await response.json();    

    //console.log(data);

    document.getElementById('cart_quantity').innerText = data.cantidad;    
  }

  async function searchProduct(e) {

    let searchTXT = document.getElementById('search_text').value; 
    let response;
    if(searchTXT){
      response = await fetch(`/api/productos/name/${searchTXT}`);
    } else {
      response = await fetch(`/api/productos/`);
    }
    
    let data = await response.json();
    let productos = data.result;

    let container = document.getElementsByClassName('products_container')[0];
    let prod_card = '';
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      prod_card += `
        <div class="group border border-black overflow-hidden hover:cursor-pointer rounded-md  hover:scale-105 duration-200">  
          <p class="prod_id hidden id_product"> ${producto._id}  </p>
          <p class="prod_codigo hidden"> ${producto.codigo} </p>
          <p class="prod_stock hidden"> ${producto.stock} </p>
          <img class="prod_img h-[250px] w-full object-cover grayscale group-hover:grayscale-0" src="${producto.foto}"  alt="">
          <div class="p-2">
            <p class="prod_nombre font-extrabold text-lg"> ${producto.nombre} </p>
            <p class="prod_desc font-bold text-white"> ${producto.descripcion} </p>
            <div class="flex justify-between items-center">
              <p class="prod_precio font-bold text-white"> Precio ($): ${producto.precio} </p>                                   
              <img class="btn_add w-[24px] hover:cursor-pointer hover:bg-white duration-300 rounded-full" src="./images/add-icon.png" alt="Add Icon">
            </div>
          </div>
        </div>
      `
    }
    container.innerHTML = prod_card;
  }
});
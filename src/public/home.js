
document.addEventListener("DOMContentLoaded", () => {

  //cartCantidad();

  let btns_add = document.getElementsByClassName('btn_add');
  for (let i = 0; i < btns_add.length; i++) {
    const button = btns_add[i];    
    button.addEventListener('click', addToCart)   
  }   

  let imagenes = document.getElementsByClassName('prod_img');
  for (let i = 0; i < imagenes.length; i++) {
    const imagen = imagenes[i];
    imagen.addEventListener('click', (e) => {
      let card = e.target.parentElement;
      let id_prod = card.getElementsByClassName('prod_id')[0].innerText;
      
    });
  }


  async function addToCart(event) {
    let product_card = event.target.parentElement.parentElement.parentElement;

    let prod_id = product_card.getElementsByClassName('prod_id')[0].innerText.trim();
    let prod_nombre = product_card.getElementsByClassName('prod_nombre')[0].innerText.trim();
    let prod_desc = product_card.getElementsByClassName('prod_desc')[0].innerText.trim();
    let prod_codigo = product_card.getElementsByClassName('prod_codigo')[0].innerText.trim();
    let prod_foto = product_card.getElementsByClassName('prod_img')[0].src.trim();
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
  }

  /* async function cartCantidad() {

    let response = await fetch('/api/carrito/cant');
    let data = await response.json();    

    //console.log(data);

    document.getElementById('cart_quantity').innerText = data.cantidad;    
  }   */

});
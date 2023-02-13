
document.addEventListener("DOMContentLoaded", () => {       

  let change_qty = document.getElementsByClassName('change_qty');
  for (let i = 0; i < change_qty.length; i++) {
    const button = change_qty[i];
    button.addEventListener('change', changeQuantity)
  }   
  
  let btn_eliminar = document.getElementsByClassName('btn_eliminar');
  for (let i = 0; i < btn_eliminar.length; i++) {
    const button = btn_eliminar[i];
    button.addEventListener('click', deleteProduct)
  }
  
  let fin_compra = document.getElementById('fin_compra');
  fin_compra.addEventListener('click', confirmoCompra)
  

  async function changeQuantity(e) {
    let card_carrito = e.target.parentElement.parentElement.parentElement.parentElement;

    //console.log(card_carrito.getElementsByClassName('id_cart')[0].innerText);
    //console.log(card_carrito.getElementsByClassName('id_product')[0].innerText);
  }
  
  async function deleteProduct(e) {
    let card_carrito = e.target.parentElement.parentElement.parentElement;

    let id_cart = card_carrito.getElementsByClassName('id_cart')[0].innerText.trim();
    let id_prod = card_carrito.getElementsByClassName('id_product')[0].innerText.trim();

    let result = await fetch(`/api/carrito/${id_cart}/productos/${id_prod}`, { 
      method: 'DELETE', 
      headers: {
      'Content-Type': 'application/json; charset=UTF-8'
      } 
    });    
    let data = await result.json();    
  }

  async function confirmoCompra(e) {
    e.preventDefault();
    let cart_cantidad = document.getElementById('cart_cantidad').innerText;
    cart_cantidad = parseInt( cart_cantidad.replace('Cantidad de Productos:','').trim() );

    if(cart_cantidad > 0) {
      let cartId = document.getElementsByClassName('id_cart')[0].innerText.trim();    
  
      let response = await fetch('/api/compras', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({cartId}) 
      });
      let data = await response.json();

      if(data.status === 'OK'){
        document.getElementsByClassName('products_container')[0].innerHTML = '';
        document.getElementById('cart_cantidad').innerText = 'Cantidad de Productos: 0';
        document.getElementById('cart_total').innerText = 'Total de la Compra ($): 0.0';
        document.getElementById('cart_quantity_subtitle').innerText = 'No tiene productos en el carrito';

        swal(`Gracias ${data.result.user.nombre}`, `Envíamos un correo a ${data.result.user.email} con el detalle de la compra`, "success", {
          button: "Aceptar",
        });
      }
    } else{
      swal("No hay productos en el carrito", "No se puede efectuar la compra", "error", {
        button: "Aceptar",
      });
    }
  }
});



document.addEventListener("DOMContentLoaded", () => { 

  cartQuantity();



  async function cartQuantity(){

    fetch('/api/carrito/cant')
      .then(res => res.json())
      .then(data => {
        let p_cantidad = document.getElementsByClassName('cart_quantity')[0];
        p_cantidad.innerText = data.cantidad;    
      });   
  }
});
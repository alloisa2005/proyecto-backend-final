
document.addEventListener("DOMContentLoaded", () => {     
  
  //cartQuantity();    
  //loadCartProducts();  

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
  /* document.getElementById('cart_quantity_nav').innerText = data.cantidad; */
  /* document.getElementById('cart_quantity_subtitle').innerText = `El carrito contiene XXX producto`;   */

  async function cartQuantity(){
    try {
      let response = await fetch('/api/carrito/cant');    
      let data = await response.json();   

      document.getElementById('cart_quantity_nav').innerText = data.cantidad;
      if(data.cantidad === 1){
        document.getElementById('cart_quantity_subtitle').innerText = `El carrito contiene ${data.cantidad} producto`;
      }else{
        document.getElementById('cart_quantity_subtitle').innerText = `El carrito contiene ${data.cantidad} productos`;
      } 
    } catch (error) {
      console.log(error);
    }    
  }    

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

    console.log(data);
  }
});

/*

<div class="py-2">
          <div class="w-full border-2 border-gray-700 p-4 flex items-center space-x-8 rounded-lg">
            <img class="w-[120px]" src="../images/logo.png" alt="">
            <div class="w-full px-4">
              <p class="text-2xl font-bold">Auriculares Gamer</p>
              <p class="text-xl py-1">Inalambricos</p>
              <div class="w-full flex items-center justify-between">
                <p class="text-lg">Precio ($): 1200</p>
                <div class="flex items-center space-x-4">
                  <label class="text-lg" for="cantidad">Cantidad:</label>
                  <input class="text-md w-[55px] text-center" type="number" name="cantidad">
                </div>
              </div>
            </div>
          </div>
        </div>
*/
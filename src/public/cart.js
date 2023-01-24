
document.addEventListener("DOMContentLoaded", () => {     

  cartQuantity();    
  loadCartProducts();



  async function cartQuantity(){
    try {
      let response = await fetch('/api/carrito/cant');    
      let data = await response.json();   

      document.getElementsByClassName('cart_quantity')[0].innerText = data.cantidad;
      if(data.cantidad === 1){
        document.getElementsByClassName('cart_quantity_2')[0].innerText = `El carrito contiene ${data.cantidad} producto`;
      }else{
        document.getElementsByClassName('cart_quantity_2')[0].innerText = `El carrito contiene ${data.cantidad} productos`;
      } 
    } catch (error) {
      console.log(error);
    }    
  }

  async function loadCartProducts() {

    try {
      let response = await fetch('/api/carrito/cant');
      let data = await response.json();      

      if(data.status === 'OK'){
        for (let i = 0; i < data.result.productos.length; i++) {
          const product = data.result.productos[i];
          let product_card = `
              <div class="py-2">
              <div class="w-full border-2 border-gray-700 p-4 flex items-center space-x-8 rounded-lg">
                <p class="prod_id hidden id_product">${product._id} </p>
                <p class="prod_codigo hidden">${product.codigo}</p>
                <p class="prod_stock hidden"> ${product.stock}</p>
                <img class="w-[120px]" src="${product.foto}" alt="">
                <div class="w-full px-4">
                  <p class="text-2xl font-bold">${product.nombre}</p>
                  <p class="text-xl py-1">${product.descripcion}</p>
                  <div class="w-full flex items-center justify-between">
                    <p class="text-lg">Precio ($): ${product.price}</p>
                    <div class="flex items-center space-x-4">
                      <label class="text-lg" for="cantidad">Cantidad:</label>
                      <input class="text-md w-[55px] text-center" type="number" name="cantidad">
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
            document.getElementsByClassName('products_container')[0].innerHTML += product_card;
        }

        let btns_add = document.getElementsByClassName('btn_add');
        for (let i = 0; i < btns_add.length; i++) {
          const button = btns_add[i];
          button.addEventListener('click', addToCart)
        }    
      }
    } catch (error) {
      console.log(error);
    }
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
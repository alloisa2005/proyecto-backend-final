
const CompraModel = require('../models/Compra.mongo');
const CartModel = require('../models/Cart.mongo');

class CompraController {

  async getAll() {

    try {

      let result = await CompraModel.find().populate('user').populate('cart')
      return {status:'OK', result};             

    } catch (error) {

      return {status:'ERROR', result: error.message};             
    }
  }  

  async getMyCompras(userId) {

    try {

      let result = await CompraModel.find({user: userId}).populate('user').populate('cart')
      return {status:'OK', result};             

    } catch (error) {

      return {status:'ERROR', result: error.message};             
    }
  } 

  async newCompra(userId, cartId) {
    try {
      let compra = new CompraModel({user: userId, cart: cartId});
      await compra.save();
      await CartModel.findByIdAndUpdate(cartId, {activo: false});

      let newCompra = await CompraModel.findById(compra._id).populate('user');      

      return {status:'OK', result: newCompra}; 

    } catch (error) {
      return {status:'ERROR', result: error.message}; 
    }
  }

}

module.exports = new CompraController();

const CompraModel = require('../models/Compra.mongo');

class CompraController {

  async getAll() {

    try {

      let result = await CompraModel.find()
      return {status:'OK', result};             

    } catch (error) {

      return {status:'ERROR', result: error.message};             
    }
  }  

}

module.exports = new CompraController();
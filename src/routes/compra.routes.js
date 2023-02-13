const { Router } = require('express');
const router = Router();

const CompraControllerMONGO = require('../controllers/compra.controller.mongo');

router.get('/', async (req, res) => {
  
  try {                
    let result = await CompraControllerMONGO.getAll();      
    return res.status(200).send(result);          
      
  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

router.get('/myCompras', async (req, res) => {
  
  let { userId } = req.body;

  try {                    
    let result = await CompraControllerMONGO.getMyCompras(userId);      
    return res.status(200).send(result);          
      
  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

router.post('/', async (req, res) => {

  let {userId, cartId} = req.body;

  try {                
    let result = await CompraControllerMONGO.newCompra(userId, cartId);      
    return res.status(200).send(result);          
      
  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

module.exports = router;

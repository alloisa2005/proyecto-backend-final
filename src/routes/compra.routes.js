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
    //return res.status(200).send(result);          
    res.render('compras.ejs', { title: 'My Cart', user: req.user });

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

router.post('/', async (req, res) => {

  let { cartId } = req.body;

  try {                
    let result = await CompraControllerMONGO.newCompra(req.user._id, cartId);      
    return res.status(200).send(result);          
      
  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

module.exports = router;

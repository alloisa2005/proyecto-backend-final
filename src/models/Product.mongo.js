const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {    
    nombre: {type:String, required: true},
    descripcion: {type:String, required: true},
    codigo: {type:String },
    foto: {type:String, required: true},
    precio: {type:Number, required: true},
    stock: {type:Number, required: true},
    caracteristicas: {
      carroceria: { type:String },
      puertas: { type:String },
      potencia: { type:String },
      plazas: { type:String },
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

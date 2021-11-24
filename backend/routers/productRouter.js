// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const productRouter = express.Router();

// get the CRUD operations
const ProductCtrl = require("../controllers/productCtrl");

// =======================================
//              GET ROUTES
// =======================================
// This is for show page, showing particular product
productRouter.get("/products/:id", ProductCtrl.getProductById);


// This is for index page, showing all products
productRouter.get("/products", ProductCtrl.getProducts);

// =======================================
//              POST ROUTES
// =======================================
// This is for new products
productRouter.post("/products", ProductCtrl.createProduct);

// =======================================
//              PUT ROUTES
// =======================================
// This is for updating products
productRouter.put("/products/:id", ProductCtrl.updateProduct);

// =======================================
//              DELETE ROUTES
// =======================================
// This is for deleting products
productRouter.delete("/products/:id", ProductCtrl.deleteProduct);

module.exports = productRouter;
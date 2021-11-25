const express = require("express");
const router = express.Router();

// get the CRUD operations
const ProductCtrl = require("./productCtrl");

// This is for show page, showing particular product
// :id is the product's id
router.get("/products/:id", ProductCtrl.getProductById);

// This is for index page, showing all products
router.get("/products", ProductCtrl.getProducts);

// This is for new product
router.post("/products", ProductCtrl.createProduct);

// This is for updating product
// :id is the product's id
router.put("/products/:id", ProductCtrl.updateProduct);

// This is for deleting product
// :id is the product's id
router.delete("/products/:id", ProductCtrl.deleteProduct);

module.exports = router;
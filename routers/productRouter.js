// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const productRouter = express.Router();

// =======================================
//              DATABASE
// =======================================
const Products = require("../models/productModel");
const Users = require("../models/userModel");
const productData = require("../data/productData");

// =======================================
// Create all product CRUD operations
// =======================================

// Seed
productRouter.get("/seed", async (req, res) => {
  const productData = await Products.create(productData);
  res.json(productData);
});

// ---------------------------------------
// For showing one product
// ---------------------------------------
productRouter.get("/products/:id", ProductCtrl.getProductById);
const getProductById = async (req, res) => {
  try {
    // find the product by id
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: `Product not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// --------------------------------------------------
// For showing all products - this is the product index page
// --------------------------------------------------
productRouter.get("/products", ProductCtrl.getProducts);
const getProducts = async (req, res) => {
  try {
    // find all products
    const products = await Product.find(req.params);
    if (!products) {
      return res
        .status(404)
        .json({ success: false, error: `Products not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// ---------------------------------------
// For creating product
// ---------------------------------------
productRouter.post("/products", ProductCtrl.createProduct);
const createProduct = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a product",
    });
  }

  try {
    // req.body exists, so make a new product
    const product = new Product(req.body);
    // if product image url is empty, fill in with default product image
    if (product.image === "") {
      product.image =
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    }
    await product.save();

    // if the new product doesn't exist, return error
    if (!product) {
      return res.status(400).json({ success: false, error: err });
    }

    // success!
    res.status(201).json({
      success: true,
      id: product._id,
      message: "Product created!",
    });
  } catch (err) {
    res.status(400).json({
      err,
      message: "Product is not created!",
    });
  }
};

// ---------------------------------------
// For updating product
// ---------------------------------------
productRouter.put("/products/:id", ProductCtrl.updateProduct);
const updateProduct = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide description to update",
    });
  }

  try {
    // req.body exists, find the product by id and then update
    const product = await Product.findById(req.params.id);
    // update the product details
    product.name = req.body.name;
    product.description = req.body.description;
    product.image = req.body.image;
    product.price = req.body.price;
    product.seatsAvailable = req.body.seatsAvailable;
    // if product image url is empty, fill in with default product image
    if (product.image === "") {
      product.image =
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
    }
    // save the updated product
    await product.save();
    if (!product) {
      return res.status(404).json({
        err,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      id: product._id,
      message: "Product updated!",
    });
  } catch (err) {
    res.status(404).json({
      error,
      message: "Product update failed",
    });
  }
};

// ---------------------------------------
// For deleting products
// ---------------------------------------
productRouter.delete("/products/:id", ProductCtrl.deleteProduct);
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //remove the product
    product.remove();
    // if the product doesnt exist, throw error
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: `Product not found` });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

module.exports = productRouter;

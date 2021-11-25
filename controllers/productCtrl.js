const Product = require("../models/productModel");

// Create all product CRUD operations

// For creating product
const createProduct = async (req, res) => {
    // if there is no req.body, return error
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a program",
      });
    }
  
    try {
      // req.body exists, so make a new product
      const product = new Product(req.body);
      // if product image url is empty, fill in with default product image
      if (product.image === "") {
        product.image =
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";
      }
      await product.save();
  
      // somehow, if the new product doesn't exist, return error
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
        message: "Product not created!",
      });
    }
  };
  
  // For updating product
  const updateProduct = async (req, res) => {
    // if there is no req.body, return error
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide description to update",
      });
    }
  
    try {
      // req.body exists, so find the product by id and then update
      const product = await Product.findById(req.params.id);
      // update the product details
      product.name = req.body.name;
      product.description = req.body.description;
      product.image = req.body.image;
      product.start = req.body.start;
      product.end = req.body.end;
      product.price = req.body.price;
      product.seatsAvailable = req.body.seatsAvailable;
      // if product image url is empty, fill in with default product image
      if (product.image === "") {
        product.image =
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";
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
        message: "Product not updated!",
      });
    }
  };
  
  // For deleting product
  const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      // remove the product
      await product.remove();
      // if the product doesnt exist, throw error
      if (!product) {
        return res.status(404).json({ success: false, error: `Product not found` });
      }
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  };
  
  // For showing a particular product
  const getProductById = async (req, res) => {
    try {
      // find the product by id
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, error: `Product not found` });
      }
      // return json response if successful
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  };
  
  // For product index page
  const getProducts = async (req, res) => {
    try {
      // find all products
      const products = await Product.find();
      if (!products) {
        return res.status(404).json({ success: false, error: `Products not found` });
      }
      // return json response if successful
      res.status(200).json({ success: true, data: products });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  };
  
  // export the modules - CRUD
  // Read has 2 (for the index page--> showing all products, and for the show page--> show particular product)
  module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
  };
  
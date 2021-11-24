// =======================================
//              DATABASE
// =======================================
const Product = require("../models/productModel");

// =======================================
// Create all product CRUD operations
// =======================================

// ---------------------------------------
// For creating product
// ---------------------------------------
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
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
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
      message: "Product listing created!",
    });
  } catch (err) {
    res.status(400).json({
      err,
      message: "Product listing creation failed",
    });
  }
};

// ---------------------------------------
// For updating product
// ---------------------------------------
const updateProduct = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
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
      id: cat._id,
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
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //remove the product
    product.remove();
    // if the product doesnt exist, throw error
    if (!product) {
      return res.status(404).json({ success: false, error: `Product not found` });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// ---------------------------------------
// For showing one product
// ---------------------------------------
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

// --------------------------------------------------
// For showing all products - this is the product index page
// --------------------------------------------------
const getProducts = async (req, res) => {
  try {
    // find all products
    const products = await Product.find(req.params);
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
// Read has 2 (for the index page--> showing all products, and for the show page--> show one product)
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};

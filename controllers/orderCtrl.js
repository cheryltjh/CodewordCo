const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// Create all orders CRUD operations

// For making a new orders
// When making new orders, have to attach order to particular product
const createOrder = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must create an order",
    });
  }

  try {
    // req.body exists, so make a new order
    const order = new Order(req.body);
    await order.save();
    // now add order to product
    Product.findById(req.params.id, (err, foundProduct) => {
      // Append the comment to the cat
      foundProduct.orders.push(order);
      foundProduct.save();
    });
    // somehow, if the new order doesn't exist, return error
    if (!order) {
      return res.status(400).json({ success: false, error: err });
    }

    // success!
    res.status(201).json({
      success: true,
      id: order._id,
      message: "Order created!",
    });
  } catch (err) {
    res.status(400).json({
      err,
      message: "Order not created!",
    });
  }
};

// For updating order
const updateOrder = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    // req.body exists, so find the order by id and then update
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        err,
        message: "Order not found!",
      });
    }
    // update the order details
    order.name = req.body.name;
    // save the updated comment
    await order.save();

    // now update the order entry for the product too
    const product = await Product.findById(order.product_id);
    // replace the name with the updated order
    Product.orders.id(order._id).text = order.text;
    // save the order
    await order.save();

    res.status(200).json({
      success: true,
      id: order._id,
      message: "Order updated!",
    });
  } catch (err) {
    res.status(404).json({
      error,
      message: "Order not updated!",
    });
  }
};

// For deleting order
// need to remove order from particular product
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    // remove order from product
    const product = await Product.findById(order.product_id);
    product.orders.id(req.params.id).remove();
    await product.save();
    // remove the order
    await order.remove();
    // if the order doesnt exist, throw error
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: `Order not found` });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For showing a particular order
const getOrderById = async (req, res) => {
  try {
    // find the order by id
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: `Order not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
};

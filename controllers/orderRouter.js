const express = require("express");
const router = express.Router();

// get the CRUD operations
const OrderCtrl = require("./orderCtrl");

// This is for show page, showing particular order
// :id is the order's id
router.get("/order/:id", OrderCtrl.getOrderById);

// This is for new order for a particular product
// :id is the order's id
router.post("/products/:id/neworder", OrderCtrl.createOrder);


// This is for updating a order
// :id is the order's id
router.put("/order/:id", OrderCtrl.updateOrder);

// delete order
// :id is the order's id
router.delete("/order/:id", OrderCtrl.deleteOrder);

module.exports = router;

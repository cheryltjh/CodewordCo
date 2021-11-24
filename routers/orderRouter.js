// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const orderRouter = express.Router();

// =======================================
//              DATABASE
// =======================================
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/userModel");
const { isAdmin, isAuth } = require("../auth");

orderRouter.get('/summary', isAuth, isAdmin, async (req, res) => {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders });
    }
  );
  
orderRouter.post('/', isAuth, async (req, res) => {
      if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = new Order({
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          totalPrice: req.body.totalPrice,
          user: req.user._id,
        });
        const createdOrder = await order.save();
        res
          .status(201)
          .send({ message: 'New Order Created', order: createdOrder });
      }
    }
  );
  
orderRouter.get('/:id', isAuth, async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    }
  );
  
orderRouter.put('/:id/pay', isAuth, async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
        'user',
        'email name'
      );
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
  
orderRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
    const deleteOrder = await order.remove();
    res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
    res.status(404).send({ message: 'Order Not Found' });
    }
}
);
  
export default orderRouter;

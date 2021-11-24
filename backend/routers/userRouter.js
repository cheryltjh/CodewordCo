// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const userRouter = express.Router();

// get the CRUD operations
const UserCtrl = require("../controllers/userCtrl");

// =======================================
//              POST ROUTES
// =======================================
// This is for new user
userRouter.post("/users", UserCtrl.createUser);

// =======================================
//              DELETE ROUTES
// =======================================
// delete user
// :id is the user's id
userRouter.delete("/users/:id", UserCtrl.deleteUser);

module.exports = userRouter;
const express = require("express");
const router = express.Router();

// get the CRUD operations
const UserCtrl = require("./userCtrl");

// This is for new user
router.post("/users", UserCtrl.createUser);

// delete user
// :id is the user's id
router.delete("/users/:id", UserCtrl.deleteUser);

module.exports = router;
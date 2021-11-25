const express = require("express");
const router = express.Router();

// get the CRUD operations
const SessionCtrl = require("./sessionCtrl");

// This is for new session for login authentication
router.get("/login", SessionCtrl.getSession);

// This is for creating new session (log in)
router.post("/login", SessionCtrl.createSession);

// delete session (log out)
router.delete("/login", SessionCtrl.deleteSession);

module.exports = router;
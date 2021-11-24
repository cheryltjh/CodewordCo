// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const sessionRouter = express.Router();

// =======================================
//              DATABASE
// =======================================
const User = require("../models/userModel");
// for comparing password
const bcrypt = require("bcrypt");

// =======================================
// Create all sessions operations
// =======================================

// ---------------------------------------
// For authentication
// ---------------------------------------
sessionRouter.get("/login", SessionCtrl.getSession);
const getSession = async (req, res) => {
    const sessionUser = await req.session.currentUser;
    try {
      if (sessionUser) {
        res.status(200).json({ success: true, message: "Authenticated!", data: sessionUser });
      }
    } catch (err) {
      res.status(401).json({ success: false, error: err });
    }
  };

// ---------------------------------------
// For creating new session
// ---------------------------------------
sessionRouter.post("/login", SessionCtrl.createSession);
const createSession = async (req, res) => {
    // if there is no req.body, return error
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a valid user",
      });
    }
  
    try {
      const user = await User.findOne({ username: req.body.username });
      // somehow, if the new user doesn't exist, return error
      if (!user) {
        return res.status(400).json({ success: false, error: err });
      }
      // user exists. Check if passwords match.
      if ( await bcrypt.compareSync(req.body.password, user.password)) {
        console.log("session", req.session)
        req.session.currentUser = user;
        console.log("session user", req.session.currentUser)
        // success!
        res.status(201).json({
          success: true,
          role: user.role,
          username: user.username,
          message: "Login success!",
        });
      } else {
        // wrong login information
        res.status(401).json({ success: false, error: err });
      }
    } catch (err) {
      res.status(400).json({
        err,
        message: "Login failed!",
      });
    }
  };

// ---------------------------------------
// For deleting session (log out)
// ---------------------------------------
sessionRouter.delete("/login", SessionCtrl.deleteSession);
const deleteSession = async (req, res) => {
    try {
      await req.session.destroy();
      // success!
      res.status(201).json({
        success: true,
        message: "Logout success!",
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  };

module.exports = sessionRouter;
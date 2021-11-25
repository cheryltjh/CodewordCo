const Enroll = require("../models/enrollModel");

// Create all enrollment CRUD operations

// For creating enrollment
const createEnroll = async (req, res) => {
    // if there is no req.body, return error
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide enrollment details",
      });
    }
  
    try {
      // req.body exists, so make a new enrollment
      const enroll = new Enroll(req.body);
      await enroll.save();

      // somehow, if the new enrollment doesn't exist, return error
      if (!enroll) {
        return res.status(400).json({ success: false, error: err });
      }
  
      // success!
      res.status(201).json({
        success: true,
        id: enroll._id,
        message: "Enrollment success!",
      });
    } catch (err) {
      res.status(400).json({
        err,
        message: "Enrollment not successful!",
      });
    }
  };
  
  // For updating enrollment
  const updateEnroll = async (req, res) => {
    // if there is no req.body, return error
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide details to update",
      });
    }
  
    try {
      // req.body exists, so find the enroll by id and then update
      const enroll = await Enroll.findById(req.params.id);
      // update the enroll details
      enroll.name = req.body.name;
      enroll.phone = req.body.phone;
      enroll.email = req.body.email;
      enroll.dateOfBirth = req.body.dateOfBirth;
      enroll.product = req.body.product;

      // save the updated enroll
      await enroll.save();
      if (!enroll) {
        return res.status(404).json({
          err,
          message: "Enrollment not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        id: enroll._id,
        message: "Enrollment updated!",
      });
    } catch (err) {
      res.status(404).json({
        error,
        message: "Enrollment not updated!",
      });
    }
  };
  
  // For deleting enroll
  const deleteEnroll = async (req, res) => {
    try {
      const enroll = await Enroll.findById(req.params.id);
      // remove the enroll
      await enroll.remove();
      // if the enroll doesnt exist, throw error
      if (!enroll) {
        return res.status(404).json({ success: false, error: `Enroll not found` });
      }
      res.status(200).json({ success: true, data: enroll });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  };
  
  // For showing a particular enroll
  const getEnrollById = async (req, res) => {
    try {
      // find the enroll by id
      const enroll = await Enroll.findById(req.params.id);
      if (!enroll) {
        return res.status(404).json({ success: false, error: `Enrollment not found` });
      }
      // return json response if successful
      res.status(200).json({ success: true, data: enroll });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  };
  
  // For enroll index page
  const getEnrolls = async (req, res) => {
    try {
      // find all products
      const enrolls = await Enroll.find();
      if (!enrolls) {
        return res.status(404).json({ success: false, error: `Enrollments not found` });
      }
      // return json response if successful
      res.status(200).json({ success: true, data: enrolls });
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  };
  
  // export the modules - CRUD
  // Read has 2 (for the index page--> showing all enrollment, and for the show page--> show particular enroll)
  module.exports = {
    createEnroll,
    updateEnroll,
    deleteEnroll,
    getEnrolls,
    getEnrollById,
  };
  
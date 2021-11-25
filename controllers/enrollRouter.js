const express = require("express");
const router = express.Router();

const EnrollCtrl = require("./enrollCtrl");

// This is for show page, showing particular order
// :id is the enrollment's id
router.get("/enroll/:id", EnrollCtrl.getEnrollById);

// This is for index page, showing all enrollments
router.get("/enroll", EnrollCtrl.getEnrolls);

// This is for new enrollment
router.post("/enroll", EnrollCtrl.createEnroll);

// This is for updating enrollment detail
router.put("/enroll/:id", EnrollCtrl.updateEnroll);

// delete enrollment
router.delete("/enroll/:id", EnrollCtrl.deleteEnroll);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createPacakage,
  getAllPackages,
  updatePackage,
  deletePackage,
} = require("../../controllers/SuperAdminController/PackageManager/packagemanager");

router.post("/create-Package", createPacakage);
router.get("/getall-Packages", getAllPackages);
router.put("/update-package/:packageId", updatePackage);
router.delete("/delete-package/:packageId", deletePackage);

module.exports = router;

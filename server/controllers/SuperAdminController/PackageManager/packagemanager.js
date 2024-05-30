const PackageModel = require("../../../models/SuperAdminModel/PackageModel");

const createSequenceGenerator = (() => {
  let currentNumber = 100000; // Start from the smallest 6-digit number 2024

  return function () {
    return currentNumber++;
  };
})();

//save package into db from frontend
exports.createPacakage = async (req, res) => {
  try {
    const { packageName, validity, blogPost, packagePrice } = req.body;
    if (!packageName || !validity || !blogPost || !packagePrice) {
      return res.json({
        sucess: false,
        message: "Please fill all details",
      });
    }
    let packageId;
    let packageExists;

    // Generate a unique packageId
    do {
      packageId = createSequenceGenerator();
      packageExists = await PackageModel.findOne({ packageId });
    } while (packageExists);

    const newPackage = new PackageModel({
      packageId,
      packageName,
      validity,
      blogPost,
      packagePrice,
    });
    await newPackage.save();
    return res.status(200).json({
      sucess: true,
      message: "Package created successfully",
      newPackage,
    });
  } catch (error) {
    console.log("Err0r while creating pacakage", error);
    return res.status(500).json({
      sucess: false,
      message: "Pacakage creation failed",
    });
  }
};

//update pacakage into db from frontend  on the basis of package Id
exports.updatePackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const { packageName, validity, blogPost, packagePrice } = req.body;

    const updatedPackage = await PackageModel.findOneAndUpdate(
      { packageId },
      { packageName, validity, blogPost, packagePrice },
      { new: true }
    );
    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Package updated successfully",
      updatedPackage,
    });
  } catch (error) {
    console.error("Error while updating package", error);
    return res.status(500).json({
      success: false,
      message: "Package update failed",
    });
  }
};

//get all packages from db to display in frontend side

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await PackageModel.find();

    return res.status(200).json({
      success: true,
      message: "Packages retrieved successfully",
      packages,
    });
  } catch (error) {
    console.error("Error while fetching packages", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve packages",
    });
  }
};
//delete package from db on the basis of package Id
exports.deletePackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    if (!packageId) {
      return res.json({
        success: false,
        message: "Please provide the packageId",
      });
    }

    const deletedPackage = await PackageModel.findOneAndDelete({ packageId });

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Package deleted successfully",
      deletedPackage,
    });
  } catch (error) {
    console.error("Error while deleting package", error);
    return res.status(500).json({
      success: false,
      message: "Package deletion failed",
    });
  }
};

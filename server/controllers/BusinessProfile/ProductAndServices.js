const User = require("../../models/User");
const ProductAndService = require("../../models/BusinessProfileModels/ProductAndServices");

// Save Products and Services
const saveProductsAndServices = async (req, res) => {
  try {
    const { productAndServices } = req.body;

    // Check if the user exists
    const userId = await User.findById(req.user.id);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sorry! User not found",
      });
    }

    // Validate and prepare product and services
    let productsAndServicesArray = [];
    if (typeof productAndServices === "string") {
      productsAndServicesArray = productAndServices
        .split("\n")
        .map((item) => item.trim())
        .filter(
          (item) =>
            item !== "" &&
            !item.startsWith("Keywords:") &&
            !item.startsWith("Locations:") &&
            !item.startsWith("About Business")
        );
    } else if (Array.isArray(productAndServices)) {
      productsAndServicesArray = productAndServices
        .map((item) => item.trim())
        .filter(
          (item) =>
            item !== "" &&
            !item.startsWith("Keywords:") &&
            !item.startsWith("Locations:") &&
            !item.startsWith("About Business")
        );
    } else {
      throw new Error("Product and Services must be a string or an array");
    }

    // Find existing product and service document for the user
    let userProductAndService = await ProductAndService.findOne({
      user: userId,
    });

    if (!userProductAndService) {
      // If no existing document, create a new one
      userProductAndService = new ProductAndService({
        productAndServices: productsAndServicesArray,
        user: userId,
      });
    } else {
      // If the document exists, append the new products and services to the existing array
      productsAndServicesArray.forEach((newItem) => {
        if (!userProductAndService.productAndServices.includes(newItem)) {
          userProductAndService.productAndServices.push(newItem);
        }
      });
    }

    await userProductAndService.save();

    return res.status(200).json({
      success: true,
      message: "Products and Services saved successfully",
      data: userProductAndService,
    });
  } catch (error) {
    console.error("Error while saving products and services:", error);
    res.status(500).json({ message: "Failed to save products and services" });
  }
};

/////
const updateProductAndService = async (req, res) => {
  try {
    const { productAndServices } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Find the existing product and service for the user
    let existingproductAndService = await ProductAndService.findOne({
      user: userId,
    });

    if (!existingproductAndService) {
      return res.status(404).json({
        success: false,
        message: "Product or Service not found for this user",
      });
    }

    // Update the product and service data
    if (productAndServices) {
      existingproductAndService.productAndServices = productAndServices;
    }

    // Save the updated product and service data
    await existingproductAndService.save();

    return res.status(200).json({
      success: true,
      message: "Product And Services Data updated successfully",
      data: existingproductAndService,
    });
  } catch (error) {
    console.error("Error while updating product and services data", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductsAndServices = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Find the product and service data for the user
    const userProductAndService = await ProductAndService.findOne({
      user: userId,
    });
    if (!userProductAndService) {
      return res.status(404).json({
        success: false,
        message: "Product or Service not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product And Services Data retrieved successfully",
      data: userProductAndService,
    });
  } catch (error) {}
};

//delete single product service
const deleteProductAndServices = async (req, res) => {
  try {
    const { serviceToDelete } = req.body;

    const userId = await User.findById(req.user.id);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sorry! User not found",
      });
    }

    const existingProductAndService = await ProductAndService.findOne({
      user: userId,
    });

    if (!existingProductAndService) {
      return res.status(404).json({
        success: false,
        message: "Product or Service not found for this user",
      });
    }

    // Check if the service to delete exists in the product and services array
    const index = existingProductAndService.productAndServices.findIndex(
      (service) => service === serviceToDelete
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Remove the service at the found index
    existingProductAndService.productAndServices.splice(index, 1);

    // Save the updated document
    await existingProductAndService.save();

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: existingProductAndService,
    });
  } catch (error) {
    console.error("Error while deleting product and services data", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateSingleProductAndService = async (req, res) => {
  try {
    const { oldService, newService } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sorry! User not found",
      });
    }
    // Find the user's product and service document
    const existingProductAndService = await ProductAndService.findOne({
      user: userId,
    });
    if (!existingProductAndService) {
      return res.status(404).json({
        success: false,
        message: "Product or Service not found for this user",
      });
    }
    // Check if the old service exists in the product and services array
    const index = existingProductAndService.productAndServices.findIndex(
      (service) => service === oldService
    );
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Update the service at the found index with the new one
    existingProductAndService.productAndServices[index] = newService;

    // Save the updated document
    await existingProductAndService.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: existingProductAndService,
    });
  } catch (error) {
    console.error("Error while updating product and services data", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createSingleService = async (req, res) => {
  try {
    const { newService } = req.body;
    const userId = req.user.id;

    // Find the user's product and service document
    let existingProductAndService = await ProductAndService.findOne({
      user: userId,
    });

    // If the user doesn't have any product and service document, create a new one
    if (!existingProductAndService) {
      existingProductAndService = new ProductAndService({
        productAndServices: [newService],
        user: userId,
      });
    } else {
      // If the user already has a document, append the new service to the existing array with comma separation
      existingProductAndService.productAndServices[0] += `, ${newService}`;
    }

    // Save the updated product and service document
    await existingProductAndService.save();

    return res.status(200).json({
      success: true,
      message: "Service created and saved successfully",
      data: existingProductAndService,
    });
  } catch (error) {
    console.error("Error while creating service:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  saveProductsAndServices,
  updateProductAndService,
  getProductsAndServices,
  deleteProductAndServices,
  updateSingleProductAndService,
  createSingleService,
};

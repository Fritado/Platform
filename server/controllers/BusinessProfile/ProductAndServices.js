const User = require("../../models/User");
const ProductAndService = require("../../models/BusinessProfileModels/ProductAndServices");

// Save Products and Services
const saveProductsAndServices = async (req, res) => {
  try {
    const { productAndServices } = req.body;

    // Check if the user exists
    const userId = await User.findById(req.user.id);
    //console.log("userId", userId);

    if (!userId) {
      return res.status({
        success: false,
        message: "Sorry! User not found",
      });
    }

    //const lowercaseProductAndServices = productAndServices.toLowerCase();

    // Check if the product and service already exists for the user
    const existingProductAndService = await ProductAndService.findOne({
      user: userId,
      productAndServices: productAndServices,
    });

    if (existingProductAndService) {
      return res.status(400).json({
        success: false,
        message: "Product or Service already exists for this user",
      });
    }
    // If the product and service doesn't exist, save it
    let userProductAndService = await ProductAndService.findOne({
      user: userId,
    });

    if (!userProductAndService) {
      // If no existing document, create a new one
      userProductAndService = new ProductAndService({
        productAndServices: [productAndServices], // Create an array with the first product and service
        user: userId,
      });
    } else {
      // If the document exists, append the new product and service to the existing array
      if (
        !userProductAndService.productAndServices.includes(productAndServices)
      ) {
        userProductAndService.productAndServices.push(productAndServices);
      }
    }

    await userProductAndService.save();

    return res.status(200).json({
      success: true,
      message: "Product And Services Data saved successfully",
      data: userProductAndService,
    });
  } catch (error) {
    console.error("Error while Saving Product And Services Data:", error);
    res
      .status(500)
      .json({ message: "Failed to save Product And Services Data" });
  }
};

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

const deleteProductAndServices = async (req, res) => {
  try {
    const { serviceToDelete } = req.body;
    const userId = req.user.id;
    console.log("Service to delete:", serviceToDelete);
    // Find the user's product and service document
    const existingProductAndService = await ProductAndService.findOne({
      user: userId,
    });

    console.log("Existing product and service:", existingProductAndService);

    if (!existingProductAndService) {
      return res.status(404).json({
        success: false,
        message: "Product or Service not found for this user",
      });
    }

    // Parse the product and service string and split it into individual services
    let allServices =
      existingProductAndService.productAndServices[0].split(",");
    allServices = allServices.map((service) => service.trim()); // Trim each service

    console.log("All services:", allServices);
    // Find the index of the service to delete
    const index = allServices.findIndex(
      (service) => service === serviceToDelete
    );

    console.log("Index to delete:", index);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Remove the service at the found index
    allServices.splice(index, 1);

    // Join the updated services into a string
    existingProductAndService.productAndServices = [allServices.join(", ")];
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

    // Parse the product and service string and split it into individual services
    let allServices =
      existingProductAndService.productAndServices[0].split(",");
    allServices = allServices.map((service) => service.trim()); // Trim each service

    // Find the index of the old service
    const index = allServices.findIndex((service) => service === oldService);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Update the service at the found index with the new one
    allServices[index] = newService;

    // Join the updated services into a string
    existingProductAndService.productAndServices = [allServices.join(", ")];
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

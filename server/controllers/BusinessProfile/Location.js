const User = require("../../models/User");
const Location = require("../../models/BusinessProfileModels/Location");

//save Location
const saveLocation = async (req, res) => {
  try {
    const { location } = req.body;

    // Check if the user exists
    const userId = await User.findById(req.user.id);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sorry! User not found",
      });
    }

    // Validate and prepare location
    let locationsArray = [];
    if (typeof location === "string") {
      locationsArray = location
        .split("\n")
        .map((loc) => loc.trim())
        .filter((loc) => loc !== "");
    } else if (Array.isArray(location)) {
      locationsArray = location
        .map((loc) => loc.trim())
        .filter((loc) => loc !== "");
    } else {
      throw new Error("Location must be a string or an array");
    }

    // Find existing location document for the user
    let userLocation = await Location.findOne({ user: userId });

    if (!userLocation) {
      // If no existing document, create a new one
      userLocation = new Location({
        location: locationsArray,
        user: userId,
      });
    } else {
      // If the document exists, append the new locations to the existing array
      locationsArray.forEach((newLoc) => {
        if (!userLocation.location.includes(newLoc)) {
          userLocation.location.push(newLoc);
        }
      });
    }

    await userLocation.save();

    return res.status(200).json({
      success: true,
      message: "Locations saved successfully",
     // data: userLocation,
    });
  } catch (error) {
    console.error("Error while saving locations:", error);
    res.status(500).json({ message: "Failed to save locations" });
  }
};

const updateSingleLocation = async (req, res) => {
  try {
    const { oldLocation, newLocation } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingLocation = await Location.findOne({
      user: userId,
    });
    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found for this user",
      });
    }
    const index = existingLocation.location.findIndex(
      (loc) => loc === oldLocation
    );
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Location Name not found",
      });
    }
    existingLocation.location[index] = newLocation;
    await existingLocation.save();

    return res.status(200).json({
      success: true,
      message: "Location updated successfully",
      //data: existingLocation,
    });
  } catch (Error) {
    console.error("Error while updating location data", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getLocation = async (req, res) => {
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

    const userLocation = await Location.findOne({
      user: userId,
    });
    if (!userLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Keywords retrieved successfully",
      //data: userLocation,
    });
  } catch (error) {
    console.error("Error while retrieving location", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteSingleLocationItem = async (req, res) => {
  try {
    const { locationName } = req.body;
    const userId = await User.findById(req.user.id);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sorry! User not found",
      });
    }
    const existingLocation = await Location.findOne({
      user: userId,
    });
    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found for this user",
      });
    }

    const index = existingLocation.location.findIndex(
      (loc) => loc === locationName
    );
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Location Name not found",
      });
    }
    existingLocation.location.splice(index, 1);
    await existingLocation.save();

    return res.status(200).json({
      success: true,
      message: "Location deleted successfully",
      //data: existingLocation,
    });
  } catch (error) {
    console.error("Error while deleting Location", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create Single Location
const createSingleLocation = async (req, res) => {
  try {
    const { locationName } = req.body;

    // Validate input
    if (!locationName) {
      return res.status(400).json({
        success: false,
        message: "Location name is required",
      });
    }

    // Check if the user exists
    const userId = await User.findById(req.user.id);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sorry! User not found",
      });
    }

    // Find existing location document for the user
    let userLocation = await Location.findOne({ user: userId });

    if (userLocation) {
      // Check if the location already exists in the array
      if (!userLocation.location.includes(locationName)) {
        userLocation.location.push(locationName);
      } else {
        return res.status(400).json({
          success: false,
          message: "Location already exists",
        });
      }
    } else {
      // If no existing document, create a new one
      userLocation = new Location({
        location: [locationName],
        user: userId,
      });
    }

    // Save the updated or new location document
    await userLocation.save();

    return res.status(200).json({
      success: true,
      message: "Location created successfully",
    //  data: userLocation,
    });
  } catch (error) {
    console.error("Error while creating location:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create location",
    });
  }
};

module.exports = {
  saveLocation,
  updateSingleLocation ,
  getLocation,
  deleteSingleLocationItem,
  createSingleLocation
};

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../../models/User'); 

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const userId = req.user.id; // Assuming user ID is available through authentication
     
      const user = await User.findById(userId);
      if (!user) {
        return cb(new Error(`User with ID ${userId} not found`));
      }
      const clientId = user.userId.toString(); 
      const clientFolderPath = path.join(__dirname, '..', 'BlogImage', clientId);
      if (!fs.existsSync(clientFolderPath)) {
        fs.mkdirSync(clientFolderPath, { recursive: true });
      }
      cb(null, clientFolderPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const fileName = `${originalName}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB as an example
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, JPG images are allowed'));
    }
  },
}).array('imageFiles', 10); // Allow multiple files, up to 10

module.exports = { upload };
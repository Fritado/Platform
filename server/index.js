const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const database = require("./config/database");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const scrapeRoute = require("./routes/scrape");
const Blogtopicgenerator = require("./routes/Blogtopicgenerator");
const ProjectRoute = require("./routes/ProjectRoute");
const BusinessProfileRoute = require("./routes/BusinessProfileRoute");
const PaymentRoutes = require("./routes/PaymentRoutes");
const PromptRoute = require("./routes/PromptRoute");
const PackageManagerRoute = require("./routes/superAdminRoute/packageManagerRoute");
const WebsiteRoute = require("./routes/connectWebsiteRoute");
const UserManagerRouter = require("./routes/superAdminRoute/userManagerRoute");
const auth = require("./middlewares/auth");
const articleRoutes = require("./routes/dummyRoute");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 30002;

//databse connect
database.connect();

//middleware
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://platform.fritado.com",
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use('/blog-images', express.static(path.join(__dirname, 'controllers', 'BlogImage')));

//routes https://platform.fritado.com
//http://localhost:30001
app.use("/api/auth", userRoutes);
app.use("/api/scrape", scrapeRoute);
app.use("/api/openAi", Blogtopicgenerator);
app.use("/api/domainName", ProjectRoute);
app.use("/api/businessProfile", BusinessProfileRoute);
app.use("/api/payment", PaymentRoutes);
app.use("/api/prompts", PromptRoute);
app.use("/api/super-admin/package", PackageManagerRoute);
app.use("/api/super-admin/user-package", UserManagerRouter);
app.use("/api/article", articleRoutes);
app.use("/api/connect", WebsiteRoute);

//default routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.head("/api/check-webhook", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const response = await axios.head(url);
    //console.log(response , "webhook url status response");
    if (response.status === 200) {
      return res.status(200).json({ status: "active" });
    } else {
      return res.status(200).json({ status: "inactive" });
    }
  } catch (error) {
    // console.error('Error checking webhook status:', error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is listening at ${PORT}`);
});

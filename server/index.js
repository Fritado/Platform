const express = require("express");
const app = express();
const database = require("./config/database");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const scrapeRoute = require("./routes/scrape");
const Blogtopicgenerator = require("./routes/Blogtopicgenerator");
const ProjectRoute = require("./routes/ProjectRoute");
const BusinessProfileRoute = require("./routes/BusinessProfileRoute");
const PaymentRoutes = require("./routes/PaymentRoutes");
const PromptRoute = require("./routes/PromptRoute");
const PackageManagerRoute = require("./routes/superAdminRoute/packageManagerRoute")
const WebsiteRoute = require("./routes/connectWebsiteRoute");
const UserManagerRouter = require("./routes/superAdminRoute/userManagerRoute")

const articleRoutes = require("./routes/dummyRoute");


const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

require('dotenv').config();
const PORT = process.env.PORT ||30002

//databse connect
database.connect();

//middleware
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:"https://platform.fritado.com",
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

//routes https://platform.fritado.com
//http://localhost:30001
//http://localhost:4000/api/fritado
app.use("/api/auth", userRoutes);
app.use("/api/scrape" , scrapeRoute );
app.use("/api/openAi", Blogtopicgenerator);
app.use("/api/domainName", ProjectRoute);
app.use("/api/businessProfile" , BusinessProfileRoute)
app.use("/api/payment" ,PaymentRoutes);
app.use("/api/prompts" ,PromptRoute);
app.use('/api/super-admin/package', PackageManagerRoute)
app.use('/api/super-admin/user-package' , UserManagerRouter)
app.use('/api/article', articleRoutes);
app.use('/api/connect' , WebsiteRoute);

//default routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});
app.post('/webhooks/:domain/:uniqueIdentifier', (req, res) => {
  const { topic, blogDescription } = req.body;
  console.log(`Received article for domain ${req.params.domain}: ${topic} - ${blogDescription}`);

  res.status(200).send('Article received and processed');
});

app.post('/blog-data', (req, res) => {
  console.log('Received request:', req.body);
  const { topic, blogDescription } = req.body;

  if (!topic || !blogDescription) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payload',
    });
  }

  // Process the blog data here
  // For now, just send a success response
  res.status(200).json({
    success: true,
    message: 'Blog data received',
  });
});

app.listen(PORT,'0.0.0.0', () => {
  console.log(`App is listening at ${PORT}`);
});

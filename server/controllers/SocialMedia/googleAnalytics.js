//*************************************google auth logic**************************************//
const { google } = require("googleapis");
const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const oauth2Client = require("../../config/googleAuth");
const User = require("../../models/User");
const socialMediaModel = require("../../models/socialMediaModel");

exports.googleAuth = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
  res.redirect(authUrl);
};

exports.googleAuthCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const analyticsAdmin = google.analyticsadmin("v1alpha");
    const accountSummaries = await analyticsAdmin.accountSummaries.list({
      auth: oauth2Client,
    });

    console.log(
      "Account Summaries:",
      JSON.stringify(accountSummaries.data, null, 2)
    );

    if (!accountSummaries || accountSummaries.length === 0) {
      return res.status(400).send("No Google Analytics accounts found.");
    }

    // for (let accountSummary of accountSummaries.data.accountSummaries) {
    //   const accountId = accountSummary.account.split("/")[1]; // Extract account ID
    //   console.log(`Fetching properties for account ID: ${accountId}`);

    //   const propertySummaries = accountSummary.propertySummaries;
    //   console.log("Properties:", JSON.stringify(propertySummaries, null, 2));

    //   if (!propertySummaries || propertySummaries.length === 0) {
    //     console.log(`No properties found for account ID: ${accountId}`);
    //     continue;
    //   }

    //   for (let propertySummary of propertySummaries) {
    //     const propertyId = propertySummary.property.split("/")[1]; // Extract property ID
    //     console.log(`Saving data for property ID: ${propertyId}`);

    //     if (!req.user || !req.user.id) {
    //       console.error("User not found in request.");
    //       return res.status(400).send("User not found.");
    //     }

    //     const user = await User.findById(req.user.id);
    //     if (!user) throw new Error("User not found");

    //      // Update or create GoogleAnalyticsToken document for the user
    //      await socialMediaModel.findOneAndUpdate(
    //       { userId: user._id },
    //       {
    //         userId: user._id,
    //         access_token: tokens.access_token,
    //         refresh_token: tokens.refresh_token,
    //         scope: tokens.scope,
    //         token_type: tokens.token_type,
    //         expiry_date: tokens.expiry_date,
    //       },
    //       { upsert: true }
    //     );

    //     res.send(`<h1>Success</h1>`);
    //     return;
    //   }
    // }

    // Ensure user is authenticated
    // if (!req.user || !req.user.id) {
    //   return res.status(401).send("User not authenticated.");
    // }

    // const user = await User.findById(req.user.id);
    // if (!user) {
    //   return res.status(404).send("User not found.");
    // }

    await socialMediaModel.findOneAndUpdate(
      { email:"abs@gmail.com"},
      {
       
        googleAnalytics_access_token: tokens.access_token,
        googleAnalytics_refresh_token: tokens.refresh_token,
        googleAnalytics_scope: tokens.scope,
        googleAnalytics_token_type: tokens.token_type,
        googleAnalytics_expiry_date: tokens.expiry_date,
      },
      { upsert: true }
    );

    res.redirect("http://localhost:30001/analyticsInfo");

    res.status(400).send("No valid properties found for the accounts.");
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).send("Internal Server Error in Google Analytics callback");
  }
};

//+++++++++++++++++++++++++++++++ Google analytics ++++++++++++++++++++++++++++++//

exports.getAnalyticsInfoPage = async (req, res) => {
  const tokenData = await GoogleAnalyticsData.findOne({ userId: req.user.id });
  if (!tokenData) {
    return res.status(400).send("Google Analytics not connected.");
  }

  res.render("analyticsInfo", { email: tokenData.email });
};

exports.getAnalyticsData = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const tokenData = await socialMediaModel.findOne({ userId: req.user.id });

    if (!tokenData) {
      return res.status(400).send("Google Analytics not connected.");
    }

    oauth2Client.setCredentials({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
    });
    const analyticsClient = new BetaAnalyticsDataClient({ auth: oauth2Client });

    const [response] = await analyticsClient.runReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: "city" }],
      metrics: [{ name: "activeUsers" }],
    });

    res.json(response);
  } catch (error) {
    console.error("Error fetching Google Analytics data:", error);
    res.status(500).send("Internal Server Error");
  }
};

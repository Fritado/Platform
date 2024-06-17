const axios = require("axios");
const cheerio = require("cheerio");

const exponentialBackoff = async (retryCount) => {
  const delay = Math.pow(2, retryCount) * 1000;
  console.log(`Retrying in ${delay / 1000} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, delay));
};

const extractContent = ($) => {
  // Remove unwanted tags and their content
  $('script, style, noscript, iframe, link, meta').remove();

  // Extract text content from the remaining body
  let textContent = "";
  $('body').each((_, element) => {
    const text = $(element).text().trim();
    if (text) {
      textContent += text + " ";
    }
  });

  return textContent;
};

const summarizeContent = (content) => {
  const sentences = content.split('.').map(sentence => sentence.trim()).filter(Boolean);
  const summary = sentences.slice(0, 5).join('. ') + '.';
  return summary;
};

exports.BusinessProfileGenerator = async (req, res) => {
  try {
    const { website_name } = req.body;

    // Remove prefixes such as www, http://, https:// from the website name
    const domain = website_name
      .replace(/^(https?:\/\/)?(www\.)?/, "")
      .split(".")
      .slice(-2)
      .join(".");

    // Function to add protocol prefix if missing
    const addProtocolPrefix = (url) => {
      if (!/^(?:f|ht)tps?:\/\//i.test(url)) {
        return `http://${url}`;
      }
      return url;
    };

    const url = addProtocolPrefix(domain);

    const MAX_RETRIES = 2;
    let retryCount = 0;
    let html = null;

    while (retryCount < MAX_RETRIES) {
      try {
        const response = await axios.get(url, { timeout: 5000 });
        html = response.data;
        break;
      } catch (error) {
        console.error(
          `Error fetching HTML (Retry ${retryCount + 1}/${MAX_RETRIES}):`,
          error.message
        );
        retryCount++;
        await exponentialBackoff(retryCount);
      }
    }

    if (!html) {
      throw new Error("Failed to fetch HTML after retries");
    }

    const $ = cheerio.load(html);
    const mainContent = extractContent($);

    const cleanContent = mainContent
      .replace(/[^\w\s]/g, "") // Remove special characters
      .replace(/\s+/g, " ") // Remove extra whitespace
      .trim(); // Trim leading/trailing whitespace

    const summary = summarizeContent(cleanContent);

    res.json({ summary });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.PrintCleanContent = async (req, res) => {
  try {
    // Check if there is a cleanContent result available
    if (cleanContent) {
      console.log("Clean Content Result:", cleanContent);
      res.json({ message: "Clean content result printed successfully" });
    } else {
      res.status(404).json({ error: "Clean content result not found" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

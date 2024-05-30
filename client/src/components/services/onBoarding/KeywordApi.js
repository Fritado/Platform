import axios from "axios";

// Helper function to extract keywords between two indices
const extractKeywords = (data, startIndex, endIndex = data.length) => {
  const keywordsString = data.substring(startIndex + 20, endIndex);
  return keywordsString
    .split("\n")
    .map((keyword) => keyword.trim().replace(/^\d+\.\s*/, ""))
    .filter((keyword) => keyword !== "");
};

export const getKeyWords = async (e) => {
  const getKeywordsUrl = "http://localhost:4000/api/businessProfile/get-keywords";
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(getKeywordsUrl, config);
    const data = response.data.data.keywords[0];
    console.log("response keyword", data);

    const shortTailIndex = data.indexOf("Short tail:");
    const longTailIndex = data.indexOf("Long tail:");

    if (shortTailIndex !== -1 && longTailIndex !== -1) {
      // Extract short tail keywords
      const shortTailKeywords = extractKeywords(
        data,
        shortTailIndex,
        longTailIndex
      );

      // Extract long tail keywords
      const longTailKeywords = extractKeywords(data, longTailIndex);

      // Combine short tail and long tail keywords
      const combinedKeywords = [...shortTailKeywords, ...longTailKeywords];
      console.log("combinedKeywords", combinedKeywords);
       return combinedKeywords;
    } else {
      throw new Error("Invalid response format: missing keywords markers");
      return []
    }
  } catch (Error) {
    console.error("Error while fetching KeyWords data", Error);
  }
};

export const deleteKeyWord = async (keywordToDelete) => {
  const deleteKeywordUrl = "http://localhost:4000/api/businessProfile/delete-keyword";
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteResponse = await axios.delete(deleteKeywordUrl, {
      data: { keywordToDelete },
      headers: config.headers,
    });
    //console.log("deleteResponse", deleteResponse);
    if (deleteResponse.data.success) {
      return true;
    } else {
      console.error("Failed to delete keyword:", deleteResponse.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting keyword:", error);
  }
};

export const updateSingleKeyword = async (oldKeyword, newKeyword) => {
  const updateUrl = "http://localhost:4000/api/businessProfile/update-single-keyword";
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      updateUrl,
      { oldKeyword, newKeyword },
      config
    );
    if (response.data.success) {
      return true;
    } else {
      console.error("Failed to update keyword:", response.data.message);
      return false;
    }
  } catch (error) {
    console.log("Error updating keyword:", error);
    throw error;
  }
};
